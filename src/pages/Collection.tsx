import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardHeader,
  Divider,
} from '@heroui/react';
import { Link, useParams } from 'react-router';
import { getBookProgress, getCollectionBooks } from '@/lib/helpers/utils';

import { ListItemCard } from '@/Shared/components/ListItemCard';
import { useBooks } from '@/features/books/hooks/useBooks';
import { useCollections } from '@/features/collections/hooks/useCollections';
import { useProgress } from '@/features/progress/hooks/useProgress';

export const Collection = () => {
  const id = useParams().id!;

  const { collectionsQuery } = useCollections();
  const { booksQuery, removeBookFromCollection } = useBooks();
  const { progressQuery } = useProgress();

  const isLoading = collectionsQuery.isLoading;
  const collection = collectionsQuery.data?.find((coll) => coll.id === id);

  const books = booksQuery.data ?? [];
  const progress = progressQuery.data;
  const collectionBooks = getCollectionBooks(books, id);

  if (isLoading) {
    return <p className="italic text-center py-8">Loading collection...</p>;
  }

  if (!collection) {
    return (
      <div>
        <p className="italic text-center py-8">Collection not found :(</p>
        <div className="flex justify-center">
          <Button
            as={Link}
            to="/collections"
          >
            &larr; Collections
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs className="mb-4">
        <BreadcrumbItem href="/collections">Collections</BreadcrumbItem>
        <BreadcrumbItem href={`/collections/${collection.id}`}>
          {collection.name}
        </BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex flex-col gap-4">
        <Card
          className="sticky top-20 z-20"
          isBlurred
        >
          <CardHeader className="justify-between">
            <div className="flex flex-col items-start">
              <span className="text-sm italic">
                {collectionBooks.length} Books ~ Collection
              </span>
              <h2>{collection.name}</h2>
            </div>
            <Button
              as={Link}
              to={`/collections/${id}/addBook`}
            >
              Add Book
            </Button>
          </CardHeader>
        </Card>

        <Divider />

        {collectionBooks.length > 0 ? (
          collectionBooks.map((book) => (
            <div
              className="relative"
              key={book.id}
            >
              <ListItemCard
                href={`/books/${book.id}`}
                title={book.title}
                progress={progress ? getBookProgress(book, progress) : 0}
                imageSrc={book.coverUrl}
              />
              <Button
                className="absolute right-4 top-4 opacity-70 z-10"
                color="danger"
                variant="flat"
                size="sm"
                onPress={() => removeBookFromCollection.mutate(book.id)}
              >
                Unlink Book
              </Button>
            </div>
          ))
        ) : (
          <Card className="py-8 text-center text-sm italic">
            Your collection books will appear here
          </Card>
        )}
      </div>
    </>
  );
};
