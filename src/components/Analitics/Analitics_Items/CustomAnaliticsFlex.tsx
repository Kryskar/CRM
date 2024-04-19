import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

import { BOX_SHADOW } from '../../../constants/theme';

const defaultProps: FlexProps = {
    bgColor: 'secondaryColor',
    borderRadius: '10px',
    boxShadow: BOX_SHADOW,
    flexDirection: 'column',
    fontSize: '14px',
    p: '15px',
  };

  
const CustomAnalyticsFlex = ({ children, ...rest }: { children: React.ReactNode } & FlexProps) => {
    const mergedProps: FlexProps = { ...defaultProps, ...rest };
  return (
    <Flex {...mergedProps}>
      {children}
    </Flex>
  );
}

export default CustomAnalyticsFlex;
