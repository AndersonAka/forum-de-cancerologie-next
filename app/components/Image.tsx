import NextImage, { ImageProps as NextImageProps } from 'next/image';

interface ImageProps extends NextImageProps {
    src: string;
    alt: string;
}

export default function Image({ src, alt, ...props }: ImageProps) {
    return (
        <NextImage
            src={src}
            alt={alt}
            unoptimized
            {...props}
        />
    );
} 