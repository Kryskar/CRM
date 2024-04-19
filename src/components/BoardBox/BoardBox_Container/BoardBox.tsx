import React from 'react';
import { Box, Flex, FlexProps, Spinner, Text } from '@chakra-ui/react';

import { NewClient } from '../../../api/mutations/Clients/useAddClientToSupabase';
import { useGetEventsFromSupabase } from '../../../api/queries/useGetEventsFromSupabase';
import { UserMetadata } from '../../../api/types/googleDecodedDataTypes';
import { DATE_FORMATS, formattedDate } from '../../../constants/constants';
import { SCROLLBAR } from '../../../constants/custom_styles';
import { BOX_SHADOW } from '../../../constants/theme';
import { getBoardBoxTitle } from '../BoardBox_Items/BoardBox_helpers';
import { BoardBoxItem } from '../BoardBox_Items/BoardBox_Item';

export interface ParsedEvent {
  client: NewClient;
  eventName: string;
  eventTime: string;
  id: string;
  user: UserMetadata;
}

const BoardBox = ({ ...flexProps }: FlexProps) => {
  const { data, isLoading } = useGetEventsFromSupabase();
  if (isLoading) return <Spinner />;

  const parsedData = data.reduce(
    (acc, obj) => {
      const key = formattedDate(obj.dateTime, DATE_FORMATS.basic);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push({
        id: obj.id,
        user: JSON.parse(obj.user),
        client: JSON.parse(obj.client),
        eventName: obj.eventName,
        eventTime: obj.dateTime,
      });
      return acc;
    },
    {} as { [key: string]: ParsedEvent[] },
  );

  const displayedDates = new Set<string>();

  return (
    <Flex
      bgColor={'secondaryColor'}
      borderRadius='10px'
      boxShadow={BOX_SHADOW}
      flexDirection={'column'}
      h={'80vh'}
      {...flexProps}
    >
      <Text fontWeight={600} p='30px' paddingBottom={'5px'}>
        Changelog:
      </Text>
      <Flex
        flexDirection={'column'}
        gap={'15px'}
        overflowY={'scroll'}
        p={'30px'}
        sx={SCROLLBAR}
        w='100%'
      >
        {Object.entries(parsedData).map(([date, items]) => {
          if (!displayedDates.has(date)) {
            displayedDates.add(date);
            return (
              <React.Fragment key={date}>
                <Box fontSize={'11px'}>{getBoardBoxTitle(date)}</Box>
                {items.map((item) => (
                  <BoardBoxItem key={item.id} item={item} />
                ))}
              </React.Fragment>
            );
          } else {
            return items.map((item) => <BoardBoxItem key={item.id} item={item} />);
          }
        })}
      </Flex>
    </Flex>
  );
};

export default BoardBox;
