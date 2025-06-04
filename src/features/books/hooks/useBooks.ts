import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Book } from '@/lib/interfaces/Book';
import { booksActions } from '../actions/booksActions';

interface AddBookToCollectionVars {
  bookId: string;
  collectionId: string;
}

export const useBooks = () => {
  const qc = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ['books'],
    queryFn: booksActions.getAll,
  });

  const addBook = useMutation<void, Error, Omit<Book, 'id'>>({
    mutationFn: async (newBook: Omit<Book, 'id'>) => booksActions.add(newBook),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['books'] }),
  });

  const updateBook = useMutation<void, Error, Book>({
    mutationFn: async (book: Book) => booksActions.update(book),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['books'] }),
  });

  const addBookToCollection = useMutation<void, Error, AddBookToCollectionVars>(
    {
      mutationFn: async ({ bookId, collectionId }) =>
        booksActions.addBookToCollection(bookId, collectionId),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['books'] });
        qc.invalidateQueries({ queryKey: ['collections'] });
      },
    }
  );

  const removeBookFromCollection = useMutation<void, Error, string>({
    mutationFn: async (bookId: string) =>
      booksActions.removeFromCollection(bookId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['books'] });
      qc.invalidateQueries({ queryKey: ['collections'] });
    },
  });

  const removeBook = useMutation<void, Error, string>({
    mutationFn: async (id: string) => booksActions.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['books'] });
      qc.invalidateQueries({ queryKey: ['progress'] });
      qc.invalidateQueries({ queryKey: ['recent'] });
    },
  });

  return {
    booksQuery,
    addBook,
    updateBook,
    removeBook,
    removeBookFromCollection,
    addBookToCollection,
  };
};
