import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGES_DIR = join(__dirname, '../public/img');
const MAX_WIDTH = 1920; // Largeur maximale pour les images
const QUALITY = 80; // Qualité de compression

async function optimizeImage(filePath) {
    try {
        const image = sharp(filePath);
        const metadata = await image.metadata();

        // Vérifier si l'image est plus grande que MAX_WIDTH
        if (metadata.width > MAX_WIDTH) {
            await image
                .resize(MAX_WIDTH)
                .jpeg({ quality: QUALITY })
                .toFile(filePath.replace('.png', '-optimized.jpg'));
        } else {
            await image
                .jpeg({ quality: QUALITY })
                .toFile(filePath.replace('.png', '-optimized.jpg'));
        }

        console.log(`Optimisé: ${filePath}`);
    } catch (error) {
        console.error(`Erreur lors de l'optimisation de ${filePath}:`, error);
    }
}

async function processDirectory(directory) {
    const files = readdirSync(directory);

    for (const file of files) {
        const filePath = join(directory, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
            await processDirectory(filePath);
        } else if (file.match(/\.(png|jpg|jpeg)$/i)) {
            await optimizeImage(filePath);
        }
    }
}

// Démarrer l'optimisation
processDirectory(IMAGES_DIR)
    .then(() => console.log('Optimisation terminée'))
    .catch(console.error); 