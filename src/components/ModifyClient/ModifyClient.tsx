import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"

import AddClient_Container from "../AddClient/AddClient_Container/AddClient_Contaier"
import { ModifyClientProps } from "../ClientsTable/columns"


const ModifyClient = ({data, isOpen, onClose}:ModifyClientProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex justifyContent={"center"} w={"100%"}><AddClient_Container data={data} onClose={onClose}/></Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModifyClient