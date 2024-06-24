import { Event } from 'react-big-calendar';
import { differenceInHours } from 'date-fns';

import { DATE_FORMATS, formattedDate } from '../../../constants/constants';

export const splitString = (inputString: string) => {
  const separatorIndex = inputString.indexOf(':');
  if (separatorIndex !== -1) {
    const title = inputString.substring(0, separatorIndex).trim();
    const rest = inputString.substring(separatorIndex + 1).trim();

    if (title.split('').some((char) => char.toUpperCase() !== char)) {
      return { title: '', rest: inputString.trim() };
    } else {
      return { title, rest };
    }
  } else {
    return { title: '', rest: inputString.trim() };
  }
};

export const getFormatDateTaskboard = (event: Event) => {
  if (event.start && event.end) {
    const hoursDifference = differenceInHours(event.end, event.start);
    const ALMOST_WHOLE_DAY = 23;
    if (hoursDifference >= ALMOST_WHOLE_DAY)
      return formattedDate(event.start.toISOString(), DATE_FORMATS.dayMonthShort);
    else if (hoursDifference < ALMOST_WHOLE_DAY)
      return formattedDate(event.start.toISOString(), DATE_FORMATS.forTask);
  }
  return '';
};
