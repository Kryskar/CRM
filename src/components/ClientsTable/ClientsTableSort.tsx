import { useState } from 'react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { chakra, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { NewClient } from '../../pages/Add_Client/AddClient';

import { columns } from './columns';

interface ClientsTableSortProps {
  data: NewClient[];
}

export const ClientsTableSort = ({ data }: ClientsTableSortProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta: any = header.column.columnDef.meta; //eslint-disable-line
              return (
                <Th
                  key={header.id}
                  isNumeric={meta?.isNumeric}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}

                  <chakra.span pl='4'>
                    {header.column.getIsSorted()
? (
                      header.column.getIsSorted() === 'desc'
? (
                        <TriangleDownIcon aria-label='sorted descending' />
                      )
: (
                        <TriangleUpIcon aria-label='sorted ascending' />
                      )
                    )
: null}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row, index) => (
          <Tr
            key={row.id}
            color={'fontColor'}
            bgColor={
              index % 2 === 0 //eslint-disable-line
                ? 'secondaryColor'
                : 'tertiaryColor'
            }
          >
            {row.getVisibleCells().map((cell) => {
              const meta: any = cell.column.columnDef.meta; //eslint-disable-line
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
