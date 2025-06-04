import { getUserName, setUserName } from '../actions/setName';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUserName = () => {
  const qc = useQueryClient();

  const userNameQuery = useQuery({
    queryKey: ['userName'],
    queryFn: () => getUserName(),
  });

  const updateUserName = useMutation<void, Error, string>({
    mutationFn: async (userName: string) => setUserName(userName),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['userName'] }),
  });

  return { userNameQuery, updateUserName };
};
