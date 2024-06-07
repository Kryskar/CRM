import { Event } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon } from '@chakra-ui/icons';
import { chakra, Flex, Spinner } from '@chakra-ui/react';
import { differenceInHours } from 'date-fns';

import {
  DATE_FORMATS,
  extractPhoneNumber,
  formattedDate,
  INDEX_OF_FIRST_ITEM,
} from '../../../constants/constants';
import { SCROLLBAR } from '../../../constants/custom_styles';
import { useOpeationsContext } from '../../../contexts/OperationsProvider';

import { splitString } from './taskBoardHelpers';

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
  const handleEventClick = (event: any) => { //eslint-disable-line
    if (event && event.title) {
      const phoneNumber = extractPhoneNumber(event.title);
      setTaskboardClientPhoneNumber(phoneNumber
? phoneNumber
: '');
      setIsTaskboardClientClicked(true);
      navigate('/clients');
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

  const getFormat = (event: Event) => {
    if (event.start && event.end) {
      const hoursDifference = differenceInHours(event.end, event.start);
      const ALMOST_WHOLE_DAY = 23;
      if (hoursDifference >= ALMOST_WHOLE_DAY)
        return formattedDate(event.start.toISOString(), DATE_FORMATS.dayMonthShort);
      else if (hoursDifference < ALMOST_WHOLE_DAY)
        return formattedDate(event.start.toISOString(), DATE_FORMATS.forTask);
    }
    return '';
  };

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
            <Flex
               key={event.id}
              cursor={'pointer'}
              flexDirection={'column'}
              fontSize={'12px'}
              gap='10px'
              justifyContent={'space-between'}
              p='5px'
              _hover={{
                color: 'secondaryColor',
                backgroundColor: 'fontColor',
                '& > .date': {
                  color: 'secondaryColor',
                },
              }}
              borderBottom={isLastEvent(index)
? ''
: '1px solid'}
              borderBottomLeftRadius={isLastEvent(index)
? '5px'
: ''}
              borderTop={index === INDEX_OF_FIRST_ITEM
? '1px solid'
: ''}
              onClick={() => handleEventClick(event)}
            >
              <Flex justifyContent={'space-between'}>
                <chakra.span>
                  <CalendarIcon /> event{' '}
                </chakra.span>
                <chakra.span className='date' color='linkColor' fontSize={'9px'}>
                  {getFormat(event)}
                </chakra.span>
              </Flex>
              <Flex flexDirection={'column'}>
                {event.title
? (
                  <>
                    <Flex fontWeight={'600'}>
                      {typeof event.title === 'string'
? splitString(event.title).title
: ''}
                    </Flex>
                    <Flex>
                      {typeof event.title === 'string'
? splitString(event.title).rest
: ''}
                    </Flex>
                  </>
                )
: (
                  ''
                )}
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default TaskBoard_Body;
