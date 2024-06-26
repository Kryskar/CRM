import { useQueryClient } from '@tanstack/react-query';
import { differenceInHours } from 'date-fns';

import { END_OF_TODAY, START_OF_TODAY, STATUSES } from '../../../constants/constants';
import { QUERY_KEYS } from '../../../constants/query_keys';
import { PostEvent } from '../Calendar/usePostEventToGoogleCalendar';
import { UserSupabase } from '../Users/useAddUserToSupabase';

import { NewClient } from './useAddClientToSupabase';

const getMessageForEventToCalendar = (client: NewClient) => {
  const { clientStatus, comment, name, phoneNumber, requestedAmount, surname } = client;
  const message = `${
    clientStatus
? clientStatus.toUpperCase()
: ''
  }:\n${name} ${surname}\n pn: ${phoneNumber}`;
  switch (clientStatus) {
    case STATUSES.callClient:
      return message + ' ' + `\nneed: ${requestedAmount}`;
    case STATUSES.loanFinalized:
      return message + ' ' + 'ask client if everything is fine';
    default:
      return message + ' ' + comment;
  }
};

export interface PresentationEvent {
  allDay?: boolean;
  end: string;
  id?: string;
  start: string;
  title: string;
}

export const createEventToCalendar = (
  client: NewClient,
  startTime = START_OF_TODAY,
  endTime = END_OF_TODAY,
) => {
  const { id } = client;
  const eventToCalendar: PostEvent = {
    start: { dateTime: startTime },
    end: { dateTime: endTime },
    summary: getMessageForEventToCalendar(client),
    clientId: id,
  };
  const eventPresentationMode: PresentationEvent = {
    id: id,
    start: startTime,
    end: endTime,
    title: getMessageForEventToCalendar(client),
    allDay: differenceInHours(endTime, startTime) >= 24 //eslint-disable-line
? true
: false,
  };
  return { eventToCalendar, eventPresentationMode };
};

export const createEventToSupabase = (
  client: NewClient,
  eventName: string,
  loggedInUserDbData: UserSupabase,
) => {
  const { id } = client;
  return {
    user: JSON.stringify(loggedInUserDbData),
    client: JSON.stringify(client),
    eventName: eventName,
    clientId: id,
  };
};

export const useInvalidateMultipleQueries = () => {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    const invalidationQueries: any = [ //eslint-disable-line
       

      { queryKey: [`${QUERY_KEYS.getClients}_${STATUSES.callClient}`] },
      { queryKey: [`${QUERY_KEYS.getClients}_${STATUSES.chance}`] },
      { queryKey: [`${QUERY_KEYS.getClients}_${STATUSES.notDoable}`] },
      { queryKey: [`${QUERY_KEYS.getClients}_all`] },
    ];
    queryClient.invalidateQueries(invalidationQueries);
  };

  return invalidateQueries;
};
