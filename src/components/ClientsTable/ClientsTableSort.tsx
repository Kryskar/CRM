import { useState } from 'react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, chakra, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { BOX_SHADOW } from '../../constants/theme';

interface ClientsTableSortProps {
  columns: any; //eslint-disable-line
  data: any; //eslint-disable-line
}

export const ClientsTableSort = ({ columns, data }: ClientsTableSortProps) => {
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
    <Box
      boxShadow={BOX_SHADOW}
      w='100%'
      overflowX={{
        base: 'auto',
        md: 'hidden',
      }}
    >
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta: any = header.column.columnDef.meta; //eslint-disable-line
                return (
                  <Th
                    key={header.id}
                    bgColor={'tertiaryColor'}
                    border={'1px solid'}
                    color='linkColor'
                    isNumeric={meta?.isNumeric}
                    textAlign='center'
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
              bgColor={index % 2 === 0
? 'secondaryColor'
: 'tertiaryColor'}
            >
              {row.getVisibleCells().map((cell) => {
                const meta: any = cell.column.columnDef.meta; //eslint-disable-line
                return (
                  <Td
                    key={cell.id}
                    border={'1px solid'}
                    isNumeric={meta?.isNumeric}
                    textAlign={'center'}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
