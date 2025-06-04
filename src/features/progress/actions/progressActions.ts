import type { ReadingProgress } from '@/lib/interfaces/Book';

const PROG_KEY = 'booksApp_progress';
const RECENT_KEY = 'booksApp_recent';
const RECENT_MAX_COUNT = 4;

export const progressActions = {
  get(): ReadingProgress {
    const raw = localStorage.getItem(PROG_KEY);
    return raw ? JSON.parse(raw) : { booksRead: [], chaptersRead: {} };
  },

  save(progress: ReadingProgress) {
    localStorage.setItem(PROG_KEY, JSON.stringify(progress));
  },

  toggleBook(bookId: string) {
    const prog = this.get();
    const isBookRead = prog.booksRead.includes(bookId);
    const booksRead = isBookRead
      ? prog.booksRead.filter((id) => id !== bookId)
      : Array.from(new Set([...prog.booksRead, bookId]));

    this.save({ ...prog, booksRead });
    this.updateRecent(bookId);
  },

  toggleChapter(bookId: string, chapterId: string) {
    const prog = this.get();
    const prev = prog.chaptersRead[bookId] || [];
    const isChapterRead = prev.includes(chapterId);
    const chapterIds = isChapterRead
      ? prev.filter((chId) => chId !== chapterId)
      : Array.from(new Set([...prev, chapterId]));

    this.save({
      ...prog,
      chaptersRead: { ...prog.chaptersRead, [bookId]: chapterIds },
    });
    this.updateRecent(bookId);
  },

  removeBookProgress(bookId: string) {
    const prog = this.get();
    const newBooksRead = [...prog.booksRead].filter((bId) => bId !== bookId);
    const newChaptersRead = Object.entries(prog.chaptersRead).filter(
      ([key]) => key !== bookId
    );
    this.save({
      booksRead: newBooksRead,
      chaptersRead: Object.fromEntries(newChaptersRead),
    });
    this.removeFromRecent(bookId);
  },

  removeFromRecent(bookId: string) {
    const recent = this.getRecent();
    this.saveRecent(recent.filter((bId) => bId !== bookId));
  },

  saveRecent(recent: string[]) {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  },
  getRecent(): string[] {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  updateRecent(bookId: string) {
    const raw = localStorage.getItem(RECENT_KEY);
    const prevRecentBookIds: string[] = raw ? JSON.parse(raw) : [];

    const recentBooks = [
      bookId,
      ...prevRecentBookIds.filter((id) => id !== bookId),
    ];

    const limitedRecentBooks = recentBooks.slice(0, RECENT_MAX_COUNT);

    localStorage.setItem(RECENT_KEY, JSON.stringify(limitedRecentBooks));
  },

  destroyAll() {
    localStorage.removeItem(PROG_KEY);
    localStorage.removeItem(RECENT_KEY);
  },
};
