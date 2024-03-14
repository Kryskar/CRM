import { Spinner } from "@chakra-ui/react";

import { useGetClientsFromSupabase } from "../../api/queries/useGetClientsFromSupabase";
import { ClientsTableSort } from "../../components/ClientsTable/ClientsTableSort";

const Clients = () => {
  const { data, error, isLoading } = useGetClientsFromSupabase();

  if (isLoading) {
    return <Spinner />;
  }
  if (error){
    return <p>error</p>
  }
  // return <ClientsTable data={data}/>;
  return <ClientsTableSort data={data}/>
};

export default Clients;
