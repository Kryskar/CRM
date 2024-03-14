import { createColumnHelper } from '@tanstack/react-table';

import { DATE_FORMATS, formattedDate } from '../../constants/constants';
import { NewClient } from '../../pages/Add_Client/AddClient';

const columnHelper = createColumnHelper<NewClient>();


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
  columnHelper.accessor('addedTime', {
    cell: (info) => {
      const formattedInfo = formattedDate(info.getValue(), DATE_FORMATS.dateTime);
      return formattedInfo;
    },
    header: 'added time',
  }),
  columnHelper.accessor('clientStatus', {
    cell: (info) => info.getValue(),
    header: 'client status',
    sortingFn: 'text',
  }),
];
