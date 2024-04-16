import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

const defaultProps: FlexProps = {
    bgColor: 'secondaryColor',
    borderRadius: '10px',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
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
