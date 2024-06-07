import { useEffect } from 'react';
import { Button, ButtonProps, Flex, Image, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { CellContext } from '@tanstack/react-table';

import { NewClient } from '../../api/mutations/Clients/useAddClientToSupabase';
import { useGetUserFromSupabaseByEmail } from '../../api/queries/useGetUsersFromSupabase';
import { POLISH_BANKS_LOGOS_COLORS, STATUSES } from '../../constants/constants';
import { useTourContext } from '../../contexts/TourProvider';
import ModifyClient from '../ModifyClient/ModifyClient';

export const ChangeStatusButton = ({ info, ...props }: { info: CellContext<NewClient, unknown> } & ButtonProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleButtonClick = () => onOpen();
  const { clientStatus } = info.row.original;
  const {modalOpen, setModalOpen, setRun, setStepIndex, stepIndex} = useTourContext()
    /* eslint-disable*/
  useEffect(() => {
    if (stepIndex === 9 && info.row.index===0 || stepIndex === 24 && info.row.index===0 || stepIndex === 28 && info.row.index===0) {
      setRun(false)
      onOpen()
      setModalOpen(true)
  }
if(isOpen && modalOpen){
  setRun(true)
  setStepIndex(stepIndex===9
? 10
: stepIndex===24
? 25
: 29)
  setModalOpen(false)
}}, [stepIndex, isOpen]);
/* eslint-enable*/
  return (
    <>
      {clientStatus !== STATUSES.reported
? (
        <Button {...props} onClick={handleButtonClick}>
          {clientStatus === STATUSES.loanFinalized
? 'Report success'
: 'Change status'}
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
