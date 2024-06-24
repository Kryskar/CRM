import { Event } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';

import { DATE_FORMATS, extractPhoneNumber, formattedDate } from '../../../constants/constants';
import { SCROLLBAR } from '../../../constants/custom_styles';
import { useOpeationsContext } from '../../../contexts/OperationsProvider';

import TaskBoard_Event from './TaskBoard_Event';

interface TaskBoard_Body_Props {
  data: {
    events: Event[];
  } | null;
  endDate: string;
  isLoading: boolean;
  startDate: string;
}

const TaskBoard_Body = ({ data, endDate, isLoading, startDate }: TaskBoard_Body_Props) => {
  const navigate = useNavigate();
  const { setIsTaskboardClientClicked, setTaskboardClientPhoneNumber } = useOpeationsContext();
  const handleEventClick = (event: Event) => {
    if (event && event.title) {
      const phoneNumber = extractPhoneNumber(typeof event.title === 'string'
? event.title
: '');
      if (phoneNumber) {
        setTaskboardClientPhoneNumber(phoneNumber
? phoneNumber
: '');
        setIsTaskboardClientClicked(true);
        navigate('/clients');
      } else {
        navigate('/calendar');
      }
    }
  };
  if (!data || isLoading)
    return (
      <Flex alignItems={'center'} h='315px' justifyContent={'center'}>
        <Spinner />
      </Flex>
    );
  const { events } = data;
  const isLastEvent = (index: number) => index === events.length - 1;

  return (
    <>
      <Flex
        fontSize={'10px'}
        justifyContent={'flex-end'}
        pr='5px'
      >{`${formattedDate(startDate, DATE_FORMATS.basic)} - ${formattedDate(endDate, DATE_FORMATS.basic)}`}</Flex>
      <Flex flexDirection={'column'} h='300px'>
        <Flex flexDirection={'column'} overflow='auto' sx={SCROLLBAR}>
          {events.map((event, index) => (
            <TaskBoard_Event
              key={event.id}
              event={event}
              handleEventClick={handleEventClick}
              index={index}
              isLastEvent={isLastEvent}
            />
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default TaskBoard_Body;
