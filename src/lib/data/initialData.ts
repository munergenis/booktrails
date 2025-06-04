import type { Book, Collection, ReadingProgress } from '../interfaces/Book';

import { booksActions } from '@/features/books/actions/booksActions';
import { collectionsActions } from '@/features/collections/actions/collectionsActions';
import { destroyUser } from '@/features/user/actions/setName';
import { progressActions } from '@/features/progress/actions/progressActions';

const ruedaCollection: Collection = {
  id: crypto.randomUUID(),
  name: 'La Rueda del Tiempo',
  coverUrl:
    'https://uwaterloo.ca/writing-and-communication-centre/sites/default/files/uploads/images/old_books.jpg',
};
const ruedaBooks: Book[] = [
  {
    id: crypto.randomUUID(),
    title: '0. Nueva Primavera',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan',
    pages: 336,
    coverUrl: 'https://m.media-amazon.com/images/I/81ZlEEV2GZL.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 27 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '1. El Ojo del Mundo',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan',
    pages: 832,
    coverUrl: 'https://m.media-amazon.com/images/I/91BrzYTawmL.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 55 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '2. La Gran Cacería',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan',
    pages: 720,
    coverUrl:
      'https://m.media-amazon.com/images/I/914DPO9905L._AC_UF1000,1000_QL80_.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 51 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '3. El Dragón Renacido',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan',
    pages: 688,
    coverUrl: 'https://m.media-amazon.com/images/I/91n7rmBrLIL.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 57 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '4. El ascenso de la Sombra',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan',
    pages: 1056,
    coverUrl:
      'https://m.media-amazon.com/images/I/81bQLqKbBlL._AC_UF1000,1000_QL80_.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 58 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '5. El Cielo en Llamas',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan',
    pages: 960,
    coverUrl: 'https://m.media-amazon.com/images/I/81mqsZFYBeL.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 57 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '6. El Señor del Caos',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan',
    pages: 1088,
    coverUrl: 'https://m.media-amazon.com/images/I/813WLY0+tpL.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 57 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '7. La Corona de Espadas',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan',
    pages: 768,
    coverUrl: 'https://m.media-amazon.com/images/I/91iYwJwyBgL.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 42 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '8. El Camino de Dagas',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan',
    pages: 608,
    coverUrl: 'https://m.media-amazon.com/images/I/91rDi+6VNQL.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 32 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '9. El Corazón del invierno',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan',
    pages: 640,
    coverUrl:
      'https://m.media-amazon.com/images/I/81bg9UC5vsL._UF1000,1000_QL80_.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 36 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '10. Encrucijada en el Crepúsculo',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan',
    pages: 688,
    coverUrl: 'https://m.media-amazon.com/images/I/91ovvsJ+jnL.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 32 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '11. Cuchillo de Sueños',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan',
    pages: 800,
    coverUrl: 'https://m.media-amazon.com/images/I/914zqFy7yiS.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 39 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '12. La Tormenta',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan & Brandon Sanderson',
    pages: 832,
    coverUrl:
      'https://m.media-amazon.com/images/I/91hhQk7jJLL._UF1000,1000_QL80_.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 52 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '13. Torres de Medianoche',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan & Brandon Sanderson',
    pages: 944,
    coverUrl:
      'https://m.media-amazon.com/images/I/91rd0eczVEL._UF1000,1000_QL80_DpWeblab_.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 59 }, () => ({ id: crypto.randomUUID() })),
  },
  {
    id: crypto.randomUUID(),
    title: '14. Un recuerdo de Luz',
    series: 'La Rueda del Tiempo',
    author: 'Robert Jordan & Brandon Sanderson',
    pages: 984,
    coverUrl: 'https://m.media-amazon.com/images/I/91TyzsluhoL.jpg',
    collectionId: ruedaCollection.id,
    chapters: Array.from({ length: 51 }, () => ({ id: crypto.randomUUID() })),
  },
];

const randomBook: Book = {
  id: crypto.randomUUID(),
  title: 'Random Book',
};

// Colección de clásicos
const clasicosCollection: Collection = {
  id: crypto.randomUUID(),
  name: 'Clásicos de la Literatura',
  coverUrl:
    'https://images.desenio.com/zoom/7358_2.jpg?auto=compress%2Cformat&fit=max&w=3840',
};

