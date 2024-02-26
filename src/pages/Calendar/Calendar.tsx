import { useState } from 'react';
import { Calendar as BigCalendar, CalendarProps, Event, momentLocalizer } from 'react-big-calendar';
import { Box } from '@chakra-ui/react';
import moment from 'moment';

import { useGetGoogleCalendarEvents } from '../../api/queries/useGetGoogleCalendar';
import { useGetSession } from '../../hooks/useGetSession';

const Calendar = (props: Omit<CalendarProps, 'localizer' | 'events'>) => {
  const [selected, setSelected] = useState<Event>({});
  const { session } = useGetSession();
  const { data, error, isLoading } = useGetGoogleCalendarEvents(session);

  if (isLoading) return <p>loading...</p>;
  if (error) throw new Error('error gettiting events');
  // if (data) {
  console.log(data); //eslint-disable-line

  const dateFormat = (date: string | undefined) => {
    return moment(date).toDate();
  };
  const events: Event[] =
    data?.items
      .filter((item) => item.start)
      .map((item) => ({
        start: item.start.dateTime
? dateFormat(item.start.dateTime)
: dateFormat(item.start.date),
        end: item.end.dateTime
? dateFormat(item.end.dateTime)
: dateFormat(item.end.date),
        title: item.summary,
        allDay: !!item.start.date,
      })) || [];

  const localizer = momentLocalizer(moment);

  const handleSelected = (event: Event) => {
    setSelected(event);
    console.info('[handleSelected - event]', event); //eslint-disable-line
  };

  return (
    <Box h='95%'>
      <BigCalendar
        {...props}
        events={events}
        localizer={localizer}
        selected={selected}
        onSelectEvent={handleSelected}
      />
    </Box>
  );
};

export default Calendar;
