import { useState } from 'react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, chakra, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

interface ClientsTableSortProps {
  columnProps: any; //eslint-disable-line
  data: any; //eslint-disable-line
}

export const ClientsTableSort = ({ columnProps, data }: ClientsTableSortProps) => {
  const columns = columnProps[0];
  const columnHeaders = columnProps[1];
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
  const [isLargerThan950] = useMediaQuery('(min-width: 950px)');
  const [isLargerThan1300] = useMediaQuery('(min-width: 1300px)');

  const getMediaQuery = () => {
    switch (true) {
      case columnHeaders.length > 7: //eslint-disable-line
        return isLargerThan1300;
      default:
        return isLargerThan950;
    }
  };
  return (
    <Box
      w='100%'
      overflowX={{
        base: 'auto',
        md: 'hidden',
      }}
    >
      {getMediaQuery() 
      ? 
      ( //eslint-disable-line
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
      ) : (
        <Flex
          flexDirection={'column'}
          fontSize={{ base: '13px', md: '15px' }}
          gap='20px'
          p={{ base: '20px' }}
          w={{ base: '350px', md: '500px' }}
        >
          {table.getRowModel().rows.map((row) => (
            <Flex
              key={row.id}
              border='1px solid'
              borderColor={'mobileTableBorderColor'}
              borderRadius={'15px'}
              flexDirection={'column'}
              p='10px'
            >
              {row.getVisibleCells().map((cell, index, array) => (
                <Flex
                  key={cell.id}
                  borderColor='mobileTableBorderColor'
                  justifyContent={'space-between'}
                  pb='3px'
                  borderBottom={index === array.length - 1
? ''
: '1px'}
                  mt={index === array.length - 1
? '10px'
: ''}
                  pt={columnHeaders[index] === 'Bank'
? '5px'
: ''}
                >
                  <Text fontWeight={600}>{columnHeaders[index]}</Text>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Flex>
              ))}
            </Flex>
          ))}
        </Flex>
      )}
    </Box>
  );
};
