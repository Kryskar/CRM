import { useState } from 'react';
import { Calendar as BigCalendar, CalendarProps, Event, momentLocalizer } from 'react-big-calendar';
import { Box, useDisclosure } from '@chakra-ui/react';
import moment from 'moment';

import { useThemeContext } from '../../../contexts/ThemeProvider';
import ModalEdit from '../Calendar_Items/ModalEditDelete';
import { useAddNewEvent } from '../hooks/useAddNewEvent';

import './CalendarStyles.css'

const CalendarComponent = (props: Omit<CalendarProps, 'localizer'>) => {
  const { data, handleSelectSlot } = useAddNewEvent();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { isDarkMode } = useThemeContext();

  const localizer = momentLocalizer(moment);

  return (
    <Box h='95%' data-theme={isDarkMode
? "dark"
: "light"}>
      <BigCalendar
        {...props}
        popup
        selectable
        events={data?.events || []}
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
