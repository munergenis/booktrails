import type { Book, Chapter, ReadingProgress } from '../interfaces/Book';

export function getBookProgress(book: Book, progress: ReadingProgress): number {
  const { chapters } = book;

  if (progress.booksRead.includes(book.id)) {
    return 100;
  }
  if (!chapters) {
    return 0;
  }

  const readChapters = progress.chaptersRead[book.id] || [];
  const allHavePages = chapters.every((ch) => typeof ch.pages === 'number');

  if (allHavePages) {
    const totalPages = chapters.reduce((sum, ch) => sum + (ch.pages || 0), 0);
    const readPages = chapters
      .filter((ch) => readChapters.includes(ch.id))
      .reduce((sum, ch) => sum + (ch.pages || 0), 0);
    return totalPages > 0 ? Math.round((readPages / totalPages) * 100) : 0;
  } else {
    const total = chapters.length;
    const read = readChapters.length;
    return total > 0 ? Math.round((read / total) * 100) : 0;
  }
}

export function getBooksProgress(
  books: Book[],
  progress: ReadingProgress
): number {
  if (books.length === 0) return 0;

  const total = books.length;
  const sum = books.reduce(
    (sum, book) => sum + getBookProgress(book, progress),
    0
  );

  return Math.round(sum / total);
}

export function getCollectionBooksCount(
  books: Book[],
  collectionId: string
): number {
  return books.filter((b) => b.collectionId === collectionId).length;
}

export function getCollectionBooks(
  books: Book[],
  collectionId: string
): Book[] {
  return books.filter((b) => b.collectionId === collectionId);
}

/**
 * Comprueba si una URL carga correctamente como imagen.
 * @param url La URL a verificar.
 * @returns Promise que resuelve `true` si es una imagen válida, `false` si falla.
 */
export function checkImageUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true); // cargó sin errores
    img.onerror = () => resolve(false); // fallo al cargar
    img.src = url;
  });
}

export function getChaptersWithLabels(chapters: Chapter[]) {
  const counters: Record<'pre' | 'main' | 'post' | 'default', number> = {
    pre: 0,
    main: 0,
    post: 0,
    default: 0,
  };

  return chapters.map((ch) => {
    const group = ch.type ?? 'default';
    counters[group] += 1;
    const idx = counters[group];

    let label: string;
    switch (group) {
      case 'pre':
        label = `Pre. ${ch.title ?? `Chapter ${idx}`}`;
        break;
      case 'post':
        label = `Post. ${ch.title ?? `Chapter ${idx}`}`;
        break;
      case 'main':
        label = `${ch.title ? `${idx}. ${ch.title}` : `Chapter ${idx}`}`;
        break;
      default:
        label = `Chapter ${idx}`;
    }
    // if (ch.pages != null) {
    //   label += ` (${ch.pages} páginas)`;
    // }

    return { id: ch.id, label, pages: ch.pages };
  });
}
