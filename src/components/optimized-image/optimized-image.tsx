interface OptimizedImageProps {
    className?: string;
    alt: string;
    height?: number;
    src?: string;
    width?: number;
}

const OptimizedImage = ({
    alt,
    className,
    height,
    src,
    width,
}: OptimizedImageProps) => {
    return (
        <img
            alt={alt}
            className={className}
            decoding="async"
            height={height}
            loading="lazy"
            src={src}
            width={width}
        />
    );
};

export type { OptimizedImageProps };
export default OptimizedImage;
