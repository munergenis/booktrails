import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { progressActions } from '../actions/progressActions';

type ToogleBookVars = { bookId: string };
type ToggleChapterVars = { bookId: string; chapterId: string };

export const useProgress = () => {
  const qc = useQueryClient();

  const progressQuery = useQuery({
    queryKey: ['progress'],
    queryFn: progressActions.get,
  });

  const recentQuery = useQuery({
    queryKey: ['recent'],
    queryFn: progressActions.getRecent,
  });

  const toggleBook = useMutation<void, Error, ToogleBookVars>({
    mutationFn: async ({ bookId }) => progressActions.toggleBook(bookId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['progress'] });
      qc.invalidateQueries({ queryKey: ['recent'] });
    },
  });

  const toggleChapter = useMutation<void, Error, ToggleChapterVars>({
    mutationFn: async ({ bookId, chapterId }) =>
      progressActions.toggleChapter(bookId, chapterId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['progress'] });
      qc.invalidateQueries({ queryKey: ['recent'] });
    },
  });

  return { progressQuery, recentQuery, toggleBook, toggleChapter };
};
