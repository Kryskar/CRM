// import { ChangeEvent, useState } from 'react';
// import { Avatar, Flex, Select, Text } from '@chakra-ui/react';

// import { TEAM_RANKING_OPTIONS } from '../../../constants/constants';
// import { CombinedArrItem, useStatisticsContext } from '../../../contexts/StatisticsProvider';

// import CustomAnalyticsFlex from './CustomAnaliticsFlex';

// // team ranking without groupping same results
// const TeamMembersRankings = () => {
//   const { combinedTeamArrCurrentMonth } = useStatisticsContext();
//   const [selectValue, setSelectValue] = useState(TEAM_RANKING_OPTIONS.successesVolume);
//   const handleChange = (e: ChangeEvent<HTMLSelectElement>) => setSelectValue(e.target.value);

//   const optionFunctions: Record<
//     string,
//     {
//       render: (el: CombinedArrItem) => number | string;
//       sortFn: (a: CombinedArrItem, b: CombinedArrItem) => number;
//     }
//   > = {
//     [TEAM_RANKING_OPTIONS.successesVolume]: {
//       sortFn: (a, b) =>
//         b.statistics.totalAgentFinalizedValue - a.statistics.totalAgentFinalizedValue,
//       render: (el) => el.statistics.totalAgentFinalizedValue,
//     },
//     [TEAM_RANKING_OPTIONS.finalizedNumber]: {
//       sortFn: (a, b) => b.statistics.numberOfFinalized - a.statistics.numberOfFinalized,
//       render: (el) => el.statistics.numberOfFinalized,
//     },
//     [TEAM_RANKING_OPTIONS.chancesVolume]: {
//       sortFn: (a, b) => b.statistics.totalAgentChancesValue - a.statistics.totalAgentChancesValue,
//       render: (el) => el.statistics.totalAgentChancesValue,
//     },
//     [TEAM_RANKING_OPTIONS.chancesNumber]: {
//       sortFn: (a, b) => b.statistics.numberOfChances - a.statistics.numberOfChances,
//       render: (el) => el.statistics.numberOfChances,
//     },
//     [TEAM_RANKING_OPTIONS.notDoableNumber]: {
//       sortFn: (a, b) => b.statistics.numberOfNotDoable - a.statistics.numberOfNotDoable,
//       render: (el) => el.statistics.numberOfNotDoable,
//     },
//     [TEAM_RANKING_OPTIONS.individualPlan]: {
//       sortFn: (a, b) =>
//         parseFloat(b.statistics.agentPrecentPlanRealization) -
//         parseFloat(a.statistics.agentPrecentPlanRealization),
//       render: (el) => el.statistics.agentPrecentPlanRealization + '%',
//     },
//     [TEAM_RANKING_OPTIONS.teamPlanContribution]: {
//       sortFn: (a, b) =>
//         parseFloat(b.statistics.contributionToTeamPlan) -
//         parseFloat(a.statistics.contributionToTeamPlan),
//       render: (el) => el.statistics.contributionToTeamPlan + '%',
//     },
//   };

//   const getItemProperties = (index: number) => {
//     switch (index) {
//       case 0:
//         return { color: '#cca528', size: '35px' };
//       case 1:
//         return { color: 'gray', size: '30px' };
//       case 2:
//         return { color: '#8d2e31', size: '25px' };
//       default:
//         return { color: 'fontColor', size: '18px' };
//     }
//   };

//   const sortedTeamCombinedArr = combinedTeamArrCurrentMonth.sort((a, b) =>
//     optionFunctions[selectValue].sortFn(a, b),
//   );

//   return (
//     <CustomAnalyticsFlex alignItems={'center'} gap='20px' w='400px'>
//       <Text>Team members rankings:</Text>
//       <Select bgColor={'primaryColor'} w={'60%'} onChange={handleChange}>
//         {Object.values(TEAM_RANKING_OPTIONS).map((el) => (
//           <option key={el} value={el}>
//             {el}
//           </option>
//         ))}
//       </Select>
//       <Flex flexDirection={'column'} gap='10px' pt={'20px'} w='80%'>
//         {sortedTeamCombinedArr.map((el, index) => (
//           <Flex
//             key={el.id}
//             alignItems={'center'}
//             boxShadow={'0 2px 2px -2px gray'}
//             justifyContent={'space-between'}
//             pb='10px'
//           >
//             <Flex>
//               <Flex alignItems={'center'} boxSize={'35px'} justifyContent={'center'}>
//                 <Text
//                   color={getItemProperties(index).color}
//                   fontSize={getItemProperties(index).size}
//                   fontWeight={600}
//                 >
//                   {index + 1}
//                 </Text>
//               </Flex>
//               <Flex alignItems={'center'} gap='10px'>
//                 <Avatar size={'sm'} src={el.picture} /> <Text>{el.fullName}: </Text>
//               </Flex>
//             </Flex>
//             <Text fontWeight={600}>{optionFunctions[selectValue].render(el)}</Text>
//           </Flex>
//         ))}
//       </Flex>
//     </CustomAnalyticsFlex>
//   );
// };

// export default TeamMembersRankings;
