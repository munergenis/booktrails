import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Collection } from '@/lib/interfaces/Book';
import { collectionsActions } from '../actions/collectionsActions';

export const useCollections = () => {
  const qc = useQueryClient();

  const collectionsQuery = useQuery({
    queryKey: ['collections'],
    queryFn: collectionsActions.getAll,
  });

  const addCollection = useMutation<void, Error, Omit<Collection, 'id'>>({
    mutationFn: async (collection: Omit<Collection, 'id'>) =>
      collectionsActions.add(collection),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['collections'] }),
  });

  const updateCollection = useMutation<void, Error, Collection>({
    mutationFn: async (collection: Collection) =>
      collectionsActions.update(collection),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['collections'] }),
  });

  const removeCollection = useMutation<void, Error, string>({
    mutationFn: async (id: string) => collectionsActions.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['collections'] }),
  });

  return {
    collectionsQuery,
    addCollection,
    updateCollection,
    removeCollection,
  };
};
