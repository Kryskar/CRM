import { Button, Text,useDisclosure } from '@chakra-ui/react';
import { CellContext, createColumnHelper } from '@tanstack/react-table';

import { DATE_FORMATS, formattedDate,STATUSES } from '../../constants/constants';
import { NewClient } from '../AddClient/AddClient_Container/AddClient_Contaier';
import ModifyClient from '../ModifyClient/ModifyClient';

const columnHelper = createColumnHelper<NewClient>();

export interface ModifyClientProps {
  data: NewClient;
  isOpen: boolean;
  onClose: () => void;
}

const ChangeStatusButton = ({ info }: { info: CellContext<NewClient, string> }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleButtonClick = () => onOpen();
  return (
    <>
      <Button onClick={handleButtonClick}>change status</Button>
      <ModifyClient data={info.row.original} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const getColor = (value: string) => {
  switch (value) {
    case STATUSES.callClient:
      return 'blue';
    case STATUSES.notDoable:
      return 'red';
    default:
      return '#4cca36';
  }
};

export const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: 'name',
    sortingFn: 'text',
  }),
  columnHelper.accessor('surname', {
    cell: (info) => info.getValue(),
    header: 'surname',
    sortingFn: 'text',
  }),
  columnHelper.accessor('phoneNumber', {
    cell: (info) => info.getValue(),
    header: 'phone number',
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('requestedAmount', {
    cell: (info) => info.getValue(),
    header: 'requested amount',
    meta: {
      isNumeric: true,
    },
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('updated_at', {
    cell: (info) => {
      const value = info.getValue();
      const formattedInfo = value
? formattedDate(value, DATE_FORMATS.dateTime)
: '';
      return formattedInfo;
    },
    header: 'latest status change',
  }),
  columnHelper.accessor('clientStatus', {
    cell: (info) => {
      const value = info.getValue();
      const color = value
? getColor(value)
: '';
      return (
        <Text color={color} fontWeight={600}>
          {info.getValue()}
        </Text>
      );
    },
    header: 'client status',
    sortingFn: 'text',
  }),
  {
    id: 'actions',
    cell: (info: any) => <ChangeStatusButton info={info} />, //eslint-disable-line
    header: 'change status',
  },
];
