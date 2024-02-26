import { useCallback } from 'react';
import { Calendar as BigCalendar, CalendarProps, Event, momentLocalizer } from 'react-big-calendar';
import { Box } from '@chakra-ui/react';
import moment from 'moment';

import { getEvents } from '../hooks/events';
import { useAddNewEvent } from '../hooks/useAddNewEvent';

const CalendarComponent = (props: Omit<CalendarProps, 'localizer'>) => {
  const { data, handleSelectSlot } = useAddNewEvent();
  const { events } = getEvents(data);

  const handleSelectEvent = useCallback((event: Event) => window.alert(event.title), []);

  const localizer = momentLocalizer(moment);

  return (
    <Box h='95%'>
      <BigCalendar
        {...props}
        selectable
        events={events}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />
    </Box>
  );
};

export default CalendarComponent;
