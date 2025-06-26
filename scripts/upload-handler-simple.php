<?php
/**
 * Script d'upload de signatures simplifié pour le serveur OVH
 * Version sans dépendance aux directives .htaccess
 */

// Configuration PHP directement dans le script
ini_set('upload_max_filesize', '2M');
ini_set('post_max_size', '2M');
ini_set('max_execution_time', 30);
ini_set('max_input_time', 30);

// Configuration
$uploadDir = __DIR__ . '/'; // Dossier courant (signatures/)
$maxFileSize = 1024 * 1024; // 1MB max
$allowedExtensions = ['png', 'jpg', 'jpeg'];

// Headers CORS pour permettre les requêtes depuis Next.js
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Length');
header('Content-Type: application/json; charset=utf-8');

// Gérer les requêtes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Vérifier la méthode HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Méthode non autorisée. Utilisez POST.'
    ]);
    exit();
}

// Vérifier la taille du contenu
$contentLength = $_SERVER['CONTENT_LENGTH'] ?? 0;
if ($contentLength > $maxFileSize) {
    http_response_code(413);
    echo json_encode([
        'success' => false,
        'error' => 'Fichier trop volumineux. Maximum: ' . ($maxFileSize / 1024 / 1024) . 'MB'
    ]);
    exit();
}

// Récupérer le nom du fichier depuis l'URL
$requestUri = $_SERVER['REQUEST_URI'];
$pathInfo = pathinfo($requestUri);

// Si l'URL contient un nom de fichier (ex: /signatures/user_123_1234567890.png)
if (isset($pathInfo['basename']) && $pathInfo['basename'] !== 'upload.php') {
    $filename = $pathInfo['basename'];
} else {
    // Générer un nom de fichier par défaut
    $timestamp = time();
    $filename = "signature_{$timestamp}.png";
}

// Vérifier l'extension du fichier
$extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
if (!in_array($extension, $allowedExtensions)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Type de fichier non autorisé. Utilisez: ' . implode(', ', $allowedExtensions)
    ]);
    exit();
}

// Chemin complet du fichier
$filePath = $uploadDir . $filename;

// Vérifier si le fichier existe déjà
if (file_exists($filePath)) {
    // Ajouter un timestamp pour éviter les conflits
    $nameWithoutExt = pathinfo($filename, PATHINFO_FILENAME);
    $filename = $nameWithoutExt . '_' . time() . '.' . $extension;
    $filePath = $uploadDir . $filename;
}

// Lire les données POST
$inputData = file_get_contents('php://input');

if (empty($inputData)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Aucune donnée reçue'
    ]);
    exit();
}

// Vérifier que c'est bien une image PNG valide
if ($extension === 'png') {
    // Vérifier la signature PNG
    if (strlen($inputData) < 8 || substr($inputData, 0, 8) !== "\x89PNG\r\n\x1a\n") {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Fichier PNG invalide'
        ]);
        exit();
    }
}

// Écrire le fichier
$bytesWritten = file_put_contents($filePath, $inputData);

if ($bytesWritten === false) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Erreur lors de l\'écriture du fichier'
    ]);
    exit();
}

// Vérifier que le fichier a bien été créé
if (!file_exists($filePath)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Fichier non créé après écriture'
    ]);
    exit();
}

// URL publique du fichier
$publicUrl = 'https://medias.forumcancerologie-roche.com/signatures/' . $filename;

// Succès
http_response_code(200);
echo json_encode([
    'success' => true,
    'filename' => $filename,
    'url' => $publicUrl,
    'size' => $bytesWritten,
    'message' => 'Signature uploadée avec succès'
]);

// Log pour debug (optionnel)
error_log("Signature uploadée: {$filename} ({$bytesWritten} bytes)");
?> 