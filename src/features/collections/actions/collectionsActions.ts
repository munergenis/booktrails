import type { Collection } from '@/lib/interfaces/Book';

const COLLS_KEY = 'booksApp_collections';

export const collectionsActions = {
  getAll(): Collection[] {
    const raw = localStorage.getItem(COLLS_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  saveAll(cols: Collection[]) {
    localStorage.setItem(COLLS_KEY, JSON.stringify(cols));
  },

  add(col: Omit<Collection, 'id'>) {
    const collection: Collection = {
      ...col,
      id: crypto.randomUUID(),
    };
    const all = this.getAll();
    this.saveAll([collection, ...all]);
  },

  update(updated: Collection) {
    const all = this.getAll().map((c) => (c.id === updated.id ? updated : c));
    this.saveAll(all);
  },

  remove(colId: string) {
    const all = this.getAll().filter((c) => c.id !== colId);
    this.saveAll(all);
  },

  destroyAll() {
    localStorage.removeItem(COLLS_KEY);
  },
};
