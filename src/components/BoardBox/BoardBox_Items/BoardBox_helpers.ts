import { TODAY_BASIC_FORMAT, YESTERDAY_BASIC_FORMAT } from "../../../constants/constants"

export const getBoardBoxTitle=(date:string)=>{
    switch(date){
      case TODAY_BASIC_FORMAT:
        return 'Today'
      case YESTERDAY_BASIC_FORMAT:
        return 'Yesterday'
      default:
        return date
    }
  }