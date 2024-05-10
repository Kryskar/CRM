import { Box, Flex, Image, Text } from '@chakra-ui/react';

type BankFinalizedPieChartLegendElementProps = {
  settings: {
    label: string;
    obj: { backgroundColor: string; borderColor: string; logo: string };
    value: number;
  };
};

export const BankFinalizedPieChartLegendElement = ({
  settings,
}: BankFinalizedPieChartLegendElementProps) => {
  const { label, obj, value } = settings;
  return (
    <Flex
      key={label}
      alignItems={'center'}
      fontSize={'10px'}
      gap='10px'
      justifyContent={'space-between'}
    >
      <Flex alignItems={'center'} gap='10px'>
        <Box
          bgColor={obj.backgroundColor}
          border={'1px solid' + ' ' + obj.borderColor}
          borderRadius={'full'}
          boxSize={'30px'}
        />
        <Image alt={label} borderRadius='full' boxSize='20px' src={obj.logo} />
        <Text>{label}:</Text>
      </Flex>
      <Text fontWeight={'700'}>{value}</Text>
    </Flex>
  );
};
