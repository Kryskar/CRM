import { CiBadgeDollar, CiCalendarDate, CiHome } from 'react-icons/ci';
import { PiChartLineUpThin, PiFolderSimpleUserThin } from 'react-icons/pi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex, FlexProps, Icon } from '@chakra-ui/react';

import { ROUTES } from '../../../constants/routes';

export const NAV_LIST = [
  { name: 'home', icon: CiHome, path: '/' },
  { name: 'clients', icon: PiFolderSimpleUserThin, path: ROUTES.clients },
  { name: 'calendar', icon: CiCalendarDate, path: ROUTES.calendar },
  // { name: 'chances', icon: CiCircleCheck, path: ROUTES.chances },
  { name: 'finalized', icon: CiBadgeDollar, path: ROUTES.finalized },
  { name: 'analitics', icon: PiChartLineUpThin, path: ROUTES.analytics },
];

const NavbarIconList = ({ ...flexProps }: FlexProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Flex
      gap={'10px'}
      left={{ lg: '0', xl: '50%' }}
      position={{ lg: 'static', xl: 'absolute' }}
      transform={{ lg: '0', xl: 'translateX(-50%)' }}
      {...flexProps}
    >
      {NAV_LIST.map((item) => (
        <Icon
          key={item.name}
          as={item.icon}
          border={'2px solid'}
          borderColor={'fontColor'}
          borderRadius={'50%'}
          boxSize={{ base: 8, md: 10, lg: 12 }}
          p={{ base: '5px', md: '8px', lg: '10px' }}
          _hover={{
            color: 'secondaryColor',
            backgroundColor: 'fontColor',
            cursor: 'pointer',
          }}
          bgColor={item.path === pathname
? 'fontColor'
: ''}
          color={item.path === pathname
? 'secondaryColor'
: ''}
          onClick={() => navigate(item.path)}
        />
      ))}
    </Flex>
  );
};

export default NavbarIconList;
