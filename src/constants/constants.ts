import { addDays, addMonths, differenceInDays, endOfDay, endOfMonth, endOfWeek, format, getDate, getDaysInMonth, startOfDay, startOfMonth, startOfWeek } from 'date-fns';

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
    timeForEvent: "hh:mm aa",
    date: "yyyy-MM-dd"
}

export const MONTHLY_PLAN = 200000
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
export const DAYS_UNTIL_END_OF_MONTH = differenceInDays(new Date(END_OF_CURRENT_MONTH), NOW)
export const DAYS_IN_CURRENT_MONTH = getDaysInMonth(NOW);

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
export const convertLocalToISODate = (date:string) => new Date(date).toISOString()
export const startOfProvidedDay = (date:string) => startOfDay(new Date(date)).toISOString()
export const endOfProvidedDay = (date:string) => endOfDay(new Date(date)).toISOString()

export const firstWordCharToUppercase = (word: string) => {
    const FIRST_CHAR_INDEX = 0;
    const INDEX_OF_THE_BEGINNING = 1;
    return word.charAt(FIRST_CHAR_INDEX).toUpperCase() + word.slice(INDEX_OF_THE_BEGINNING);
  };

export const STATUSES = {
    chance: "chance",
    notDoable: "not doable",
    notAnswering: "not answering phone call",
    callClient: "call to client",
    clientConsidering: "client is considering the offer",
    waitingForDocuments: "waiting for documents",
    recievedDocuments: "recieved documents",
    loanAppSubmittedInBank: "loan application submitted in bank",
    loanAppAcceptedInBank: "loan application accepted in bank",
    loanAppRejectedInBank: "loan application rejected in bank",
    loanFinalized: "success",
    loanRejectedbyClient: "rejected by client",
    reported: "success - reported"
}

export const STATUSES_ARR = Object.entries(STATUSES).map(([_,value]) => ({value:value, label:value})) //eslint-disable-line

export const FILTERED_STATUSES_ARR = STATUSES_ARR.filter(({label}) => (label!==STATUSES.callClient && label!==STATUSES.notDoable && label!==STATUSES.reported) )

export const POLISH_BANKS = [
    "PKO Bank Polski",
    "Bank Pekao SA",
    "mBank",
    "ING Bank Śląski",
    "Bank Millennium",
    "Alior Bank",
    "Santander Bank Polska",
    "VeloBank",
    "Credit Agricole Bank Polska",
    "Raiffeisen Digital",
    "BNP Paribas Bank Polska",
    "Bank Pocztowy",
  ];

  interface PolishBankLogos {
    [key: string]: string;
  }
  export const POLISH_BANKS_LOGOS :PolishBankLogos = {
    "PKO Bank Polski": "https://s3-symbol-logo.tradingview.com/pkobp--600.png",
    "Bank Pekao SA": "https://yt3.googleusercontent.com/wjqeMBJLJ9pdL_QcdZwTjIhzSQ3UPsLKAie9DM93Zd_VwXLDWlMA2lsBaCiZnNAl9JW9kw0lCto=s900-c-k-c0x00ffffff-no-rj",
    "mBank": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp0zeuqJb2XcCgb3nuo-2XmZY7z8POc-wQrGCWnPdQaA&s',
    "ING Bank Śląski": "https://www.galeriapolnocna.pl/cache/_store/ing-bank-slaski_main.jpeg_alpha-0_nc_366x366_im.webp",
    "Bank Millennium": "https://yt3.googleusercontent.com/ytc/AIdro_nh2v2q8pV6-q5zU92rNVRkSzxSMwG2D5JqhCLdTg=s900-c-k-c0x00ffffff-no-rj",
    "Alior Bank": "https://iconape.com/wp-content/files/uh/209497/png/209497.png",
    "Santander Bank Polska": "https://www.santander.pl/_fileserver/time20221223125626/item/1514567",
    "VeloBank": "https://prnews.pl/wp-content/uploads/2022/11/VeloBank_logo-e1669095277904.png",
    "Credit Agricole Bank Polska": "https://icons.veryicon.com/png/o/business/bank-logo-collection/logo-of-credit-agricole.png",
    "Raiffeisen Digital": "https://play-lh.googleusercontent.com/sWe4Dh2Z7Uxkdka9L07mQkGsu5ncH8BwCCCYVYjOLpOjbMz8YWNfyddM_oINkp3ZHKI",
    "BNP Paribas Bank Polska": "https://p7.hiclipart.com/preview/209/419/819/5bfad0c24e8e5.jpg",
    "Bank Pocztowy": "https://grubber.gpcdn.pl/companies/3333867/employer-profile-logos/2da80000-56be-0050-9e61-08dc01686915.jpg",
  };

  export const AGENT_PLAN = 300000
  export const TEAM_PLAN = 3000000

  export const calculateTotal = (data: any[], key: string):number => { //eslint-disable-line
    return data.reduce((acc, obj) => acc + (+obj[key] || 0), 0); //eslint-disable-line
  };

