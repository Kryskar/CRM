import { useNavigate } from 'react-router-dom';
import { chakra, Flex } from '@chakra-ui/react';

import { NewClient } from '../../../api/mutations/Clients/useAddClientToSupabase';
import { firstWordCharToUppercase } from '../../../constants/constants';
import { useOpeationsContext } from '../../../contexts/OperationsProvider';
import { useStatisticsContext } from '../../../contexts/StatisticsProvider';

export const SidebarChance = ({ obj, view }: { obj: NewClient; view: string }) => {
  const { combinedTeamArrCurrentMonth } = useStatisticsContext();
  const navigate = useNavigate()
  const teamMember = combinedTeamArrCurrentMonth.find((item) => item.email === obj.agentEmail);
  const { setIsTaskboardClientClicked, setTaskboardClientPhoneNumber } = useOpeationsContext();
  const handleChanceClick = () => {
      setTaskboardClientPhoneNumber(obj.phoneNumber)
      setIsTaskboardClientClicked(true);
      navigate('/clients');
  };
  
  if (!teamMember) {
    return null;
  }
  const { fullName } = teamMember;
  return (
    <Flex cursor={"pointer"} justifyContent={'space-between'} onClick={handleChanceClick}>
      <Flex flexDirection={'column'} >
        <chakra.span fontSize={'13px'}>{`${obj.name} ${obj.surname}`}</chakra.span>
        <chakra.span
          color={'analyticsGreen'}
          fontSize={'13px'}
        >{`${firstWordCharToUppercase(obj.clientStatus ?? "")}`}</chakra.span>
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
