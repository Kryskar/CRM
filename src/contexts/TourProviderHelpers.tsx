import { Step } from 'react-joyride';
import { SearchIcon } from '@chakra-ui/icons';
import { Button, chakra, Flex, Heading, Text } from '@chakra-ui/react';

import { LogosGoogleCalendar } from '../components/Misc/LogosGoogleCalendar';

const handleRedirect = () => {
  window.open('https://calendar.google.com/calendar/u/2/r/month', '_blank', 'noopener,noreferrer');
};
/* eslint-disable */
export const steps: Step[] = [
  {
    target: '.step1',
    content: (
      <Flex flexDirection='column' gap='5px'>
        <Heading size='h4'>Welcome to the CRM application tour!</Heading>
        <Text>
          In the following steps, you will learn more about its features and functionalities.
        </Text>
      </Flex>
    ),
    disableBeacon: true,
  },
  {
    target: '.step2',
    content: (
      <Text>
        The homepage consists of three components:
        <br />
        <br />- <b>Quick Statistics:</b> Displays recent agent and team statistics as well as the
        latest sales opportunities.
        <br />- <b>Changelog:</b> Shows status updates of clients.
        <br />- <b>Mini Calendar:</b> Displays the agent's recent tasks.
      </Text>
    ),
  },
  {
    target: '.step3',
    content: (
      <Text>To begin utilizing the application, we need to add a client. Let’s proceed!</Text>
    ),
  },
  {
    target: '.step4',
    content: (
      <Text>
        This is the client addition form. Click <chakra.span fontWeight={500}>"Next"</chakra.span>{' '}
        to auto-fill the form with generated client data.
      </Text>
    ),
    placement: 'center',
  },
  {
    target: '.step5',
    content: (
      <Text>
        Test data has been entered. Click <chakra.span fontWeight={500}>"Next"</chakra.span> to
        submit and add the client to the database.
      </Text>
    ),
  },
  {
    target: '.step6',
    content: (
      <Text>
        The client has been added to the database. We will now navigate to the{' '}
        <chakra.span fontWeight={500}>Clients</chakra.span> tab.
      </Text>
    ),
  },
  {
    target: '.step7',
    content: (
      <Text>
        We are now on the <chakra.span fontWeight={500}>Clients</chakra.span> tab.
      </Text>
    ),
    placement: 'center',
  },
  {
    target: '.step8',
    content: (
      <Text>
        This is the Clients table where all clients are listed. By default, every client is marked
        as{' '}
        <chakra.span color='analyticsBlue' fontWeight={500}>
          "Call Client"
        </chakra.span>{' '}
        because they are the highest priority. Agent task is to contact the client and update their
        status accordingly.
      </Text>
    ),
  },
  {
    target: '.step9',
    content: <Text>Click to change the client's status.</Text>,
  },
  {
    target: '.step10',
    content: <Text>Step 10.</Text>,
  },
  {
    target: '.step11',
    content: <Text>This is the modal to change the client's status.</Text>,
  },
  {
    target: '.step12',
    content: (
      <Text>
        After speaking with the client, the agent can choose the status{' '}
        <chakra.span color='analyticsGreen' fontWeight={500}>
          "Chance"
        </chakra.span>{' '}
        or{' '}
        <chakra.span color='analyticsRed' fontWeight={500}>
          "Not Doable"
        </chakra.span>
        .
        <br /> For the tour, we select the{' '}
        <chakra.span color='analyticsGreen' fontWeight={500}>
          "Chance"
        </chakra.span>{' '}
        checkbox
      </Text>
    ),
  },
  {
    target: '.step13',
    content: (
      <Text>
        The form has been completed, and an appropriate{' '}
        <chakra.span fontWeight={500}>status</chakra.span> has been chosen from the list.
        Additionally, the agent needs to select a{' '}
        <chakra.span fontWeight={500}>date for the next contact</chakra.span> and leave a{' '}
        <chakra.span fontWeight={500}>comment</chakra.span>.
      </Text>
    ),
  },
  {
    target: '.step14',
    content: (
      <Text>
        <chakra.span fontWeight={500}>Proceed</chakra.span> to change the status.
      </Text>
    ),
  },
  {
    target: '.step15',
    content: (
      <Text>
        Now our client is in the{' '}
        <chakra.span color='analyticsGreen' fontWeight={500}>
          "Your chances"
        </chakra.span>{' '}
        tab. Let’s proceed to the next step.
      </Text>
    ),
  },
  {
    target: '.step16',
    content: <Text>From here, we can further process our client.</Text>,
    placement: 'center',
  },
  {
    target: '.step17',
    content: (
      <Text>
        Every status change creates or modifies a calendar event. These events can be viewed in the{' '}
        <chakra.span fontWeight={500}>Calendar</chakra.span> tab.
      </Text>
    ),
  },
  {
    target: '.step18',
    content: (
      <Text textAlign={'center'}>
        This is our <chakra.span fontWeight={500}>Calendar</chakra.span> component, fully integrated
        with{' '}
        <chakra.span fontWeight={500}>
          <Flex alignItems={'center'} gap='5px' justifyContent={'center'} pb='10px'>
            <LogosGoogleCalendar /> Google Calendar
          </Flex>
        </chakra.span>
        Agent can <chakra.span fontWeight={500}>add</chakra.span>,{' '}
        <chakra.span fontWeight={500}>edit</chakra.span>, or{' '}
        <chakra.span fontWeight={500}>delete</chakra.span> events, and changes will be reflected.
        <chakra.span>
          <Flex
            alignItems={'center'}
            flexDirection={'column'}
            gap='5px'
            justifyContent={'center'}
            mt='20px'
          >
            <Text>you can check by yourself:</Text>
            <Button
              alignItems={'center'}
              borderRadius='md'
              border='1px'
              cursor={'pointer'}
              gap='5px'
              justifyContent={'center'}
              p='10px'
              onClick={handleRedirect}
            >
              <LogosGoogleCalendar /> <Text fontWeight={500}>Google Calendar</Text>
            </Button>
          </Flex>
        </chakra.span>
      </Text>
    ),
    placement: 'center',
  },
  {
    target: '.step19',
    content: <Text>Missing step.</Text>,
  },
  {
    target: '.step20',
    content: <Text>Let’s try to edit an event.</Text>,
  },
  {
    target: '.step21',
    content: <Text>Let’s change the comment and date.</Text>,
  },
  {
    target: '.step22',
    content: <Text>Let’s confirm the changes.</Text>,
  },
  {
    target: '.step23',
    content: (
      <Text>
        Our event has been edited. We can delete and add events in a similar manner. Changes are
        also reflected on the taskboard on the homepage.
      </Text>
    ),
  },
  {
    target: '.step24',
    content: (
      <Text>
        Let’s return to the <chakra.span fontWeight={500}>Clients</chakra.span> tab. When a deal
        with a client is successfully completed, the agent should report this success. To do this,
        the agent should click <chakra.span fontWeight={500}>"Change Status"</chakra.span>.
      </Text>
    ),
    placement: 'center',
  },
  {
    target: '.step25',
    content: <Text>Missed step.</Text>,
  },
  {
    target: '.step26',
    content: (
      <Text>
        To finalize processing the client, the agent should select the{' '}
        <chakra.span color='analyticsGreen' fontWeight={500}>
          "Chance"
        </chakra.span>{' '}
        checkbox, then choose <chakra.span fontWeight={500}>"success"</chakra.span> in the status
        field.
      </Text>
    ),
  },
  {
    target: '.step27',
    content: (
      <Text>
        Let’s confirm by pressing the <chakra.span fontWeight={500}>"Proceed"</chakra.span> button.
      </Text>
    ),
  },
  {
    target: '.step28',
    content: (
      <Text>
        After changing to the final <chakra.span fontWeight={500}>"success"</chakra.span> status,
        the <chakra.span fontWeight={500}>"Report Success"</chakra.span> button appears.
      </Text>
    ),
  },
  {
    target: '.step29',
    content: <Text>Missed step.</Text>,
  },
  {
    target: '.step30',
    content: <Text>Fill the form with the required data.</Text>,
  },
  {
    target: '.step31',
    content: (
      <Text>
        Click <chakra.span fontWeight={500}>"Submit"</chakra.span> to finish the report.
      </Text>
    ),
  },
  {
    target: '.step32',
    content: (
      <Text>
        After submitting the report, the client is moved to the{' '}
        <chakra.span fontWeight={500}>"Finalized"</chakra.span> tab, where all completed clients are
        listed.
      </Text>
    ),
    placement: 'center',
  },
  {
    target: '.step33',
    content: (
      <Text>
        On the <chakra.span fontWeight={500}>"Finalized"</chakra.span> tab and the{' '}
        <chakra.span fontWeight={500}>"Clients"</chakra.span> tab, we have a search bar that allows
        us to search for clients. <br />
        <br />
        By clicking the magnifying glass icon{' '}
        <chakra.span>
          <SearchIcon />
        </chakra.span>
        , we can change the property by which we want to search. <br />
        There is also a select option that allows us to filter successes by agent.
      </Text>
    ),
  },
  {
    target: '.step34',
    content: <Text>Let’s go to the last tab.</Text>,
  },
  {
    target: '.step35',
    content: (
      <Text>
        The last tab to visit is the <chakra.span fontWeight={500}>"Analytics"</chakra.span> tab.
      </Text>
    ),
    placement: 'center',
  },
  {
    target: '.step36',
    content: (
      <Text>
        The first part of the <chakra.span fontWeight={500}>"Analytics"</chakra.span> page displays
        team statistics where agents and team leaders can compare performance to motivate each
        other.
      </Text>
    ),
  },
  {
    target: '.step37',
    content: (
      <Text>
        The next section is a pie chart showing the team's success volume, categorized by bank. The
        select option in this section allows choosing a single agent or the entire team.
      </Text>
    ),
  },
  {
    target: '.step38',
    content: (
      <Text>
        The final section is team rankings. The select option allows agents to change the property
        used for comparison.
      </Text>
    ),
  },
  {
    target: '.step39',
    content: <Text>Thank you for taking the tour. Explore many more features on your own.</Text>,
    placement: 'center',
  },
];
