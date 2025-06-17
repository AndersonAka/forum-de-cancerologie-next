"use client";

import { useState } from "react";

interface DownloadProgramButtonProps {
    day: 1 | 2;
    className?: string;
    size?: "small" | "medium" | "large";
    variant?: "primary" | "secondary" | "outline";
    showIcon?: boolean;
    showText?: boolean;
}

export const DownloadProgramButton = ({
    day,
    className = "",
    size = "medium",
    variant = "primary",
    showIcon = true,
    showText = true
}: DownloadProgramButtonProps) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        try {
            setIsDownloading(true);

            // Télécharger directement depuis le dossier public
            const response = await fetch(`/programmes/programme-jour-${day}-forum-cancerologie-2025.pdf`);

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `programme-jour-${day}-forum-cancerologie-2025.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                throw new Error('Fichier non trouvé');
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement:', error);
            alert('Erreur lors du téléchargement du programme. Le fichier pourrait ne pas être disponible.');
        } finally {
            setIsDownloading(false);
        }
    };

    const sizeClasses = {
        small: "px-3 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-6 py-3 text-lg"
    };

    const variantClasses = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-600 hover:bg-gray-700 text-white",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`
                ${sizeClasses[size]}
                ${variantClasses[variant]}
                ${className}
                flex items-center gap-2 rounded-lg font-medium transition-colors duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2
            `}
            aria-label={`Télécharger le programme du jour ${day}`}
        >
            {isDownloading ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
            ) : showIcon ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ) : null}

            {showText && (
                <span>
                    {isDownloading
                        ? "Téléchargement..."
                        : `Télécharger le programme du jour ${day}`
                    }
                </span>
            )}
        </button>
    );
}; 