/**
 * Service pour la gestion des signatures
 * Upload direct vers serveur OVH + mise à jour base de données
 */

interface SignatureUploadResponse {
  success: boolean;
  signatureUrl?: string;
  error?: string;
}

interface UpdateSignatureStatusResponse {
  success: boolean;
  error?: string;
}

/**
 * Convertit les données base64 en Blob
 */
const base64ToBlob = (base64Data: string): Blob => {
  // Supprimer le préfixe data:image/png;base64, si présent
  const base64WithoutPrefix = base64Data.replace(
    /^data:image\/[a-z]+;base64,/,
    ""
  );

  // Convertir en Blob
  const byteCharacters = atob(base64WithoutPrefix);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "image/png" });
};

/**
 * Upload la signature vers AWS S3 via URL pré-signée
 */
export const uploadSignatureToServer = async (
  signatureData: string,
  userId: number
): Promise<SignatureUploadResponse> => {
  try {
    // Convertir base64 en Blob
    const signatureBlob = base64ToBlob(signatureData);

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const filename = `user_${userId}_${timestamp}.png`;

    // 1. Demander une URL pré-signée à notre API
    const presignResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signature/presign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename,
        contentType: 'image/png',
      }),
    });

    if (!presignResponse.ok) {
      const errorData = await presignResponse.json().catch(() => ({}));
      throw new Error(
        `Erreur génération URL pré-signée: ${presignResponse.status} - ${
          errorData.error || ''
        }`
      );
    }

    const presignResult = await presignResponse.json();

    if (!presignResult.success) {
      throw new Error(presignResult.error || 'Échec de la génération de l\'URL pré-signée');
    }

    // 2. Upload direct vers S3 via l'URL pré-signée
    const uploadResponse = await fetch(presignResult.presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/png',
      },
      body: signatureBlob,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(
        `Erreur upload S3: ${uploadResponse.status} ${uploadResponse.statusText} - ${errorText}`
      );
    }

    return {
      success: true,
      signatureUrl: presignResult.publicUrl,
    };
  } catch (error) {
    console.error('❌ Erreur upload S3, fallback vers local:', error);
    // Fallback vers l'endpoint local si S3 échoue
    return await uploadSignatureToLocalServer(signatureData, userId);
  }
};

/**
 * Fallback : Upload vers l'endpoint local Next.js
 */
const uploadSignatureToLocalServer = async (
  signatureData: string,
  userId: number
): Promise<SignatureUploadResponse> => {
  try {
    // Utiliser le nouvel endpoint base64
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signature/upload-base64`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signatureData: signatureData,
        userId: userId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Erreur upload local: ${response.status} ${response.statusText} - ${
          errorData.error || ""
        }`
      );
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Échec de l'upload local");
    }

    return {
      success: true,
      signatureUrl: result.signatureUrl,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
};

/**
 * Met à jour le statut de signature dans la base de données
 * Version avec authentification pour l'inscription
 */
export const updateUserSignatureStatus = async (
  userId: number,
  signatureUrl: string,
  hasSignature: boolean = true,
  accessToken?: string
): Promise<UpdateSignatureStatusResponse> => {
  try {
    // Utiliser le token passé en paramètre ou le récupérer depuis les cookies
    const token =
      accessToken ||
      (typeof window !== "undefined"
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("access_token="))
            ?.split("=")[1]
        : null);

    // Utiliser l'endpoint avec authentification
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signature-status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        userId,
        signature: signatureUrl,
        has_signature: hasSignature,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Erreur mise à jour: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const result = await response.json();

    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
};

/**
 * Fonction combinée : Upload + Mise à jour DB
 */
export const uploadSignatureAndUpdateUser = async (
  signatureData: string,
  userId: number,
  accessToken?: string
): Promise<{ success: boolean; error?: string; signatureUrl?: string }> => {
  try {
    // 1. Upload vers serveur de fichiers
    const uploadResult = await uploadSignatureToServer(signatureData, userId);

    if (!uploadResult.success || !uploadResult.signatureUrl) {
      return {
        success: false,
        error: uploadResult.error || "Échec de l'upload",
      };
    }

    // 2. Mise à jour base de données
    const updateResult = await updateUserSignatureStatus(
      userId,
      uploadResult.signatureUrl,
      true,
      accessToken
    );

    if (!updateResult.success) {
      return {
        success: false,
        error: updateResult.error || "Échec de la mise à jour",
      };
    }

    // 3. Mettre à jour le contexte d'authentification
    await updateAuthContextAfterSignature(userId, uploadResult.signatureUrl);

    return {
      success: true,
      signatureUrl: uploadResult.signatureUrl,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
};

/**
 * Vérifie le statut de signature d'un utilisateur
 */
export const checkUserSignatureStatus = async (
  userId: number
): Promise<{ success: boolean; has_signature: boolean; error?: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signature-status?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur serveur: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Erreur vérification statut signature:", error);
    return {
      success: false,
      has_signature: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
};

/**
 * Met à jour le contexte d'authentification après une signature
 */
export const updateAuthContextAfterSignature = async (
  userId: number,
  signatureUrl: string
) => {
  try {
    // Récupérer le token d'authentification
    const token =
      typeof window !== "undefined"
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("access_token="))
            ?.split("=")[1]
        : null;

    if (!token) {
      return;
    }

    // Récupérer les données utilisateur mises à jour depuis le backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur récupération utilisateur: ${response.status}`);
    }

    // Mettre à jour le cookie utilisateur avec les nouvelles données
    if (typeof window !== "undefined") {
      const userCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="))
        ?.split("=")[1];

      if (userCookie) {
        const currentUser = JSON.parse(decodeURIComponent(userCookie));
        const updatedUserData = {
          ...currentUser,
          signature: signatureUrl,
          has_signature: true,
        };

        // Mettre à jour le cookie
        document.cookie = `user=${JSON.stringify(
          updatedUserData
        )}; path=/; max-age=${7 * 24 * 60 * 60}`;

        return updatedUserData;
      }
    }
  } catch (error) {
    console.error("❌ Erreur mise à jour contexte:", error);
  }
};
