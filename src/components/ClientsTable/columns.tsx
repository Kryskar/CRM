import { Flex, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';

import { NewClient } from '../../api/mutations/Clients/useAddClientToSupabase';
import { FinalizedRecord } from '../../api/queries/useGetFinalizedfromSupabase';
import { DATE_FORMATS, firstWordCharToUppercase, formattedDate } from '../../constants/constants';

import { Agent, BankImage, ChangeStatusButton, getColor } from './columnsHelpers';

const columnHelper = createColumnHelper<NewClient>();
const columnHelperFinalized = createColumnHelper<FinalizedRecord>();

export interface ModifyClientProps {
  data: NewClient;
  isOpen: boolean;
  onClose: () => void;
}

export const columnsClientsHeaders = ['Name', 'Surname', 'Phone number', 'Requested amount', 'Latest status change', 'Client status', 'Change status']
export const columnsClients = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: columnsClientsHeaders[0],
    sortingFn: 'text',
  }),
  columnHelper.accessor('surname', {
    cell: (info) => info.getValue(),
    header: columnsClientsHeaders[1],
    sortingFn: 'text',
  }),
  columnHelper.accessor('phoneNumber', {
    cell: (info) => info.getValue(),
    header: columnsClientsHeaders[2],
    sortingFn: 'alphanumeric',
  }),
  columnHelper.accessor('requestedAmount', {
    cell: (info) => info.getValue(),
    header: columnsClientsHeaders[3], //eslint-disable-line
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
    header: columnsClientsHeaders[4], //eslint-disable-line
  }),
  columnHelper.accessor('clientStatus', {
    cell: (info) => {
      const value = info.getValue();
      const color = value
? getColor(value)
: '';
      return (
        <Text color={color} fontWeight={600}>
          {firstWordCharToUppercase(info.getValue() ?? "")}
        </Text>
      );
    },
    header: columnsClientsHeaders[5], //eslint-disable-line
    sortingFn: 'text',
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => (
      <Flex justifyContent={'center'}>
        <ChangeStatusButton className='step9 step28' info={info} size={{base:'sm', lg:'md'}} variant={"defined"} />
      </Flex>
    ),
    header: columnsClientsHeaders[6], //eslint-disable-line
  }),
];

export const columnsClientsWithAgentHeaders = [...columnsClientsHeaders, "Agent"]
export const columnsClientsWithAgent = [
  ...columnsClients,
  columnHelper.accessor('agentEmail', {
    cell: (info) => {
      const email = info.getValue();
      return email
? <Agent email={email} />
: '';
    },
    header: columnsClientsWithAgentHeaders[7], //eslint-disable-line
    sortingFn: 'text',
  }),
];

export const columnsFinalizedHeaders = ["Name", "Surname", "Phone number", "Bank", "Loan amount", "Intrest", "Commission", "Period", "Report date/time", "Agent" ]
export const columnsFinalized = [
  columnHelperFinalized.accessor('clientName', {
    cell: (info) => info.getValue(),
    header: 'name',
    sortingFn: 'text',
  }),
  columnHelperFinalized.accessor('clientSurname', {
    cell: (info) => info.getValue(),
    header: 'surname',
    sortingFn: 'text',
  }),
  columnHelperFinalized.accessor('clientPhoneNumber', {
    cell: (info) => info.getValue(),
    header: 'phone number',
    sortingFn: 'alphanumeric',
  }),
  columnHelperFinalized.accessor('bank', {
    cell: (info) => {
      const bankName = info.getValue();
      return (
        <Flex alignItems={'center'} gap={'15px'} justifyContent={'center'}>
          <Text>{bankName}</Text>
          <BankImage bankName={bankName} />
        </Flex>
      );
    },
    header: 'bank',
    sortingFn: 'text',
  }),
  columnHelperFinalized.accessor('loanAmount', {
    cell: (info) => info.getValue(),
    header: 'loan amount',
    sortingFn: 'alphanumeric',
  }),
  columnHelperFinalized.accessor('intrest', {
    cell: (info) => info.getValue(),
    header: 'intrest',
    sortingFn: 'alphanumeric',
  }),
  columnHelperFinalized.accessor('commission', {
    cell: (info) => info.getValue(),
    header: 'commission',
    sortingFn: 'alphanumeric',
  }),
  columnHelperFinalized.accessor('loanPeriod', {
    cell: (info) => info.getValue(),
    header: 'period',
    sortingFn: 'alphanumeric',
  }),
  columnHelperFinalized.accessor('created_at', {
    cell: (info) => {
      const value = info.getValue();
      const formattedInfo = value
? formattedDate(value, DATE_FORMATS.dateTime)
: '';
      return formattedInfo;
    },
    header: 'report date/time',
  }),
  columnHelperFinalized.accessor('agentEmail', {
    cell: (info) => {
      const email = info.getValue();
      return <Agent email={email} />;
    },
    header: 'agent',
    sortingFn: 'text',
  }),
];
