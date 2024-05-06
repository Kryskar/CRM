import { Flex } from "@chakra-ui/react"

import { ParsedEvent } from "./BoardBox_Events"
import EventBox from "./EventBox"

export const BoardBoxItem=({item}:{item:ParsedEvent})=>{
    return  <Flex  flexDirection={'column'} w={'100%'}>
                    <EventBox data={item} />
                  </Flex>
  }