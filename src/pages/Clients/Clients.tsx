import { useState } from 'react';
import { Flex, FormControl, Select, Spinner } from '@chakra-ui/react';

import { useGetClientsFromSupabase } from '../../api/queries/useGetClientsFromSupabase';
import { ClientsTableSort } from '../../components/ClientsTable/ClientsTableSort';
import { columnsClients, columnsClientsWithAgent } from '../../components/ClientsTable/columns';
import { STATUSES } from '../../constants/constants';
import { useSessionContext } from '../../contexts/SessionProvider';

const Clients = () => {
  const {email} = useSessionContext()
  const [clientStatusToFilter, setClientStatusToFilter] = useState(STATUSES.callClient);
  const { data, error, isLoading } = useGetClientsFromSupabase(clientStatusToFilter, email);

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
          <option value={STATUSES.callClient}>{STATUSES.callClient}</option>
          <option value={STATUSES.chance}>{'your chances'}</option>
          <option value={STATUSES.notDoable}>{STATUSES.notDoable}</option>
          <option value={'all'}>{'all'}</option>
          {/* <option value={STATUSES.reported}>{STATUSES.reported}</option> */}
        </Select>
      </FormControl>
      <ClientsTableSort
        data={data}
        columns={
          clientStatusToFilter === STATUSES.callClient || clientStatusToFilter === STATUSES.chance
            ? columnsClients
            : columnsClientsWithAgent
        }
      />
    </Flex>
  );
};

export default Clients;
