import {
  add,
  addDays,
  addMonths,
  differenceInDays,
  differenceInMinutes,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  getDaysInMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export const INDEX_OF_FIRST_ITEM = 0;
export const EMPTY_ARR = 0;
export const ONE_MONTH_DISTANCE = 1;
export const ONE_DAY_DISTANCE = 1;
export const MINUTES_IN_HOUR = 60;
export const TWO_WEEKS_IN_MINUTES = 20160

export const DATE_FORMATS = {
  basic: 'dd/MM/yy',
  forTask: 'dd MMM (hh:mm aa)',
  monthName: 'MMMM',
  forQueryKeys: 'MM/yy',
  dateTime: 'dd/MM/yyyy, hh:mm:ss aa',
  day: 'dd',
  dayMonthShort: 'dd MMM',
  dayMonthFull: 'dd MMMM',
  timeForEvent: 'hh:mm aa',
  date: 'yyyy-MM-dd',
};

export const CALENDAR_TIME_MIN = '2022-01-01T00:00:00Z';
export const CALENDAR_TIME_MAX = '2052-01-01T00:00:00Z';
export const NOW = new Date();
export const TODAY = getDate(NOW);
export const TOMOROW = getDate(addDays(NOW, ONE_DAY_DISTANCE));
export const TODAY_BASIC_FORMAT = format(NOW, DATE_FORMATS.basic);
export const YESTERDAY_BASIC_FORMAT = format(addDays(NOW, -ONE_DAY_DISTANCE), DATE_FORMATS.basic);
export const MONTH_NAME = format(NOW, DATE_FORMATS.monthName);
export const NEXT_MONTH_NAME = format(addMonths(NOW, ONE_MONTH_DISTANCE), DATE_FORMATS.monthName);
export const START_OF_TODAY = startOfDay(NOW).toISOString();
export const END_OF_TODAY = endOfDay(NOW).toISOString();
export const START_OF_CURRENT_WEEK = startOfWeek(NOW).toISOString();
export const END_OF_CURRENT_WEEK = endOfWeek(NOW).toISOString();
export const START_OF_CURRENT_MONTH = startOfMonth(NOW).toISOString();
export const END_OF_CURRENT_MONTH = endOfMonth(NOW).toISOString();
export const WEEK_LENGTH = 7;
export const DAYS_UNTIL_END_OF_MONTH = differenceInDays(new Date(END_OF_CURRENT_MONTH), NOW);
export const DAYS_IN_CURRENT_MONTH = getDaysInMonth(NOW);

export const daysDifference = (endDate: Date, startDate: Date) =>
  differenceInDays(endDate, startDate);
export const minutesDifference = (endDate: string | Date, startDate: string | Date) =>
  differenceInMinutes(new Date(endDate), new Date(startDate));
export const formatStartNextPrevoiusMonth = (date: string, distance: number) =>
  startOfMonth(addMonths(date, distance)).toISOString();
export const formatEndNextPrevoiusMonth = (date: string, distance: number) =>
  endOfMonth(addMonths(date, distance)).toISOString();

export const formattedDate = (date: string, dateFormat: string) =>
  format(new Date(date), dateFormat);
export const convertLocalToISODate = (date: string) => new Date(date).toISOString();
export const startOfProvidedDay = (date: string) => startOfDay(new Date(date)).toISOString();
export const endOfProvidedDay = (date: string) => endOfDay(new Date(date)).toISOString();
export const dateToIso = (date: string) => new Date(date).toISOString();
export const addOneHourToIso = (date: string) => add(new Date(date), { hours: 1 }).toISOString();

export const firstWordCharToUppercase = (word: string) => {
  const FIRST_CHAR_INDEX = 0;
  const INDEX_OF_THE_BEGINNING = 1;
  return word.charAt(FIRST_CHAR_INDEX).toUpperCase() + word.slice(INDEX_OF_THE_BEGINNING);
};

export const STATUSES = {
  chance: 'chance',
  notDoable: 'not doable',
  notAnswering: 'not answering phone call',
  callClient: 'call to client',
  clientConsidering: 'client is considering the offer',
  waitingForDocuments: 'waiting for documents',
  recievedDocuments: 'recieved documents',
  loanAppSubmittedInBank: 'loan application submitted in bank',
  loanAppAcceptedInBank: 'loan application accepted in bank',
  loanAppRejectedInBank: 'loan application rejected in bank',
  loanFinalized: 'success',
  loanRejectedbyClient: 'rejected by client',
  reported: 'success - reported',
};

export const STATUSES_ARR = Object.entries(STATUSES).map(([_, value]) => ({ //eslint-disable-line
  value: value,
  label: value,
}));  

export const FILTERED_STATUSES_ARR = STATUSES_ARR.filter(
  ({ label }) =>
    label !== STATUSES.callClient && label !== STATUSES.notDoable && label !== STATUSES.reported,
);

export const POLISH_BANKS = [
  'PKO Bank Polski',
  'Bank Pekao SA',
  'mBank',
  'ING Bank Śląski',
  'Bank Millennium',
  'Alior Bank',
  'Santander Bank Polska',
  'VeloBank',
  'Credit Agricole Bank Polska',
  'Raiffeisen Digital',
  'BNP Paribas Bank Polska',
  'Bank Pocztowy',
];

interface PolishBankLogosColors {
  [key: string]: { backgroundColor: string; borderColor: string; logo: string };
}
export const POLISH_BANKS_LOGOS_COLORS: PolishBankLogosColors = {
  'PKO Bank Polski': {
    logo: 'https://s3-symbol-logo.tradingview.com/pkobp--600.png',
    backgroundColor: 'rgba(2, 66, 131, 0.2)',
    borderColor: 'rgba(2, 66, 131, 1)',
  },
  'Bank Pekao SA': {
    logo: 'https://yt3.googleusercontent.com/wjqeMBJLJ9pdL_QcdZwTjIhzSQ3UPsLKAie9DM93Zd_VwXLDWlMA2lsBaCiZnNAl9JW9kw0lCto=s900-c-k-c0x00ffffff-no-rj',
    backgroundColor: 'rgba(217, 48, 60, 0.5)',
    borderColor: 'rgba(217, 48, 60, 1)',
  },
  mBank: {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp0zeuqJb2XcCgb3nuo-2XmZY7z8POc-wQrGCWnPdQaA&s',
    backgroundColor: 'rgba(231, 2, 22, 0.2)',
    borderColor: 'rgba(231, 2, 22, 1)',
  },
  'ING Bank Śląski': {
    logo: 'https://www.galeriapolnocna.pl/cache/_store/ing-bank-slaski_main.jpeg_alpha-0_nc_366x366_im.webp',
    backgroundColor: 'rgba(232, 108, 38, 0.2)',
    borderColor: 'rgba(232, 108, 38, 1)',
  },
  'Bank Millennium': {
    logo: 'https://yt3.googleusercontent.com/ytc/AIdro_nh2v2q8pV6-q5zU92rNVRkSzxSMwG2D5JqhCLdTg=s900-c-k-c0x00ffffff-no-rj',
    backgroundColor: 'rgba(205, 7, 108, 0.3)',
    borderColor: 'rgba(205, 7, 108, 1)',
  },
  'Alior Bank': {
    logo: 'https://iconape.com/wp-content/files/uh/209497/png/209497.png',
    backgroundColor: 'rgba(108, 23, 22, 0.2)',
    borderColor: 'rgba(108, 23, 22, 1)',
  },
  'Santander Bank Polska': {
    logo: 'https://www.santander.pl/_fileserver/time20221223125626/item/1514567',
    backgroundColor: 'rgba(209, 0, 13, 0.3)',
    borderColor: 'rgba(209, 0, 13, 1)',
  },
  VeloBank: {
    logo: 'https://prnews.pl/wp-content/uploads/2022/11/VeloBank_logo-e1669095277904.png',
    backgroundColor: 'rgba(25, 175, 77, 0.2)',
    borderColor: 'rgba(25, 175, 77, 1)',
  },
  'Credit Agricole Bank Polska': {
    logo: 'https://icons.veryicon.com/png/o/business/bank-logo-collection/logo-of-credit-agricole.png',
    backgroundColor: 'rgba(21, 123, 116, 0.3)',
    borderColor: 'rgba(21, 123, 116, 1)',
  },
  'Raiffeisen Digital': {
    logo: 'https://play-lh.googleusercontent.com/sWe4Dh2Z7Uxkdka9L07mQkGsu5ncH8BwCCCYVYjOLpOjbMz8YWNfyddM_oINkp3ZHKI',
    backgroundColor: 'rgba(255, 231, 58, 0.2)',
    borderColor: 'rgba(255, 231, 58, 1)',
  },
  'BNP Paribas Bank Polska': {
    logo: 'https://p7.hiclipart.com/preview/209/419/819/5bfad0c24e8e5.jpg',
    backgroundColor: 'rgba(22, 176, 117, 0.4)',
    borderColor: 'rgba(22, 176, 117, 1)',
  },
  'Bank Pocztowy': {
    logo: 'https://grubber.gpcdn.pl/companies/3333867/employer-profile-logos/2da80000-56be-0050-9e61-08dc01686915.jpg',
    backgroundColor: 'rgba(64, 22, 99, 0.3)',
    borderColor: 'rgba(64, 22, 99, 1)',
  },
};

export const POLISH_BANKS_LOGOS_COLORS_DARK_MODE: PolishBankLogosColors = {
  'PKO Bank Polski': {
    logo: 'https://s3-symbol-logo.tradingview.com/pkobp--600.png',
    backgroundColor: 'rgba(2, 66, 131, 0.5)',
    borderColor: 'rgba(2, 66, 131, 0.6)',
  },
  'Bank Pekao SA': {
    logo: 'https://yt3.googleusercontent.com/wjqeMBJLJ9pdL_QcdZwTjIhzSQ3UPsLKAie9DM93Zd_VwXLDWlMA2lsBaCiZnNAl9JW9kw0lCto=s900-c-k-c0x00ffffff-no-rj',
    backgroundColor: 'rgba(217, 48, 60, 0.7)',
    borderColor: 'rgba(217, 48, 60, 0.8)',
  },
  mBank: {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp0zeuqJb2XcCgb3nuo-2XmZY7z8POc-wQrGCWnPdQaA&s',
    backgroundColor: 'rgba(231, 2, 22, 0.5)',
    borderColor: 'rgba(231, 2, 22, 0.6)',
  },
  'ING Bank Śląski': {
    logo: 'https://www.galeriapolnocna.pl/cache/_store/ing-bank-slaski_main.jpeg_alpha-0_nc_366x366_im.webp',
    backgroundColor: 'rgba(232, 108, 38, 0.5)',
    borderColor: 'rgba(232, 108, 38, 0.6)',
  },
  'Bank Millennium': {
    logo: 'https://yt3.googleusercontent.com/ytc/AIdro_nh2v2q8pV6-q5zU92rNVRkSzxSMwG2D5JqhCLdTg=s900-c-k-c0x00ffffff-no-rj',
    backgroundColor: 'rgba(205, 7, 108, 0.6)',
    borderColor: 'rgba(205, 7, 108, 0.7)',
  },
  'Alior Bank': {
    logo: 'https://iconape.com/wp-content/files/uh/209497/png/209497.png',
    backgroundColor: 'rgba(108, 23, 22, 0.5)',
    borderColor: 'rgba(108, 23, 22, 0.6)',
  },
  'Santander Bank Polska': {
    logo: 'https://www.santander.pl/_fileserver/time20221223125626/item/1514567',
    backgroundColor: 'rgba(209, 0, 13, 0.6)',
    borderColor: 'rgba(209, 0, 13, 0.7)',
  },
  VeloBank: {
    logo: 'https://prnews.pl/wp-content/uploads/2022/11/VeloBank_logo-e1669095277904.png',
    backgroundColor: 'rgba(25, 175, 77, 0.5)',
    borderColor: 'rgba(25, 175, 77, 0.6)',
  },
  'Credit Agricole Bank Polska': {
    logo: 'https://icons.veryicon.com/png/o/business/bank-logo-collection/logo-of-credit-agricole.png',
    backgroundColor: 'rgba(21, 123, 116, 0.6)',
    borderColor: 'rgba(21, 123, 116, 0.7)',
  },
  'Raiffeisen Digital': {
    logo: 'https://play-lh.googleusercontent.com/sWe4Dh2Z7Uxkdka9L07mQkGsu5ncH8BwCCCYVYjOLpOjbMz8YWNfyddM_oINkp3ZHKI',
    backgroundColor: 'rgba(255, 231, 58, 0.5)',
    borderColor: 'rgba(255, 231, 58, 0.6)',
  },
  'BNP Paribas Bank Polska': {
    logo: 'https://p7.hiclipart.com/preview/209/419/819/5bfad0c24e8e5.jpg',
    backgroundColor: 'rgba(22, 176, 117, 0.7)',
    borderColor: 'rgba(22, 176, 117, 0.8)',
  },
  'Bank Pocztowy': {
    logo: 'https://grubber.gpcdn.pl/companies/3333867/employer-profile-logos/2da80000-56be-0050-9e61-08dc01686915.jpg',
    backgroundColor: 'rgba(64, 22, 99, 0.6)',
    borderColor: 'rgba(64, 22, 99, 0.7)',
  },
};

export const POLISH_BANKS_LOGOS_COLORS_DARK_MODE_ARR = Object.entries(
  POLISH_BANKS_LOGOS_COLORS_DARK_MODE,
);
export const POLISH_BANKS_LOGOS_COLORS_ARR = Object.entries(POLISH_BANKS_LOGOS_COLORS);

export const AGENT_PLAN = 300000;
export const TEAM_PLAN = 3000000;

export const calculateTotal = (data: any[], key: string): number => { //eslint-disable-line
   
  return data.reduce((acc, obj) => acc + (+obj[key] || 0), 0);
};

export const convertToPercentValue = (value: number, data: number[]) => {
  const sum = data.reduce((acc, data) => acc + data, 0);
  if (sum === 0) return '0%';
  return ((value * 100) / sum).toFixed(2) + '%'; //eslint-disable-line
};

export const parseDynamic = (value: string | number) => {
  if (typeof value === 'string') {
    return parseFloat(value);
  }
  return value;
};

export const TEAM_RANKING_OPTIONS = {
  successesVolume: 'successes volume',
  finalizedNumber: 'finalized number',
  chancesVolume: 'chances volume',
  chancesNumber: 'chances number',
  notDoableNumber: 'not doable number',
  individualPlan: 'individual plan %',
  teamPlanContribution: 'team plan contribution',
};

// type: "numberCalc" | "percentage"
export const analyticsGetColor = (
  el: { label: string; value: number | string },
  label1: string,
  label2: string,
  plan?: 'team' | 'agent',
) => {
  const HALF = 0.5;
  const HUNDRED_PRECENT = 100;
  const value = parseDynamic(el.value);
  const choosedPlan = plan === 'team'
? TEAM_PLAN
: AGENT_PLAN;

  if (el.label === label1) {
    if (value >= HUNDRED_PRECENT) {
      return 'analyticsGreen';
    } else if (value >= HUNDRED_PRECENT * HALF) {
      return 'analyticsOrange';
    } else {
      return 'analyticsRed';
    }
  }

  if (el.label === label2) {
    if (value >= choosedPlan) {
      return 'analyticsGreen';
    } else if (value >= choosedPlan * HALF) {
      return 'analyticsOrange';
    } else {
      return 'analyticsRed';
    }
  }

  return 'fontColor';
};
