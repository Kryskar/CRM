import { useEffect, useState } from 'react';
import { Event } from 'react-big-calendar';
import { chakra,Flex } from '@chakra-ui/react'

import { DATE_FORMATS, daysDifference, END_OF_CURRENT_MONTH, formattedDate,MONTH_NAME, START_OF_CURRENT_MONTH, TODAY, TOMOROW, WEEK_LENGTH } from '../../../constants/constants'

interface TaskBoard_Header_Props {
    data: {
        events: Event[];
    } | null,
    endDate: string,
    startDate: string
}

const TaskBoard_Header = ({data, endDate, startDate}:TaskBoard_Header_Props) => {
    const SINGLE_TASK_NUM = 1;
    const DAYS_DIFFERENCE = daysDifference(new Date(endDate), new Date(startDate));
    const DEFAULT_NUM_OF_TASKS = 0;

    const [numOfTasksForToday, setNumOfTasksForToday] = useState(DEFAULT_NUM_OF_TASKS);
    const [numOfTasksForTomorow, setNumOfTasksForTomorow] = useState(DEFAULT_NUM_OF_TASKS);

    const getNumOfTasksForDate = (events: Event[], date: number) => {
        if (startDate === START_OF_CURRENT_MONTH && endDate === END_OF_CURRENT_MONTH) {
          return events.filter((event) => {
            if (event.start)
              return formattedDate(event.start.toISOString(), DATE_FORMATS.day) === date.toString();
          });
        }
        return [];
      };

    useEffect(() => {
        if (data?.events) {
          const filteredTodayTasks = getNumOfTasksForDate(data?.events, TODAY);
          const filteredTommorowTasks = getNumOfTasksForDate(data?.events, TOMOROW);
          setNumOfTasksForToday(filteredTodayTasks.length);
          setNumOfTasksForTomorow(filteredTommorowTasks.length);
        }
      }, [data]); // eslint-disable-line
    
  return (
    <Flex
        bgImage={'linear-gradient(to right, tertiaryColor, secondaryColor)'}
        borderBottomLeftRadius='none'
        borderRadius={'5px'}
        h='20%'
        justifyContent={'space-between'}
        pl='15px'
        pr='15px'
        pt='5px'
      >
        <Flex flexDirection={'column'}>
          <chakra.span fontSize={'30px'}>{TODAY}</chakra.span>
          {MONTH_NAME}
        </Flex>
        <Flex flexDirection={'column'} gap='10px'>
          <chakra.span>{`${numOfTasksForToday} ${
            numOfTasksForToday === SINGLE_TASK_NUM
? 'task'
: 'tasks'
          } for today`}</chakra.span>
          <Flex alignItems={'flex-end'} flexDirection={'column'}>
            <chakra.span fontSize={'10px'}>tomorow: {numOfTasksForTomorow}</chakra.span>
            <chakra.span fontSize={'10px'}>
              {DAYS_DIFFERENCE > WEEK_LENGTH
                ? `${formattedDate(startDate, DATE_FORMATS.monthName)}: ${data?.events.length}`
                : ''}
            </chakra.span>
          </Flex>
        </Flex>
      </Flex>
  )
}

export default TaskBoard_Header