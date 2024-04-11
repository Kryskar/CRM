import { createContext, useContext } from 'react';
import { Spinner } from '@chakra-ui/react';

import { NewClient } from '../api/mutations/Clients/useAddClientToSupabase';
import { UserSupabase } from '../api/mutations/Users/useAddUserToSupabase';
import { useGetClientsFromSupabase } from '../api/queries/useGetClientsFromSupabase';
import {
  FinalizedRecord,
  useGetFinalizedFromSupabase,
} from '../api/queries/useGetFinalizedfromSupabase';
import { useGetUsersFromSupabase } from '../api/queries/useGetUsersFromSupabase';
import {
  AGENT_PLAN,
  calculateTotal,
  END_OF_CURRENT_MONTH,
  START_OF_CURRENT_MONTH,
  STATUSES,
  TEAM_PLAN,
} from '../constants/constants';

import { useSessionContext } from './SessionProvider';

export interface CombinedArrItem extends UserSupabase {
  chanceClients: NewClient[];
  finalized: FinalizedRecord[];
  statistics: {
    agentPrecentPlanRealization: string;
    contributionToTeamPlan: string;
    totalAgentChancesValue: number;
    totalAgentFinalizedValue: number;
  };
}

interface StatisticsContext {
  agentPrecentPlanRealization: string;
  allChanceClients: NewClient[] | never[];
  combinedTeamArrCurrentMonth: CombinedArrItem[];
  finalizedDataLoggedInAgent: never[] | FinalizedRecord[];
  finalizedDataTeamThisMonth: never[] | FinalizedRecord[];
  loggedInAgentChanceClients: NewClient[] | never[];
  teamPrecentPlanRealization: string;
  totalAgentChancesValue: number;
  totalFinalizedAgentThisMonth: number;
  totalFinalizedTeamThisMonth: number;
  totalTeamChancesValue: number;
}

const StatisticsContext = createContext<StatisticsContext | null>(null);

const StatisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }:{children:React.ReactNode}) => {
  const { email } = useSessionContext();
  const { data: allChanceClients, isLoading: isLoadingAllClients } = useGetClientsFromSupabase(
    STATUSES.chance,
  );
  const { data: finalizedDataTeamThisMonth, isLoading: isFinalizedTeamLoading } =
    useGetFinalizedFromSupabase('', START_OF_CURRENT_MONTH, END_OF_CURRENT_MONTH);

  const { data: allUsers, isLoading: isAllUsersLoading } = useGetUsersFromSupabase();

  if (isLoadingAllClients || isFinalizedTeamLoading || isAllUsersLoading) {
    return <Spinner />;
  }
  const loggedInAgentChanceClients = allChanceClients.filter((obj) => obj.agentEmail === email);
  const finalizedDataLoggedInAgent = finalizedDataTeamThisMonth.filter(
    (obj) => obj.agentEmail === email,
  );

  const combinedTeamArrCurrentMonth = allUsers.map((item) => {
    const allAgentChanceClientsArr = allChanceClients.filter((el) => el.agentEmail === item.email);
    const finalizedAgentClientsArr = finalizedDataTeamThisMonth.filter(
      (el) => el.agentEmail === item.email,
    );
    const totalAgentChancesValue = calculateTotal(allAgentChanceClientsArr, 'requestedAmount');
    const totalAgentFinalizedValue = calculateTotal(finalizedAgentClientsArr, 'loanAmount');
    const agentPrecentPlanRealization = ((totalAgentFinalizedValue / AGENT_PLAN) * 100).toFixed(2); //eslint-disable-line
    const contributionToTeamPlan = ((totalAgentFinalizedValue / TEAM_PLAN) * 100).toFixed(2); //eslint-disable-line

    return {
      ...item,
      chanceClients: allAgentChanceClientsArr,
      finalized: finalizedAgentClientsArr,
      statistics: {
        totalAgentChancesValue: totalAgentChancesValue,
        totalAgentFinalizedValue: totalAgentFinalizedValue,
        agentPrecentPlanRealization: agentPrecentPlanRealization,
        contributionToTeamPlan: contributionToTeamPlan,
      },
    };
  });

  const totalAgentChancesValue = calculateTotal(
    loggedInAgentChanceClients,
    'requestedAmount',
  );
  const totalTeamChancesValue = calculateTotal(allChanceClients, 'requestedAmount');
  const totalFinalizedAgentThisMonth = calculateTotal(finalizedDataLoggedInAgent,'loanAmount',); // prettier-ignore
  const totalFinalizedTeamThisMonth = calculateTotal(finalizedDataTeamThisMonth,'loanAmount',); // prettier-ignore
  /* eslint-disable */
  const agentPrecentPlanRealization = (
    (totalFinalizedAgentThisMonth / AGENT_PLAN) *
    100 
  ).toFixed(2); // prettier-ignore
  const teamPrecentPlanRealization = (
    (totalFinalizedTeamThisMonth / TEAM_PLAN) *
    100 
  ).toFixed(2); 
 
  return (
    <StatisticsContext.Provider
      value={{
        loggedInAgentChanceClients,
        allChanceClients,
        finalizedDataLoggedInAgent,
        finalizedDataTeamThisMonth,
        totalAgentChancesValue,
        totalTeamChancesValue,
        totalFinalizedAgentThisMonth,
        totalFinalizedTeamThisMonth,
        agentPrecentPlanRealization,
        teamPrecentPlanRealization,
        combinedTeamArrCurrentMonth,
      }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};

export default StatisticsProvider;

export const useStatisticsContext = () => {
  const ctx = useContext(StatisticsContext);
  if (!ctx) {
    throw new Error('something is wrong wrap element in StatisticsProvider');
  }
  return ctx;
};
