import { chakra, Flex } from '@chakra-ui/react';

import {
  analyticsGetColor,
  DAYS_IN_CURRENT_MONTH,
  DAYS_UNTIL_END_OF_MONTH,
  firstWordCharToUppercase,
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

  const { label: teamPlanRealisationLabel } = sections.sectionTwo.teamPlanRealisation;
  const { label: teamPlanRealisationVolumeLabel } = sections.sectionOne.teamPlanRealisationVolume;

  return (
    <CustomAnalyticsFlex
      flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
      gap={{ base: '10px', md: '10px', lg: '0px' }}
      justifyContent={'space-between'}
      w={{ base: '300px', md: '500px', lg: '100%' }}
    >
      <Flex flexDirection={'column'} w={{ base: '100%', lg: '45%' }}>
        {Object.values(sections.sectionOne).map((el) => (
          <Flex key={el.label} justifyContent={'space-between'}>
            <chakra.span fontWeight={'600'}>{firstWordCharToUppercase(el.label)}</chakra.span>
            <chakra.span
              color={analyticsGetColor(
                el,
                teamPlanRealisationLabel,
                teamPlanRealisationVolumeLabel,
                'team',
              )}
            >
              {el.value}
            </chakra.span>
          </Flex>
        ))}
      </Flex>
      <Flex flexDirection={'column'} w={{ base: '100%', lg: '45%' }}>
        {Object.values(sections.sectionTwo).map((el) => (
          <Flex key={el.label} justifyContent={'space-between'}>
            <chakra.span fontWeight={'600'}>{firstWordCharToUppercase(el.label)}</chakra.span>
            <chakra.span
              color={analyticsGetColor(
                el,
                teamPlanRealisationLabel,
                teamPlanRealisationVolumeLabel,
                'team',
              )}
            >
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
