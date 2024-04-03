import { useState } from 'react';
import { Flex, FormControl, Select, Spinner } from '@chakra-ui/react';

import { useGetClientsFromSupabase } from '../../api/queries/useGetClientsFromSupabase';
import { ClientsTableSort } from '../../components/ClientsTable/ClientsTableSort';
import { STATUSES } from '../../constants/constants';

const Clients = () => {
  const [clientStatusToFilter, setClientStatusToFilter] = useState(STATUSES.callClient);
  const { data, error, isLoading } = useGetClientsFromSupabase(clientStatusToFilter);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClientStatusToFilter(e.target.value);
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <p>error</p>;
  }
  return (
    <Flex flexDirection={'column'}>
      <FormControl alignSelf={'flex-end'} w={'15%'}>
        <Select value={clientStatusToFilter} onChange={handleChange}>
          <option value={STATUSES.callClient}>
            {STATUSES.callClient}
          </option>
          <option value={STATUSES.chance}>{STATUSES.chance}</option>
          <option value={STATUSES.notDoable}>{STATUSES.notDoable}</option>
          <option value={"all"}>{"all"}</option>
        </Select>
      </FormControl>
      <ClientsTableSort data={data} />
    </Flex>
  );
};

export default Clients;
