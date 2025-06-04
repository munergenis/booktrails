import CollectionLogoImg from '/collection-transparent-256.webp';
import { Image } from '@heroui/react';

export const CollectionLogo = ({ width = 180 }: { width?: number }) => {
  return (
    <Image
      src={CollectionLogoImg}
      width={width}
    />
  );
};
