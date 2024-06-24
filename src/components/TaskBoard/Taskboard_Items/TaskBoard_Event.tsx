import { useMemo } from 'react';
import { Event } from 'react-big-calendar';
import { BsBasket3Fill } from 'react-icons/bs';
import { MdInsertComment, MdPerson, MdPhoneIphone } from 'react-icons/md';
import { CalendarIcon } from '@chakra-ui/icons';
import { chakra,Flex } from '@chakra-ui/react';

import { extractPhoneNumber,INDEX_OF_FIRST_ITEM } from '../../../constants/constants';
import { useStatisticsContext } from '../../../contexts/StatisticsProvider';

import { getFormatDateTaskboard, splitString } from './taskBoardHelpers';

interface Taskboard_Event_Props{
  event: Event;
  handleEventClick: (event: Event) => void;
  index: number;
  isLastEvent:(index: number) => boolean;
}

const TaskBoard_Event = ({ event, handleEventClick, index, isLastEvent }: Taskboard_Event_Props) => {
  const phoneNumber = extractPhoneNumber(typeof event.title === 'string'
? event.title
: "");
  const { allClients } = useStatisticsContext();
  const eventClient =  useMemo(() => 
    allClients.find((client) => client.phoneNumber === phoneNumber), 
    [allClients, phoneNumber]
  );

  return (
    <Flex
      key={event.id}
      cursor={'pointer'}
      flexDirection={'column'}
      fontSize={'12px'}
      gap={'2px'}
      justifyContent={'space-between'}
      p='5px'
      _hover={{
        color: 'secondaryColor',
        backgroundColor: 'fontColor',
        '.date': {
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
        <Flex fontWeight={'700'} gap='5px'>
          <CalendarIcon mt="3px" />{' '}
          <chakra.span>
            {phoneNumber && typeof event.title === 'string'
              ? splitString(event.title).title
              : 'Event'}
          </chakra.span>
        </Flex>
        <chakra.span className='date' color='linkColor' fontSize={'9px'} textAlign={"right"} w="90px">
          {getFormatDateTaskboard(event)}
        </chakra.span>
      </Flex>
      {phoneNumber && eventClient && (
        <>
          <Flex alignItems={'center'} gap='5px'>
            <MdPerson />
            {` ${eventClient.name} ${eventClient.surname}`}
          </Flex>
          <Flex alignItems={'center'} gap='5px'>
            <MdPhoneIphone />
            {` ${eventClient.phoneNumber}`}
          </Flex>
          <Flex alignItems={'center'} gap='5px'>
            <BsBasket3Fill />
            {` ${eventClient.requestedAmount}`}
          </Flex>
          <Flex alignItems={'center'} gap='5px' display={eventClient.comment
? 'flex'
: 'none'}>
            <MdInsertComment size={"12px"} />
            {` ${eventClient.comment}`}
          </Flex>{' '}
        </>
      )}
      {!phoneNumber && (
        <Flex alignItems={'center'} gap='5px'>
          <MdInsertComment  />
          {` ${event.title}`}
        </Flex>
      )}
    </Flex>
  );
};

export default TaskBoard_Event;
