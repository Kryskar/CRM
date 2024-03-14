import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon } from '@chakra-ui/icons';
import { chakra, Flex, Link, Spinner } from '@chakra-ui/react';

import { useGetGoogleCalendarEvents } from '../../../api/queries/useGetGoogleCalendar';
import {
  DATE_FORMATS,
  daysDifference,
  END_OF_CURRENT_MONTH,
  END_OF_CURRENT_WEEK,
  END_OF_TODAY,
  formatEndNextPrevoiusMonth,
  formatStartNextPrevoiusMonth,
  formattedDate,
  INDEX_OF_FIRST_ITEM,
  MONTH_NAME,
  ONE_MONTH_DISTANCE,
  START_OF_CURRENT_MONTH,
  START_OF_CURRENT_WEEK,
  START_OF_TODAY,
  TODAY,
  TOMOROW,
  WEEK_LENGTH,
} from '../../../constants/constants';
import { SCROLLBAR } from '../../../constants/custom_styles';
import { QUERY_KEYS } from '../../../constants/query_keys';
import { ROUTES } from '../../../constants/routes';
import { useGetSession } from '../../../hooks/useGetSession';

const TaskBoard = ({ w }: { w: string }) => {
  const DEFAULT_NUM_OF_TASKS = 0;
  const EQUAL_FOR_SORT_FN = 0
  const SINGLE_TASK_NUM = 1;

  const { session } = useGetSession();
  const [startDate, setStartDate] = useState(START_OF_CURRENT_MONTH);
  const [endDate, setEndDate] = useState(END_OF_CURRENT_MONTH);
  const [numOfTasksForToday, setNumOfTasksForToday] = useState(DEFAULT_NUM_OF_TASKS);
  const [numOfTasksForTomorow, setNumOfTasksForTomorow] = useState(DEFAULT_NUM_OF_TASKS);
  const queryKeyEachMonth = `${QUERY_KEYS.getEvents}_${formattedDate(startDate, DATE_FORMATS.forQueryKeys)}`;
  const [queryKey, setQueryKey] = useState(QUERY_KEYS.getEventsThisMonth);
  const { data, isLoading } = useGetGoogleCalendarEvents(session, queryKey, startDate, endDate);
  const navigate = useNavigate();

  const filterNumOfTasksForTodayAndTomorow = () => {
    if (data && startDate === START_OF_CURRENT_MONTH && endDate === END_OF_CURRENT_MONTH) {
      const filteredTodayTasks = data.events.filter((event) => {
        if (event.start)
          return formattedDate(event.start.toISOString(), DATE_FORMATS.day) === TODAY.toString();
      });
      const filteredTomorowTasks = data.events.filter((event) => {
        if (event.start)
          return formattedDate(event.start.toISOString(), DATE_FORMATS.day) === TOMOROW.toString();
      });
      setNumOfTasksForToday(filteredTodayTasks.length);
      setNumOfTasksForTomorow(filteredTomorowTasks.length);
    }
  };

  useEffect(() => {
    filterNumOfTasksForTodayAndTomorow();
  }, [data]); // eslint-disable-line

  if (isLoading) return <Spinner />;

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

  const handleIconClick = () => {
    navigate(ROUTES.calendar);
  };

  const DAYS_DIFFERENCE = daysDifference(new Date(endDate), new Date(startDate));

  return (
    <Flex
      bgColor={'secondaryColor'}
      borderRadius={'5px'}
      color='fontColor'
      flexDirection={'column'}
      h='50%'
      w={w}
    >
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
      <Flex
        bgColor={'quaternaryColor'}
        color={'linkColor'}
        flexDirection={'column'}
        fontSize={'10px'}
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
      <Flex
        fontSize={'10px'}
        justifyContent={'flex-end'}
      >{`${formattedDate(startDate, DATE_FORMATS.basic)} - ${formattedDate(endDate, DATE_FORMATS.basic)}`}</Flex>
      <Flex flexDirection={'column'} overflow='auto' sx={SCROLLBAR}>
        {data?.events
          .sort((a, b) => (a.start && b.start
? a.start.getTime() - b.start.getTime()
: EQUAL_FOR_SORT_FN))
          .map((event, index) => (
            <Flex
              key={event.id}
              borderBottom={'1px black solid'}
              fontSize={'12px'}
              justifyContent={'space-between'}
              p='5px'
              _hover={{
                color: 'secondaryColor',
                backgroundColor: 'fontColor',
              }}
              borderTop={index === INDEX_OF_FIRST_ITEM
? '1px black solid'
: ''}
            >
              <Flex flexDirection={'column'}>
                <chakra.span>
                  <CalendarIcon cursor={'pointer'} onClick={handleIconClick} /> event{' '}
                </chakra.span>
                {event.title}
              </Flex>
              <chakra.span fontSize={'9px'}>
                {event.start
? formattedDate(event.start.toISOString(), DATE_FORMATS.forTask)
: ""}
              </chakra.span>
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
};

export default TaskBoard;
