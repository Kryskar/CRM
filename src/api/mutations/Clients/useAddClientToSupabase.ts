import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { INDEX_OF_FIRST_ITEM } from '../../../constants/constants';
import { QUERY_KEYS } from '../../../constants/query_keys';
import { supabase } from '../../../database/supabase';
import { useGetSession } from '../../../hooks/useGetSession';
import { NewClient } from '../../../pages/Add_Client/AddClient';

export const useAddClientToSupabase = () => {
  const toast = useToast();
  const { decodedData } = useGetSession();
  const queryClient = useQueryClient();
  // const { setClient } = useAddClientContext();
  const { mutate: addClient } = useMutation({
    mutationFn: async (data: Omit<NewClient, 'id' | 'addedTime' | 'clientStatus'>) => {
      await supabase
        .from('clients')
        .insert(data)
        .select()
        .then((res) => {
          if (decodedData && res.data) {
            const eventObj = {
              user: JSON.stringify(decodedData.user_metadata),
              client: JSON.stringify(res.data[INDEX_OF_FIRST_ITEM]),
              eventName: "added client"
            };
            supabase.from('events').insert(eventObj).select();
          }
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getClients] });
      toast({
        title: 'Client Added',
        description: `success adding client`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => console.error(error), //eslint-disable-line
  });
  return { addClient };
};
