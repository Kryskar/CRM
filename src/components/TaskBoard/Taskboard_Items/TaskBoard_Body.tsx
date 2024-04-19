import { Event } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon } from '@chakra-ui/icons';
import { chakra, Flex } from '@chakra-ui/react';

import { DATE_FORMATS, formattedDate, INDEX_OF_FIRST_ITEM } from '../../../constants/constants';
import { SCROLLBAR } from '../../../constants/custom_styles';
import { ROUTES } from '../../../constants/routes';

import { splitString } from './taskBoardHelpers';

interface TaskBoard_Body_Props {
  data: {
    events: Event[];
  };
  endDate: string;
  startDate: string;
}

const TaskBoard_Body = ({ data, endDate, startDate }: TaskBoard_Body_Props) => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate(ROUTES.calendar);
  };
  const { events } = data;
  const isLastEvent = (index: number) => index === events.length - 1;

  return (
    <>
      <Flex
        fontSize={'10px'}
        justifyContent={'flex-end'}
        pr="5px"
      >{`${formattedDate(startDate, DATE_FORMATS.basic)} - ${formattedDate(endDate, DATE_FORMATS.basic)}`}</Flex>
      <Flex flexDirection={'column'} h='300px'>
        <Flex flexDirection={'column'} overflow='auto' sx={SCROLLBAR}>
          {events.map((event, index) => (
            <Flex
              key={event.id}
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
            >
              <Flex justifyContent={'space-between'}>
                <chakra.span>
                  <CalendarIcon cursor={'pointer'} onClick={handleIconClick} /> event{' '}
                </chakra.span>
                <chakra.span className='date' color='linkColor' fontSize={'9px'}>
                  {event.start
                    ? formattedDate(event.start.toISOString(), DATE_FORMATS.forTask)
                    : ''}
                </chakra.span>
              </Flex>
              <Flex flexDirection={'column'}>
                {event.title
? (
                  <>
                    <Flex fontWeight={'600'}>{splitString(event.title).title}</Flex>
                    <Flex>{splitString(event.title).rest}</Flex>
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
