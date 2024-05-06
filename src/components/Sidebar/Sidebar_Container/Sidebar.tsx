import { useState } from 'react';
import { Flex, FlexProps, Text } from '@chakra-ui/react';

import {
  firstWordCharToUppercase,
} from '../../../constants/constants';
import { SCROLLBAR } from '../../../constants/custom_styles';
import { BOX_SHADOW } from '../../../constants/theme';
import { useStatisticsContext } from '../../../contexts/StatisticsProvider';
import { AnaliticsSidebarComponent } from '../Sidebar_Items/AnaliticsSidebarComponent';
import { SidebarChance } from '../Sidebar_Items/SidebarChance';

const Sidebar = ({...flexProps }: FlexProps) => {
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
      borderRadius={"5px"}
      boxShadow={BOX_SHADOW}
      color='fontColor'
      flexDirection='column'
      h='100%'
      overflow='auto'
      pb={"10px"}
      pos='sticky'
      sx={SCROLLBAR}
      {...flexProps}
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
