import type { Book } from '@/lib/interfaces/Book';
import { progressActions } from '@/features/progress/actions/progressActions';

const BOOKS_KEY = 'booksApp_books';

export const booksActions = {
  getAll(): Book[] {
    const raw = localStorage.getItem(BOOKS_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  saveAll(books: Book[]) {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  },

  add(newBook: Omit<Book, 'id'>) {
    const all = this.getAll();
    const newBookId = crypto.randomUUID();
    this.saveAll([...all, { ...newBook, id: newBookId }]);
  },

  addBookToCollection(bookId: string, collectionId: string) {
    const all = this.getAll().map((b) =>
      b.id === bookId ? { ...b, collectionId } : b
    );
    this.saveAll(all);
  },

  update(updated: Book) {
    const all = this.getAll().map((b) => (b.id === updated.id ? updated : b));
    this.saveAll(all);
  },

  removeFromCollection(bookId: string) {
    const all: Book[] = this.getAll().map((b) =>
      b.id === bookId ? { ...b, collectionId: undefined } : b
    );
    this.saveAll(all);
  },

  remove(bookId: string) {
    const all = this.getAll().filter((b) => b.id !== bookId);
    progressActions.removeBookProgress(bookId);
    this.saveAll(all);
  },

  destroyAll() {
    localStorage.removeItem(BOOKS_KEY);
  },
};
