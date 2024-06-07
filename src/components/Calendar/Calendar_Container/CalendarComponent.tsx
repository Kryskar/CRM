import { useEffect, useState } from 'react';
import { Calendar as BigCalendar, CalendarProps, Event, momentLocalizer } from 'react-big-calendar';
import { Box, useDisclosure } from '@chakra-ui/react';
import moment from 'moment';

import { useThemeContext } from '../../../contexts/ThemeProvider';
import { useTourContext } from '../../../contexts/TourProvider';
import ModalEdit from '../Calendar_Items/ModalEditDelete';
import { useAddNewEvent } from '../hooks/useAddNewEvent';

import './CalendarStyles.css';

declare module 'react-big-calendar' {
  interface Event {
    description?: string | undefined;
    id?: string;
  }
}

const CalendarComponent = (props: Omit<CalendarProps, 'localizer'>) => {
  const { data, handleSelectSlot } = useAddNewEvent();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { isDarkMode } = useThemeContext();
  const { modalOpen, randomNum, setModalOpen, setRun, setStepIndex, stepIndex } = useTourContext();
  const localizer = momentLocalizer(moment);
  const tourEvent =
    data?.events.find((el) =>
      typeof el.title === 'string'
? el.title.includes(randomNum)
: null,
    ) || null;
    /* eslint-disable */
  useEffect(() => {
    if (stepIndex === 18) {
      setRun(false);
      setSelectedEvent(tourEvent);
      onOpen();
      setModalOpen(true);
    }
    if (isOpen && modalOpen) {
      setRun(true);
      setStepIndex(19);
      setModalOpen(false);
    }
  }, [stepIndex, isOpen]);
  /* eslint-enable */
  return (
    <Box
      className='step23'
      h={{ base: '65vh', md: '65vh', lg: '85vh' }}
      w='97%'
      data-theme={isDarkMode
? 'dark'
: 'light'}
    >
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
