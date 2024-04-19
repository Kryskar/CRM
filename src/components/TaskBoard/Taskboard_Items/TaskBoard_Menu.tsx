import React, { useMemo } from 'react';
import { Flex, Link } from '@chakra-ui/react';

import {
  DATE_FORMATS,
  END_OF_CURRENT_MONTH,
  END_OF_CURRENT_WEEK,
  END_OF_TODAY,
  formatEndNextPrevoiusMonth,
  formatStartNextPrevoiusMonth,
  formattedDate,
  ONE_MONTH_DISTANCE,
  START_OF_CURRENT_MONTH,
  START_OF_CURRENT_WEEK,
  START_OF_TODAY,
} from '../../../constants/constants';
import { QUERY_KEYS } from '../../../constants/query_keys';

interface TaskBoard_Menu_Props {
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setQueryKey: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
}

const TaskBoard_Menu = ({
  endDate,
  setEndDate,
  setQueryKey,
  setStartDate,
  startDate,
}: TaskBoard_Menu_Props) => {
  const queryKeyEachMonth = useMemo(
    () => `${QUERY_KEYS.getEvents}_${formattedDate(startDate, DATE_FORMATS.forQueryKeys)}`,
    [startDate],
  );

  const handleClickMenu = (startDate: string, endDate: string, queryKeyParam: string) => {
    setQueryKey(queryKeyParam);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleClickNextPreviousMonth = (distance: number) => {
    setQueryKey(queryKeyEachMonth);
    setStartDate(formatStartNextPrevoiusMonth(startDate, distance));
    setEndDate(formatEndNextPrevoiusMonth(endDate, distance));
  };
  return (
    <Flex
    bgColor={'quaternaryColor'}
      color={'linkColor'}
      flexDirection={'column'}
      fontSize={'10px'}
      p="0 5px 0 5px"
    >
      <Flex gap='5px'>
        <Link
          onClick={() => handleClickMenu(START_OF_TODAY, END_OF_TODAY, QUERY_KEYS.getEventsToday)}
        >
          today
        </Link>
        <Link
          onClick={() =>
            handleClickMenu(
              START_OF_CURRENT_WEEK,
              END_OF_CURRENT_WEEK,
              QUERY_KEYS.getEventsThisWeek,
            )
          }
        >
          this week
        </Link>
        <Link
          onClick={() =>
            handleClickMenu(
              START_OF_CURRENT_MONTH,
              END_OF_CURRENT_MONTH,
              QUERY_KEYS.getEventsThisMonth,
            )
          }
        >
          this month
        </Link>
      </Flex>
      <Flex gap='5px' justifyContent={'flex-end'}>
        <Link onClick={() => handleClickNextPreviousMonth(-ONE_MONTH_DISTANCE)}>
          previous month
        </Link>
        <Link onClick={() => handleClickNextPreviousMonth(ONE_MONTH_DISTANCE)}>next month</Link>
      </Flex>
    </Flex>
  );
};

export default TaskBoard_Menu;
