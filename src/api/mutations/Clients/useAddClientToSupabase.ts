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
  const { mutate: addClient } = useMutation({
    mutationFn: async (newClient: Omit<NewClient, 'id' | 'addedTime' | 'clientStatus'>) => {
      const {data}=await supabase
        .from('clients')
        .insert(newClient)
        .select()

       if (decodedData && data) {
            const eventObj = {
              user: JSON.stringify(decodedData.user_metadata),
              client: JSON.stringify(data[INDEX_OF_FIRST_ITEM]),
              eventName: "added client"
            };
            await supabase.from('events').insert(eventObj).select();
          }
 
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
