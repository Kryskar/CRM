import { Event } from 'react-big-calendar';
import moment from 'moment';

import { GoogleCalendarEventsList } from '../../../api/types/googleCalendarEventsTypes';

const dateFormat = (date: string | undefined) => {
  return moment(date).toDate();
};

export const formatEvents = (data: GoogleCalendarEventsList) => {
  const events: Event[] =
    data.items
      .filter((item) => item.start)
      .map((item) => ({
        id: item.id,
        start: item.start.dateTime
? dateFormat(item.start.dateTime)
: dateFormat(item.start.date),
        end: item.end.dateTime
? dateFormat(item.end.dateTime)
: dateFormat(item.end.date),
        title: item.summary,
        allDay: !!item.start.date,
      })) || [];
  return { events };
};
