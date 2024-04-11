import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"

import { STATUSES } from "../../constants/constants"
import AddClient_Container from "../AddClient/AddClient_Container/AddClient_Contaier"
import { ModifyClientProps } from "../ClientsTable/columns"

import SuccessReport from "./SuccessReport"


const ModifyClient = ({data, isOpen, onClose}:ModifyClientProps) => {
  const {clientStatus} = data
  

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{clientStatus !== STATUSES.loanFinalized
? "Change Status"
: "Report Success"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex justifyContent={"center"} w={"100%"}>
            { clientStatus !== STATUSES.loanFinalized ?
              <AddClient_Container data={data} onClose={onClose}/> :
              <SuccessReport data={data}/>
              }
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModifyClient