import { Flex } from '@chakra-ui/react';

import CalendarComponent from '../../components/Calendar/Calendar_Container/CalendarComponent';

const Calendar = () => {
  return (
    <Flex justifyContent={'center'} w='100vw'>
      <CalendarComponent />
    </Flex>
  );
};

export default Calendar;
