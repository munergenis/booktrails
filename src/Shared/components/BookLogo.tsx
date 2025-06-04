import BookLogoImg from '/book-transparent-256.webp';
import { Image } from '@heroui/react';

export const BookLogo = ({ width = 180 }: { width?: number }) => {
  return (
    <Image
      src={BookLogoImg}
      width={width}
    />
  );
};
