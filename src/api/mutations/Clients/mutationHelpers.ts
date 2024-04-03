import { END_OF_TODAY, START_OF_TODAY } from '../../../constants/constants';
import { GoogleDecodedData } from '../../types/googleDecodedDataTypes';
import { PostEvent } from '../Calendar/usePostEventToGoogleCalendar';

import { NewClient } from './useAddClientToSupabase';

export const createEventToCalendar = (
  client: NewClient,
  startTime = START_OF_TODAY,
  endTime = END_OF_TODAY,
) => {
  const { clientStatus, id, name, phoneNumber, requestedAmount, surname } = client;
  const eventToCalendar: PostEvent = {
    start: { dateTime: startTime },
    end: { dateTime: endTime },
    summary: `${clientStatus
? clientStatus.toUpperCase()
: ''}:\n${name} ${surname}\n pn: ${phoneNumber}\nneed: ${requestedAmount}`,
    // eventTableId: eventTabId,
    clientId: id,
  };
  return eventToCalendar;
};

export const createEventToSupabase = (
  client: NewClient,
  eventName: string,
  decodedData: GoogleDecodedData,
) => {
  const { id } = client;

  const eventObj = {
    user: JSON.stringify(decodedData.user_metadata),
    client: JSON.stringify(client),
    eventName: eventName,
    clientId: id,
  };
  return eventObj;
};
