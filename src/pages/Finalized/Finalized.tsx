import { Flex, Spinner } from "@chakra-ui/react";

import { useGetFinalizedFromSupabase } from "../../api/queries/useGetFinalizedfromSupabase";
import { ClientsTableSort } from "../../components/ClientsTable/ClientsTableSort";
import { columnsFinalized } from "../../components/ClientsTable/columns";

const Finalized = () => {
  const {data, isLoading} = useGetFinalizedFromSupabase()

  if (isLoading) return <Spinner/>
  return (
    <Flex flexDirection={'column'}>
      <ClientsTableSort columns={columnsFinalized} data={data} />
    </Flex>
  );
};

export default Finalized;
