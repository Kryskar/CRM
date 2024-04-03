import { Flex } from "@chakra-ui/react"

import { ParsedEvent } from "../BoardBox_Container/BoardBox"

import EventBox from "./EventBox"

export const BoardBoxItem=({item,w}:{item:ParsedEvent,w:string})=>{
    return  <Flex  flexDirection={'column'} w={'100%'}>
                    <EventBox data={item} w={w} />
                  </Flex>
  }