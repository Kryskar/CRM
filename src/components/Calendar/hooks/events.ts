import { Event } from 'react-big-calendar';
import moment from 'moment';

import { GoogleCalendarEventsListItem } from '../../../api/types/googleCalendarEventsTypes';

const dateFormat = (date: string | undefined) => {
  return moment(date).toDate();
};

export const formatEvents = (data: GoogleCalendarEventsListItem[]) => {
  const events: Event[] =
    data
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
      }))
      .sort((a, b) => (a.start && b.start
? a.start.getTime() - b.start.getTime()
: 0)) || [];

  return { events };
};
