import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Avatar, Box, chakra, Flex, Link } from '@chakra-ui/react';

import { NewClient } from '../../../api/mutations/Clients/useAddClientToSupabase';
import { DATE_FORMATS, formattedDate, TODAY_BASIC_FORMAT } from '../../../constants/constants';

import { ParsedEvent } from './BoardBox_Events';

export interface User {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  picture: string;
  provider_id: string;
  sub: string;
}

export interface EventObj {
  client: NewClient;
  eventName: string;
  eventTime: string;
  id: string;
  user: User;
}

const EventBox = ({ data }: { data: ParsedEvent }) => {
  const [isEventHidden, setIsEventHidden] = useState(true);
  const handleHideShowClick = () => setIsEventHidden(!isEventHidden);
  const { client, eventName, eventTime, user } = data;

  return (
    <Flex
      bgColor={'tertiaryColor'}
      borderRadius={'5px'}
      boxShadow={'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;'}
      flexDirection={'column'}
      overflow={'hidden'}
      p='0 10px 0 10px'
      transition={'height 0.5s ease'}
      w={'100%'}
      h={!isEventHidden
? '160px'
: '20px'}
    >
      <Flex flexDirection={'column'} gap={'20px'} justifyContent={'space-between'} ml={'5px'}>
        <Flex gap='20px' justifyContent={'space-between'}>
          <Flex gap='15px'>
            {!isEventHidden && <Avatar mt={'5px'} size={'sm'} src={user.avatar_url} />}
            <Flex color={'linkColor'} flexDirection={'column'} fontSize={'12px'}>
              <Flex gap='3px'>
                <chakra.span>{`${user.full_name} ${eventName}`}</chakra.span>
                <chakra.span textDecoration={'underline'}>
                  {client.name + ' ' + client.surname}
                </chakra.span>
              </Flex>
              <Box color='fontColor' fontSize={'9px'}>
                {formattedDate(eventTime, DATE_FORMATS.basic) === TODAY_BASIC_FORMAT
                  ? formattedDate(eventTime, DATE_FORMATS.timeForEvent)
                  : formattedDate(eventTime, DATE_FORMATS.dateTime)}
              </Box>
              <chakra.span fontWeight={'600'}>{client.clientStatus}</chakra.span>
            </Flex>
          </Flex>
          <Link color={'fontColor'} onClick={handleHideShowClick}>
            {!isEventHidden
? <ChevronUpIcon />
: <ChevronDownIcon />}
          </Link>
        </Flex>
        <Flex alignItems={'center'} flexDirection={'column'} fontSize={'14px'} ml={'10px'}>
          <chakra.span color={'fontColor'}>{`${client.name} ${client.surname}`}</chakra.span>
          <chakra.span
            color={'fontColor'}
          >{`Requested amount: ${client.requestedAmount}`}</chakra.span>
          <chakra.span
            color={'fontColor'}
            fontWeight={'600'}
          >{`Phone number: ${client.phoneNumber}`}</chakra.span>
        </Flex>
        <Box textAlign={'center'} />
      </Flex>
    </Flex>
  );
};

export default EventBox;
