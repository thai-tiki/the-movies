import { FC, useState, useEffect, useCallback, CSSProperties } from "react";

import styles from "./styles.module.scss";

interface IImageProps {
  alt: string;
  src: string;
  lazy?: boolean;
  className?: string;
  fallbackSrc?: string;
  style?: CSSProperties;
  onError?: (error: any) => void;
}

const IMAGE_DEFAULT =
  "https://salt.tikicdn.com/ts/tiniapp/41/2c/cc/b266faa5e276dab44b31e2b2a0d7780f.png";

export const Image: FC<IImageProps> = ({
  alt,
  src,
  lazy,
  onError,
  fallbackSrc,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(IMAGE_DEFAULT);
  const [imageRef, setImageRef] = useState<any>(null);

  useEffect(() => {
    let observer: any = null;
    let didCancel = false;

    if (imageRef) {
      const imageResized = src;
      if (typeof IntersectionObserver !== "undefined" && lazy) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(imageResized);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: "75%",
          }
        );
        observer.observe(imageRef);
      } else {
        setImageSrc(imageResized);
      }
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageRef, lazy]);

  const handleError = useCallback(
    (error: any) => {
      error.target.onerror = null;
      error.target.src = fallbackSrc || IMAGE_DEFAULT;
    },
    [onError]
  );

  return (
    <img
      alt={alt}
      src={imageSrc}
      ref={setImageRef}
      onError={handleError}
      loading={lazy ? "lazy" : "eager"}
      {...props}
      className={`${styles.image} ${props.className}`}
    />
  );
};
