import { CiBadgeDollar, CiCalendarDate, CiCircleCheck, CiHome } from 'react-icons/ci';
import { PiChartLineUpThin, PiFolderSimpleUserThin } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { Flex, Icon } from '@chakra-ui/react';

import { ROUTES } from '../../../constants/routes';

export const NAV_LIST = [
  { name: 'home', icon: CiHome, path: '/' },
  { name: 'clients', icon: PiFolderSimpleUserThin, path: ROUTES.clients },
  { name: 'calendar', icon: CiCalendarDate, path: ROUTES.calendar },
  { name: 'chances', icon: CiCircleCheck, path: ROUTES.chances },
  { name: 'finalized', icon: CiBadgeDollar, path: ROUTES.finalized },
  { name: 'analitics', icon: PiChartLineUpThin, path: ROUTES.analitics },
];

const NavbarIconList = () => {
  const navigate = useNavigate();
  return (
    <Flex gap={'10px'}>
      {NAV_LIST.map((item) => (
        <Icon
          key={item.name}
          as={item.icon}
          border={'2px solid'}
          borderColor={'fontColor'}
          borderRadius={'50%'}
          boxSize={12}
          p={'10px'}
          _active={{
            bg: 'secondaryColor',
            color: 'fontColor',
          }}
          _hover={{
            color: 'secondaryColor',
            backgroundColor: 'fontColor',
            cursor: 'pointer',
          }}
          onClick={() => navigate(item.path)}
        />
      ))}
    </Flex>
  );
};

export default NavbarIconList;
