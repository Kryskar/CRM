import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "../../constants/query_keys"
import { supabase } from "../../database/supabase"
import { NewClient } from "../../pages/Add_Client/AddClient"

// export interface SupabaseClientResponse {
//     count: any,
//     data: NewClient[]
//     error: any,
//     status: number
//     statusText: string
//   }

export const useGetClientsFromSupabase = () => {
  const {data:clients, error, isLoading} = useQuery({queryKey:[QUERY_KEYS.getClients], queryFn: async ()=> await supabase.from("clients").select("*")})
   
  if (clients && clients.data) {
  const data:NewClient[] = clients.data
  return{data, isLoading, error}
  }
  return{data:[], isLoading, error}
}
