import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/query_keys';
import { supabase } from '../../../database/supabase';

export const useMoveClient = () => {
  const toast = useToast();

  const queryClient = useQueryClient();

  const { mutate: moveClient } = useMutation({
    mutationFn: async (client) => await supabase.from('chances').insert(client),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getClients] });
      toast({
        title: 'Client moved',
        description: `success moving client`,
      });
    },
    onError: (error) => console.error(error), //eslint-disable-line
  });
  return { moveClient };
};
