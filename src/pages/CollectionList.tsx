import { Button, Card, Input, Link } from '@heroui/react';
import { getBooksProgress, getCollectionBooksCount } from '@/lib/helpers/utils';

import { ListItemCard } from '@/Shared/components/ListItemCard';
import { useBooks } from '@/features/books/hooks/useBooks';
import { useCollections } from '@/features/collections/hooks/useCollections';
import { useProgress } from '@/features/progress/hooks/useProgress';
import { useState } from 'react';

export const CollectionList = () => {
  const [query, setQuery] = useState('');

  const { collectionsQuery } = useCollections();
  const { booksQuery } = useBooks();
  const { progressQuery } = useProgress();

  const collections = collectionsQuery.data ?? [];
  const { data: books } = booksQuery;
  const { data: progress } = progressQuery;

  const filteredCollections = collections.filter((c) =>
    query === ''
      ? collections
      : c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <Button
          as={Link}
          className="self-end"
          href="/collections/new"
        >
          New Collection
        </Button>

        <Input
          label="Search"
          description="Find by Title"
          value={query}
          onValueChange={setQuery}
        />

        {filteredCollections.length === 0 && (
          <Card className="py-8 text-center text-sm italic">
            Your collections will appear here
          </Card>
        )}

        {filteredCollections?.map((collection) => (
          <ListItemCard
            key={collection.id}
            itemType="collection"
            href={`/collections/${collection.id}`}
            title={collection.name}
            subtitle={`${getCollectionBooksCount(
              books || [],
              collection.id
            )} Books`}
            imageSrc={collection.coverUrl}
            progress={
              progress
                ? getBooksProgress(
                    books?.filter((b) => b.collectionId === collection.id) ||
                      [],
                    progress
                  )
                : 0
            }
          />
        ))}
      </div>
    </>
  );
};
