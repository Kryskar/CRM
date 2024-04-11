import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "../../constants/query_keys"
import { supabase } from "../../database/supabase"

export interface NewEvent {
    client:string;
    clientId:string;
    dateTime:string;
    eventName:string;
    googleCalendarEventId: string | null;
    id:string;
    user:string;
}

export const useGetEventsFromSupabase = () => {
    const {data:events, error, isLoading} = useQuery({queryKey:[QUERY_KEYS.getTaskEvents], queryFn: async ()=> await supabase.from("events").select("*").order('dateTime', { ascending: false })})
    
    if (events && events.data) {
        const data:NewEvent[] = events.data
        return{data, isLoading, error}
        }
        return{data:[], isLoading, error}
  }


//   export const useGetUsersFromSupabase = () => {
//     const {data:users, error, isLoading} = useQuery({queryKey:["get_users"], queryFn: async ()=> await supabase.from('auth.users').select('*')})
    
//     // if (users && users.data) {
//     //     const data = users.data
//     //     return{data, isLoading, error}
//     //     }
//         return{users, isLoading, error}
//   }