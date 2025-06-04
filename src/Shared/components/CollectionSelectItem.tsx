import { Avatar } from '@heroui/react';
import type { Collection } from '@/lib/interfaces/Book';
import { CollectionLogo } from './CollectionLogo';

interface CollectionSelectItemProps {
  collection: Omit<Collection, 'id'>;
}

export const CollectionSelectItem = ({
  collection,
}: CollectionSelectItemProps) => {
  return (
    <div className="flex items-center gap-2">
      {collection.coverUrl ? (
        <Avatar
          size="sm"
          src={collection.coverUrl}
        />
      ) : (
        <CollectionLogo width={32} />
      )}
      <span className="font-semibold">{collection.name}</span>
    </div>
  );
};
