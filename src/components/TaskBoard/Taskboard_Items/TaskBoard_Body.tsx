import { Event } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon } from '@chakra-ui/icons';
import { chakra, Flex } from '@chakra-ui/react';

import { DATE_FORMATS, formattedDate, INDEX_OF_FIRST_ITEM } from '../../../constants/constants';
import { SCROLLBAR } from '../../../constants/custom_styles';
import { ROUTES } from '../../../constants/routes';

interface TaskBoard_Body_Props {
  data: {
    events: Event[];
  } | null;
  endDate: string;
  startDate: string;
}

const TaskBoard_Body = ({ data, endDate, startDate }: TaskBoard_Body_Props) => {
  const EQUAL_FOR_SORT_FN = 0;
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate(ROUTES.calendar);
  };

  return (
    <>
      <Flex
        fontSize={'10px'}
        justifyContent={'flex-end'}
      >{`${formattedDate(startDate, DATE_FORMATS.basic)} - ${formattedDate(endDate, DATE_FORMATS.basic)}`}</Flex>
      <Flex flexDirection={'column'} overflow='auto' sx={SCROLLBAR}>
        <Flex flexDirection={'column'}>
          {data?.events
            .sort((a, b) =>
              a.start && b.start
? a.start.getTime() - b.start.getTime()
: EQUAL_FOR_SORT_FN,
            )
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
                    : ''}
                </chakra.span>
              </Flex>
            ))}
        </Flex>
      </Flex>
    </>
  );
};

export default TaskBoard_Body;
