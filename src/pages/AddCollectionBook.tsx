import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Listbox,
  ListboxItem,
  User,
} from '@heroui/react';

import BookLogo from '/book-transparent-256.webp';
import { useBooks } from '@/features/books/hooks/useBooks';
import { useParams } from 'react-router';
import { useState } from 'react';

export const AddCollectionBook = () => {
  const [query, setQuery] = useState('');

  const id = useParams().id!;

  const { booksQuery, addBookToCollection } = useBooks();

  const books = booksQuery.data ?? [];
  const collectionBooks = books.filter((b) => b.collectionId !== id);
  const filteredBooks = collectionBooks.filter((b) =>
    query === ''
      ? collectionBooks
      : b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author?.toLowerCase().includes(query.toLowerCase()) ||
        b.series?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <h2>Add Book to Collection</h2>
      </CardHeader>

      <CardBody>
        <Input
          className="py-2"
          label="Search"
          description="Find by Title, Author or Series"
          value={query}
          onValueChange={setQuery}
        />

        <Listbox>
          {filteredBooks.map((book) => (
            <ListboxItem
              key={book.id}
              onPress={() =>
                addBookToCollection.mutate({
                  bookId: book.id,
                  collectionId: id,
                })
              }
            >
              <User
                name={book.title}
                description={book.author}
                avatarProps={{ src: book.coverUrl ?? BookLogo }}
              />
            </ListboxItem>
          ))}
        </Listbox>
      </CardBody>
    </Card>
  );
};
