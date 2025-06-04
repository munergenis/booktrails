import { Navigate, Route, Routes } from 'react-router';

import { AddCollectionBook } from '@/pages/AddCollectionBook';
import { AppLayout } from '@/Shared/Layouts/AppLayout';
import { Book } from '@/pages/Book';
import { BookList } from '@/pages/BookList';
import { Collection } from '@/pages/Collection';
import { CollectionList } from '@/pages/CollectionList';
import { Home } from '@/pages/Home';
import { NewBook } from '@/pages/NewBook';
import { NewCollection } from '@/pages/NewCollection';

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<AppLayout />}
      >
        <Route
          index
          element={<Home />}
        />

        <Route path="books">
          <Route
            index
            element={<BookList />}
          />
          <Route
            path=":id"
            element={<Book />}
          />
          <Route
            path="new"
            element={<NewBook />}
          />
        </Route>

        <Route path="collections">
          <Route
            index
            element={<CollectionList />}
          />
          <Route path=":id">
            <Route
              index
              element={<Collection />}
            />
            <Route
              path="addBook"
              element={<AddCollectionBook />}
            />
          </Route>
          <Route
            path="new"
            element={<NewCollection />}
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Route>
    </Routes>
  );
};