const clasicosBooks: Book[] = [
  {
    id: crypto.randomUUID(),
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    series: 'Clásicos',
    pages: 863,
    coverUrl:
      'https://m.media-amazon.com/images/I/91CIwR3QU1L._UF1000,1000_QL80_.jpg',
    collectionId: clasicosCollection.id,
    chapters: [
      { id: crypto.randomUUID(), title: 'Prólogo', type: 'pre', pages: 8 },
      { id: crypto.randomUUID(), title: 'Capítulo I', type: 'main', pages: 12 },
      {
        id: crypto.randomUUID(),
        title: 'Capítulo II',
        type: 'main',
        pages: 15,
      },
      {
        id: crypto.randomUUID(),
        title: 'Capítulo III',
        type: 'main',
        pages: 14,
      },
      { id: crypto.randomUUID(), title: 'Epílogo', type: 'post', pages: 6 },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Moby Dick',
    author: 'Herman Melville',
    series: 'Clásicos',
    pages: 635,
    coverUrl:
      'https://m.media-amazon.com/images/I/712mdW4zCcL._AC_UF1000,1000_QL80_.jpg',
    collectionId: clasicosCollection.id,
    chapters: [
      { id: crypto.randomUUID(), title: 'Extractos', type: 'pre', pages: 10 },
      {
        id: crypto.randomUUID(),
        title: 'Capítulo 1: Loomings',
        type: 'main',
        pages: 18,
      },
      {
        id: crypto.randomUUID(),
        title: 'Capítulo 2: The Carpet-Bag',
        type: 'main',
        pages: 14,
      },
      {
        id: crypto.randomUUID(),
        title: 'Capítulo 3: The Spouter-Inn',
        type: 'main',
        pages: 16,
      },
      { id: crypto.randomUUID(), title: 'Epílogo', type: 'post', pages: 7 },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: 'Orgullo y Prejuicio',
    author: 'Jane Austen',
    series: 'Clásicos',
    pages: 432,
    coverUrl:
      'https://m.media-amazon.com/images/I/61wAZk6G8mL._AC_UF1000,1000_QL80_.jpg',
    collectionId: clasicosCollection.id,
    chapters: [
      { id: crypto.randomUUID(), title: 'Prólogo', type: 'pre', pages: 5 },
      { id: crypto.randomUUID(), title: 'Capítulo 1', type: 'main', pages: 10 },
      { id: crypto.randomUUID(), title: 'Capítulo 2', type: 'main', pages: 12 },
      { id: crypto.randomUUID(), title: 'Capítulo 3', type: 'main', pages: 13 },
      { id: crypto.randomUUID(), title: 'Epílogo', type: 'post', pages: 4 },
    ],
  },
];

export const collections: Collection[] = [ruedaCollection];
export const books: Book[] = [...ruedaBooks, randomBook];

export const initialReadingProgress: ReadingProgress = {
  // aquí los libros marcados 100% completos
  booksRead: [
    books[1].id, // '1. El Ojo del Mundo'
    books[2].id, // '2. La Gran Cacería'
  ],

  // aquí un map bookId → array de chapterIds leídos
  chaptersRead: {
    // en '3. El Dragón Renacido' hemos leído los 5 primeros capítulos
    [books[3].id]: books[3].chapters!.slice(0, 5).map((ch) => ch.id),

    // en '4. El ascenso de la Sombra' hemos leído 2 capítulos
    [books[4].id]: books[4].chapters!.slice(0, 2).map((ch) => ch.id),
  },
};

export const collections2: Collection[] = [clasicosCollection];
export const books2: Book[] = [...clasicosBooks];

export const initialReadingProgress2: ReadingProgress = {
  booksRead: [
    books2[0].id, // Don Quijote leído
  ],
  chaptersRead: {
    // En Moby Dick hemos leído los dos primeros capítulos
    [books2[1].id]: books2[1].chapters!.slice(0, 3).map((ch) => ch.id),
    // En Orgullo y Prejuicio hemos leído el prólogo y el primer capítulo
    [books2[2].id]: books2[2].chapters!.slice(0, 2).map((ch) => ch.id),
  },
};

export const setInitialData = () => {
  collectionsActions.saveAll(collections);
  booksActions.saveAll(books);
  progressActions.save(initialReadingProgress);
  progressActions.saveRecent([books[0].id, books[1].id]);
};

export const setInitialData2 = () => {
  collectionsActions.saveAll(collections2);
  booksActions.saveAll(books2);
  progressActions.save(initialReadingProgress2);
  progressActions.saveRecent([books2[0].id, books2[1].id]);
};

export const removeAllData = () => {
  collectionsActions.destroyAll();
  booksActions.destroyAll();
  progressActions.destroyAll();
  destroyUser();
};
