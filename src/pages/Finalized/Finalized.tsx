import { useEffect, useState } from "react";
import { Flex, FormControl, Select, Spinner } from "@chakra-ui/react";

import { useGetFinalizedFromSupabase } from "../../api/queries/useGetFinalizedfromSupabase";
import { useGetUsersFromSupabase } from "../../api/queries/useGetUsersFromSupabase";
import { ClientsTableSort } from "../../components/ClientsTable/ClientsTableSort";
import { columnsFinalized } from "../../components/ClientsTable/columns";


const Finalized = () => {
  const {data, isLoading} = useGetFinalizedFromSupabase()
  const {data:users,isLoading:isLoadingUsers} = useGetUsersFromSupabase()
  const [filteredData, setFilteredData] = useState(data)

  useEffect(()=>{setFilteredData(data)},[data])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>)=> {
    const singleAgentFinalized = data.filter(el=>el.agentEmail===e.target.value)
    setFilteredData(singleAgentFinalized)
    if (e.target.value==="all"){
      setFilteredData(data)
    }
  }

  if (isLoading || isLoadingUsers) return <Spinner/>
  return (
    <Flex flexDirection={'column'}>
      <FormControl alignSelf={'flex-end'} w={'15%'}>
        <Select onChange={handleChange}>
        <option value={'all'}>{'all'}</option>
          {users.map(user => <option key={user.id} value={user.email}>{user.fullName}</option> )}
        </Select>
      </FormControl>
      <ClientsTableSort columns={columnsFinalized} data={filteredData} />
    </Flex>
  );
};

export default Finalized;
