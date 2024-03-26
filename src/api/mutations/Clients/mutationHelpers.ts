import { END_OF_TODAY, START_OF_TODAY } from '../../../constants/constants';
import { PostEvent } from '../Calendar/usePostEventToGoogleCalendar';

export const createEventToCalendar = (
  clientStatus: string,
  name: string,
  surname: string,
  phoneNumber: string,
  requestedAmount: string,
  id: string,
  eventTabId: string,
  startTime = START_OF_TODAY,
  endTime = END_OF_TODAY,
) => {
  const eventToCalendar: PostEvent = {
    start: { dateTime: startTime },
    end: { dateTime: endTime },
    summary: `${clientStatus.toUpperCase()}:\n${name} ${surname}\n pn: ${phoneNumber}\nneed: ${requestedAmount}`,
    eventTableId: eventTabId,
    clientId: id,
  };
  return eventToCalendar;
};
