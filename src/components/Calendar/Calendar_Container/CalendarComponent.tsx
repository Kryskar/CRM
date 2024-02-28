import { useState } from 'react';
import { Calendar as BigCalendar, CalendarProps, Event, momentLocalizer } from 'react-big-calendar';
import { Box, useDisclosure } from '@chakra-ui/react';
import moment from 'moment';

import ModalEdit from '../Calendar_Items/ModalEditDelete';
import { getEvents } from '../hooks/events';
import { useAddNewEvent } from '../hooks/useAddNewEvent';

const CalendarComponent = (props: Omit<CalendarProps, 'localizer'>) => {
  const { data, handleSelectSlot } = useAddNewEvent();
  const { events } = getEvents(data);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const localizer = momentLocalizer(moment);

  return (
    <Box h='95%'>
      <BigCalendar
        {...props}
        popup
        selectable
        events={events}
        localizer={localizer}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(e) => {
          setSelectedEvent(e);
          onOpen();
        }}
      />
      <ModalEdit event={selectedEvent} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default CalendarComponent;
