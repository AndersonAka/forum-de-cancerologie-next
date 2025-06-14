import NextImage, { ImageProps as NextImageProps } from 'next/image';

interface ImageProps extends Omit<NextImageProps, 'src'> {
    src: string;
    alt: string;
}

export default function Image({ src, alt, ...props }: ImageProps) {
    // Si l'image est dans le dossier public, ajouter le chemin complet
    const imageSrc = src.startsWith('/') ? src : `/img/${src}`;

    return (
        <NextImage
            src={imageSrc}
            alt={alt}
            unoptimized
            {...props}
        />
    );
} 