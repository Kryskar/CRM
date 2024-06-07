import React from 'react';
import { CiBadgeDollar, CiCalendarDate, CiHome } from 'react-icons/ci';
import { PiChartLineUpThin, PiFolderSimpleUserThin } from 'react-icons/pi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Flex, FlexProps, Icon, Tag } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react';

import { firstWordCharToUppercase } from '../../../constants/constants';
import { ROUTES } from '../../../constants/routes';

export const NAV_LIST = [
  { name: 'home', icon: CiHome, path: '/',cn:"" },
  { name: 'clients', icon: PiFolderSimpleUserThin, path: ROUTES.clients,cn:"step6" },
  { name: 'calendar', icon: CiCalendarDate, path: ROUTES.calendar,cn:"step17" },
  // { name: 'chances', icon: CiCircleCheck, path: ROUTES.chances },
  { name: 'finalized', icon: CiBadgeDollar, path: ROUTES.finalized,cn:"" },
  { name: 'analytics', icon: PiChartLineUpThin, path: ROUTES.analytics,cn:"step34" },
];

export const CustomIcon = React.forwardRef<HTMLSpanElement, { children: React.ReactNode }>( //eslint-disable-line
  ({ children, ...rest }, ref) => (
    <Box>
      <Tag backgroundColor={'secondaryColor'} color='fontColor' ref={ref as React.Ref<HTMLSpanElement>} {...rest}>
        {children}
      </Tag>
    </Box>
  )
);

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
        <Tooltip
          key={item.name}
          hasArrow
          borderRadius={'md'}
          fontSize={'sm'}
          label={firstWordCharToUppercase(item.name)}
          placeContent={'bottom'}
        >
          <CustomIcon>
            <Icon
              as={item.icon}
              border={'2px solid'}
              borderColor={'fontColor'}
              borderRadius={'50%'}
              boxSize={{ base: 8, md: 10, lg: 12 }}
              className={item.cn}
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
          </CustomIcon>
        </Tooltip>
      ))}
    </Flex>
  );
};

export default NavbarIconList;
