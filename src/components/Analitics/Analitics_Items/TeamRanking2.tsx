import { ChangeEvent, useState } from 'react';
import { Avatar, Flex, Select, Text } from '@chakra-ui/react';

import { TEAM_RANKING_OPTIONS } from '../../../constants/constants';
import { CombinedArrItem, useStatisticsContext } from '../../../contexts/StatisticsProvider';
import { useThemeContext } from '../../../contexts/ThemeProvider';

import CustomAnalyticsFlex from './CustomAnaliticsFlex';

interface Detail {
  name: string;
  picture: string;
}

interface Groupped {
  details: Detail[];
  total: number;
}

interface MappedCombinedTeam {
  name: string;
  picture: string;
  total: number;
}
// team ranking with groupping same results
const TeamMembersRankings2 = () => {
  const { CONDITIONAL_OPTION_THEME } = useThemeContext();
  const { combinedTeamArrCurrentMonth } = useStatisticsContext();
  const [selectValue, setSelectValue] = useState(TEAM_RANKING_OPTIONS.successesVolume);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => setSelectValue(e.target.value);

  const optionFunctions: Record<
    string,
    {
      mapTotal: (el: CombinedArrItem) => number;
    }
  > = {
    [TEAM_RANKING_OPTIONS.successesVolume]: {
      mapTotal: (el) => el.statistics.totalAgentFinalizedValue,
    },
    [TEAM_RANKING_OPTIONS.finalizedNumber]: {
      mapTotal: (el) => el.statistics.numberOfFinalized,
    },
    [TEAM_RANKING_OPTIONS.chancesVolume]: {
      mapTotal: (el) => el.statistics.totalAgentChancesValue,
    },
    [TEAM_RANKING_OPTIONS.chancesNumber]: {
      mapTotal: (el) => el.statistics.numberOfChances,
    },
    [TEAM_RANKING_OPTIONS.notDoableNumber]: {
      mapTotal: (el) => el.statistics.numberOfNotDoable,
    },
    [TEAM_RANKING_OPTIONS.individualPlan]: {
      mapTotal: (el) => parseFloat(el.statistics.agentPrecentPlanRealization),
    },
    [TEAM_RANKING_OPTIONS.teamPlanContribution]: {
      mapTotal: (el) => parseFloat(el.statistics.contributionToTeamPlan),
    },
  };

  const getItemProperties = (index: number) => {
    switch (index) {
      case 0:
        return { color: 'teamRankingFirstColor', size: '35px' };
      case 1:
        return { color: 'teamRankingSecondColor', size: '30px' };
      case 2:
        return { color: 'teamRankingThirdColor', size: '25px' };
      default:
        return { color: 'fontColor', size: '18px' };
    }
  };

  const sortAndGroup = (arr: MappedCombinedTeam[]): Groupped[] => {
    const sortedArr = arr.sort((a, b) => b.total - a.total);

    const grouped: Groupped[] = sortedArr.reduce((acc: Groupped[], curr: MappedCombinedTeam) => {
      const index = acc.findIndex((item) => item.total === curr.total);
      if (index !== -1) {
        if (!Array.isArray(acc[index].details)) {
          acc[index].details = [];
        }
        acc[index].details.push({ name: curr.name, picture: curr.picture });
      } else {
        acc.push({ total: curr.total, details: [{ name: curr.name, picture: curr.picture }] });
      }
      return acc;
    }, []);

    return grouped;
  };

  const mappedCombinedTeamArr: MappedCombinedTeam[] = combinedTeamArrCurrentMonth.map((el) => ({
    name: el.fullName,
    picture: el.picture,
    total: optionFunctions[selectValue].mapTotal(el),
  }));

  const sortedAndGrouped = sortAndGroup(mappedCombinedTeamArr);

  return (
    <CustomAnalyticsFlex alignItems={'center'} gap='20px' w='400px'>
      <Text fontSize={'16px'} fontWeight={600}>
        Team members rankings:
      </Text>
      <Select bgColor={'primaryColor'} w={'60%'} onChange={handleChange}>
        {Object.values(TEAM_RANKING_OPTIONS).map((el) => (
          <option key={el} style={CONDITIONAL_OPTION_THEME} value={el}>
            {el}
          </option>
        ))}
      </Select>
      <Flex flexDirection={'column'} gap='10px' pt={'20px'} w='80%'>
        {sortedAndGrouped.map((el, index) => (
          <Flex
            key={el.total}
            alignItems={'center'}
            boxShadow={'0 2px 2px -2px gray'}
            justifyContent={'space-between'}
            pb='10px'
          >
            <Flex>
              <Flex alignItems={'center'} boxSize={'35px'} justifyContent={'center'}>
                <Text color={getItemProperties(index).color} fontSize={'25px'} fontWeight={600}>
                  {index + 1}
                </Text>
              </Flex>
              <Flex alignItems={'center'} gap='10px'>
                {el.details.length === 1
? (
                  <>
                    <Avatar size={'sm'} src={el.details[0].picture} />{' '}
                    <Text>{el.details[0].name} </Text>
                  </>
                )
: (
                  <Flex flexDirection={'column'} gap='10px'>
                    {el.details.map((obj) => (
                      <Flex key={obj.name} gap='10px'>
                        <Avatar size={'sm'} src={obj.picture} /> <Text>{obj.name} </Text>
                      </Flex>
                    ))}
                  </Flex>
                )}
              </Flex>
            </Flex>
            <Text fontWeight={600}>
              {selectValue === TEAM_RANKING_OPTIONS.individualPlan ||
              selectValue === TEAM_RANKING_OPTIONS.teamPlanContribution
                ? el.total + '%'
                : el.total}
            </Text>
          </Flex>
        ))}
      </Flex>
    </CustomAnalyticsFlex>
  );
};

export default TeamMembersRankings2;
