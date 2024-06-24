import { useState } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

import { useGetGoogleCalendarEvents } from '../../../api/queries/useGetGoogleCalendarEvents';
import { END_OF_CURRENT_MONTH, START_OF_CURRENT_MONTH } from '../../../constants/constants';
import { QUERY_KEYS } from '../../../constants/query_keys';
import { BOX_SHADOW } from '../../../constants/theme';
import { useGetSession } from '../../../hooks/useGetSession';
import TaskBoard_Body from '../Taskboard_Items/TaskBoard_Body';
import TaskBoard_Header from '../Taskboard_Items/TaskBoard_Header';
import TaskBoard_Menu from '../Taskboard_Items/TaskBoard_Menu';

const TaskBoard = ({ ...flexProps }: FlexProps) => {
  const { session } = useGetSession();
  const [startDate, setStartDate] = useState(START_OF_CURRENT_MONTH);
  const [endDate, setEndDate] = useState(END_OF_CURRENT_MONTH);
  const [queryKey, setQueryKey] = useState(QUERY_KEYS.getEventsThisMonth);
  const { data, isLoading } = useGetGoogleCalendarEvents(session, queryKey, startDate, endDate);
  return (
    <Flex
      bgColor={'secondaryColor'}
      borderRadius={'5px'}
      boxShadow={BOX_SHADOW}
      color='fontColor'
      flexDirection={'column'}
      h='50%'
      {...flexProps}
    >
      <TaskBoard_Header data={data} endDate={endDate} isLoading={isLoading} startDate={startDate} />
      <TaskBoard_Menu
        endDate={endDate}
        setEndDate={setEndDate}
        setQueryKey={setQueryKey}
        setStartDate={setStartDate}
        startDate={startDate}
      />
      <TaskBoard_Body data={data} endDate={endDate} isLoading={isLoading} startDate={startDate} />
    </Flex>
  );
};

export default TaskBoard;
