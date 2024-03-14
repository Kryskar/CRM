// import { Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useTheme } from '@chakra-ui/react'


// const ClientsTable = ({data:clients}) => {
//   console.log(clients)
//   return (
//     <TableContainer>
//   <Table >
//     <Thead>
//       <Tr>
//         <Th>Name</Th>
//         <Th>Surname</Th>
//         <Th>phone number</Th>
//         <Th>requested amount</Th>
//         <Th>client time</Th>
//         <Th>latest status</Th>
//       </Tr>
//     </Thead>
//     <Tbody>
//         {clients.map((client,index) => {
//           const conditionalTheme = index % 2 === 0 ? "secondaryColor" : "tertiaryColor"
//           return (
//           <Tr>
//           <Td bgColor={conditionalTheme} color={"fontColor"}>{client.name}</Td>
//           <Td bgColor={conditionalTheme} color={"fontColor"}>{client.surname}</Td>
//           <Td bgColor={conditionalTheme} color={"fontColor"}>{client.phoneNumber}</Td>
//           <Td bgColor={conditionalTheme} color={"fontColor"}>{client.requestedAmount}$</Td>
//           <Td bgColor={conditionalTheme} color={"fontColor"}>{client.addedTime}</Td>
//           <Td bgColor={conditionalTheme} color={"fontColor"}>{client.clientStatus}</Td>
          
//         </Tr>  )})}
//     </Tbody>
//   </Table>
// </TableContainer>
//   )
// }

// export default ClientsTable