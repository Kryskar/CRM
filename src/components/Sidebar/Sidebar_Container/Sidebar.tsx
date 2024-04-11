import { useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';

import {
  firstWordCharToUppercase,
} from '../../../constants/constants';
import { SCROLLBAR } from '../../../constants/custom_styles';
import { useStatisticsContext } from '../../../contexts/StatisticsProvider';
import { AnaliticsSidebarComponent } from '../Sidebar_Items/AnaliticsSidebarComponent';
import { SidebarChance } from '../Sidebar_Items/SidebarChance';

const Sidebar = ({ w }: { w: string }) => {
  const {
    allChanceClients,
    loggedInAgentChanceClients,
  } = useStatisticsContext();
  const [view, setView] = useState('agent');
  const clients = view === 'agent'
? loggedInAgentChanceClients
: allChanceClients;
  const conditionalString = view === 'agent'
? 'your'
: 'team';
 

  return (
    <Flex
      bgColor='secondaryColor'
      color='fontColor'
      flexDirection='column'
      h='100%'
      overflow='auto'
      pos='sticky'
      sx={SCROLLBAR}
      w={w}
    >
      <AnaliticsSidebarComponent state={{view,setView}}/>
      <Flex flexDirection={'column'} p='10px 15px 0 15px'>
        <Text>{firstWordCharToUppercase(conditionalString)} newest sales chances:</Text>
        <Flex flexDirection={'column'} gap='20px' pt='10px'>
          {clients.map((obj) => (
            <SidebarChance key={obj.id} obj={obj} view={view} />
          ))}
        </Flex>
        </Flex>
      </Flex>
  );
};

export default Sidebar;
