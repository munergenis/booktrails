import { Button, Card, Input } from '@heroui/react';

import { Link } from 'react-router';
import { ListItemCard } from '@/Shared/components/ListItemCard';
import { getBookProgress } from '@/lib/helpers/utils';
import { useBooks } from '@/features/books/hooks/useBooks';
import { useProgress } from '@/features/progress/hooks/useProgress';
import { useState } from 'react';

export const BookList = () => {
  const [query, setQuery] = useState('');

  const { booksQuery } = useBooks();
  const { progressQuery } = useProgress();

  const books = booksQuery.data ?? [];
  const { data: progress } = progressQuery;

  const filteredBooks = books.filter((b) =>
    query === ''
      ? books
      : b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author?.toLowerCase().includes(query.toLowerCase()) ||
        b.series?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Button
          as={Link}
          className="self-end"
          to="/books/new"
        >
          New Book
        </Button>

        <Input
          label="Search"
          description="Find by Title, Author or Series"
          value={query}
          onValueChange={setQuery}
        />

        {filteredBooks.length === 0 && (
          <Card className="py-8 text-center text-sm italic">
            Your books will appear here
          </Card>
        )}

        {filteredBooks.map((book) => (
          <ListItemCard
            key={book.id}
            href={`/books/${book.id}`}
            title={book.title}
            subtitle={book.series}
            author={book.author}
            imageSrc={book.coverUrl}
            progress={progress ? getBookProgress(book, progress) : 0}
          />
        ))}
      </div>
    </div>
  );
};
