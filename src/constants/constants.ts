import { addDays, addMonths, differenceInDays, endOfDay, endOfMonth, endOfWeek, format, getDate, startOfDay, startOfMonth, startOfWeek } from 'date-fns';

export const INDEX_OF_FIRST_ITEM = 0
export const ONE_MONTH_DISTANCE = 1
export const ONE_DAY_DISTANCE = 1

export const DATE_FORMATS = {
    basic: "dd/MM/yy",
    forTask: 'dd MMM (hh:mm aa)',
    monthName: 'MMMM',
    forQueryKeys: 'MM/yy',
    dateTime: 'dd/MM/yyyy, hh:mm:ss aa',
    day: 'dd',
    dayMonthFull: "dd MMMM",
    timeForEvent: "hh:mm aa"
}

export const CALENDAR_TIME_MIN = '2022-01-01T00:00:00Z';
export const CALENDAR_TIME_MAX = '2052-01-01T00:00:00Z';
export const NOW = new Date()
export const TODAY = getDate(NOW)
export const TOMOROW = getDate(addDays(NOW, ONE_DAY_DISTANCE))
export const TODAY_BASIC_FORMAT = format(NOW, DATE_FORMATS.basic)
export const YESTERDAY_BASIC_FORMAT = format(addDays(NOW, -ONE_DAY_DISTANCE), DATE_FORMATS.basic)
export const MONTH_NAME = format(NOW, DATE_FORMATS.monthName);
export const NEXT_MONTH_NAME = format(addMonths(NOW, ONE_MONTH_DISTANCE), DATE_FORMATS.monthName);
export const START_OF_TODAY = startOfDay(NOW).toISOString()
export const END_OF_TODAY = endOfDay(NOW).toISOString()
export const START_OF_CURRENT_WEEK = startOfWeek(NOW).toISOString()
export const END_OF_CURRENT_WEEK = endOfWeek(NOW).toISOString()
export const START_OF_CURRENT_MONTH = startOfMonth(NOW).toISOString()
export const END_OF_CURRENT_MONTH = endOfMonth(NOW).toISOString()
export const WEEK_LENGTH = 7

// export const CALENDAR_NEXT_MONTH_START = startOfMonth(addMonths(NOW, ONE_MONTH_DISTANCE)).toISOString()
// export const CALENDAR_NEXT_MONTH_END = endOfMonth(addMonths(NOW, ONE_MONTH_DISTANCE)).toISOString()
// export const CALENDAR_PREVIOUS_MONTH_START = startOfMonth(addMonths(NOW, -ONE_MONTH_DISTANCE)).toISOString()
// export const CALENDAR_PREVIOUS_MONTH_END = endOfMonth(addMonths(NOW, -ONE_MONTH_DISTANCE)).toISOString()
export const daysDifference = (endDate:Date, startDate:Date) => differenceInDays(endDate, startDate)
export const formatStartNextPrevoiusMonth = (date:string, distance:number) => startOfMonth(addMonths(date, distance)).toISOString()
export const formatEndNextPrevoiusMonth = (date:string, distance:number) => endOfMonth(addMonths(date, distance)).toISOString()


export const formattedDate = (date: string, dateFormat:string) => format(new Date(date), dateFormat);
// export const formatForTask = (date: string) => format(new Date(date), 'dd MMM (hh:mm aa)');
// export const formatMonthName = (date: string) => format(new Date(date), 'MMMM');
// export const formattedDateForQueryKeys = (date: string) => format(new Date(date), 'MM/yy');
