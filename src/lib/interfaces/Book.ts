export interface Chapter {
  id: string;
  title?: string;
  pages?: number;
  type?: 'pre' | 'main' | 'post';
}

export interface Book {
  id: string;
  title: string;
  author?: string;
  series?: string;
  pages?: number;
  chapters?: Chapter[];
  collectionId?: string;
  coverUrl?: string;
}

export interface Collection {
  id: string;
  name: string;
  coverUrl?: string;
}

export interface ReadingProgress {
  booksRead: string[];
  chaptersRead: Record<string, string[]>;
}
