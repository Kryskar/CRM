import { chakra, Flex } from '@chakra-ui/react';

import {
  DAYS_IN_CURRENT_MONTH,
  DAYS_UNTIL_END_OF_MONTH,
  parseDynamic,
  TEAM_PLAN,
  TODAY,
} from '../../../../constants/constants';
import { useStatisticsContext } from '../../../../contexts/StatisticsProvider';
import CustomAnalyticsFlex from '../CustomAnaliticsFlex';

export const TeamPlanAndRealisation = () => {
  const { teamPrecentPlanRealization, totalFinalizedTeamThisMonth } = useStatisticsContext();
  const timePassedPrecentage = ((TODAY / DAYS_IN_CURRENT_MONTH) * 100).toFixed(2); //eslint-disable-line

  const sections = {
    sectionOne: {
      teamPlan: { label: 'team plan: ', value: TEAM_PLAN },
      teamPlanRealisationVolume: {
        label: 'team plan realisation volume: ',
        value: totalFinalizedTeamThisMonth,
      },
    },
    sectionTwo: {
      teamPlanRealisation: { label: 'team plan realisation: ', value: teamPrecentPlanRealization },
      timePassed: { label: 'time passed: ', value: timePassedPrecentage },
      daysUntilEndOfMonth: { label: 'days until end of month: ', value: DAYS_UNTIL_END_OF_MONTH },
    },
  };

  const getColor = (el: { label: string; value: number | string }) => {
    const HALF = 0.5;
    const HUNDRED_PRECENT = 100
    const value = parseDynamic(el.value);
    if (el.label === sections.sectionOne.teamPlanRealisationVolume.label) {
      if (value < TEAM_PLAN * HALF) {
        return 'red';
      } else if (value > TEAM_PLAN * HALF) {
        return 'orange';
      } else if (value > TEAM_PLAN) {
        return 'green';
      }
    }
    if (el.label === sections.sectionTwo.teamPlanRealisation.label) {
      if (value < HUNDRED_PRECENT * HALF) {
        return 'red';
      } else if (value > HUNDRED_PRECENT * HALF) {
        return 'orange';
      } else if (value > HUNDRED_PRECENT) {
        return 'green';
      }
    }
    return 'fontColor';
  };

  return (
    <CustomAnalyticsFlex flexDirection={'row'} justifyContent={'space-between'}>
      <Flex flexDirection={'column'} w='45%'>
        {Object.values(sections.sectionOne).map((el) => (
          <Flex key={el.label} justifyContent={'space-between'}>
            <chakra.span fontWeight={'600'}>{el.label}</chakra.span>
            <chakra.span color={getColor(el)}>{el.value}</chakra.span>
          </Flex>
        ))}
      </Flex>
      <Flex flexDirection={'column'} w='45%'>
        {Object.values(sections.sectionTwo).map((el) => (
          <Flex key={el.label} justifyContent={'space-between'}>
            <chakra.span fontWeight={'600'}>{el.label}</chakra.span>
            <chakra.span color={getColor(el)}>
              {el.label === sections.sectionTwo.teamPlanRealisation.label ||
              el.label === sections.sectionTwo.timePassed.label
                ? el.value + '%'
                : el.value}
            </chakra.span>
          </Flex>
        ))}
      </Flex>
    </CustomAnalyticsFlex>
  );
};
