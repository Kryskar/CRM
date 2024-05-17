import { Button, ButtonProps, Flex, Image, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { CellContext } from '@tanstack/react-table';

import { NewClient } from '../../api/mutations/Clients/useAddClientToSupabase';
import { useGetUserFromSupabaseByEmail } from '../../api/queries/useGetUsersFromSupabase';
import { POLISH_BANKS_LOGOS_COLORS, STATUSES } from '../../constants/constants';
import ModifyClient from '../ModifyClient/ModifyClient';

export const ChangeStatusButton = ({ info, ...props }: { info: CellContext<NewClient, unknown> } & ButtonProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleButtonClick = () => onOpen();
  const { clientStatus } = info.row.original;
  return (
    <>
      {clientStatus !== STATUSES.reported
? (
        <Button {...props} onClick={handleButtonClick}>
          {clientStatus === STATUSES.loanFinalized
? 'report success'
: 'change status'}
        </Button>
      )
: (
        ''
      )}
      <ModifyClient data={info.row.original} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export const getColor = (value: string) => {
  switch (value) {
    case STATUSES.callClient:
      return 'analyticsBlue';
    case STATUSES.notDoable:
      return 'analyticsRed';
    default:
      return 'analyticsGreen';
  }
};

export const BankImage = ({ bankName }: { bankName: string }) => {
  const link: string = POLISH_BANKS_LOGOS_COLORS[bankName].logo;
  return <Image alt={bankName} borderRadius='full' boxSize='30px' src={link} />;
};

export const Agent = ({ email }: { email: string }) => {
  const { data, isLoading } = useGetUserFromSupabaseByEmail(email);
  if (isLoading) return <Spinner />;
  return (
    <Flex alignItems={'center'} gap={'10px'}>
      <Image alt={'agent picture'} borderRadius='full' boxSize='25px' src={data.picture} />
      <Text>{data.fullName}</Text>
    </Flex>
  );
};
