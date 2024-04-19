import { chakra,Flex } from "@chakra-ui/react";

import { NewClient } from "../../../api/mutations/Clients/useAddClientToSupabase";
import { useStatisticsContext } from "../../../contexts/StatisticsProvider";

export const SidebarChance = ({ obj, view }: { obj: NewClient; view: string }) => {
  const {combinedTeamArrCurrentMonth} = useStatisticsContext()
  const teamMember = combinedTeamArrCurrentMonth.find(item => item.email === obj.agentEmail);
  if (!teamMember) {
    return null
  }
  const { fullName } = teamMember;
    return (
      <Flex justifyContent={'space-between'}>
        <Flex flexDirection={'column'}>
          <chakra.span fontSize={'13px'}>{`${obj.name} ${obj.surname}`}</chakra.span>
          <chakra.span color={'analyticsGreen'} fontSize={'13px'}>{`${obj.clientStatus}`}</chakra.span>
          {view === 'team'
? (
            <chakra.span color={'analyticsBlue'} fontSize={'10px'}>{`${fullName}`}</chakra.span>
          )
: (
            ''
          )}
        </Flex>
        <chakra.span fontSize={'13px'}>{obj.requestedAmount}</chakra.span>
      </Flex>
    );
  };