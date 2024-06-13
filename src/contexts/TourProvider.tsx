import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS } from 'react-joyride';
import { useNavigate } from 'react-router-dom';

import {
  randomGeneratedNumber,
  randomGuideTourClientData,
  TOUR_STATUS_KEY,
} from '../constants/constants';
import { ROUTES } from '../constants/routes';

import { useSessionContext } from './SessionProvider';
import { getSteps } from './TourProviderHelpers';

interface ITourContext {
  modalOpen: boolean;
  randomAddClientData: any; //eslint-disable-line
  randomNum: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRandomAddClientData: React.Dispatch<
    React.SetStateAction<{
      address: string;
      name: string;
      phoneNumber: string;
      requestedAmount: number;
      surname: string;
    }>
  >;
  setRandomNum: React.Dispatch<React.SetStateAction<string>>;
  setRun: React.Dispatch<React.SetStateAction<boolean>>;
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;
  startTour: () => void;
  stepIndex: number;
}

const TourContext = createContext<ITourContext | null>(null);

const TourProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const {email} = useSessionContext()
  const steps = getSteps(email)
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [randomNum, setRandomNum] = useState(randomGeneratedNumber);
  const [randomAddClientData, setRandomAddClientData] = useState(randomGuideTourClientData);
  

  /* eslint-disable */

  const handleJoyrideCallback = (data: CallBackProps & { status: any }) => {
    const { action, index, status, type } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      localStorage.setItem(TOUR_STATUS_KEY, 'completed');
      setRun(false);
      setStepIndex(0);
    } else if (action === ACTIONS.CLOSE) {
      setRun(false);
      setStepIndex(0);
    } else if (action === ACTIONS.PREV) {
      setStepIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (type === EVENTS.STEP_AFTER) {
      switch (index) {
        case 2:
          navigate(ROUTES.addClient);
          break;
        case 5:
          navigate(ROUTES.clients);
          break;
        case 9:
          setRun(false);
          break;
        case 16:
          navigate(ROUTES.calendar);
          break;
        case 22:
          navigate(ROUTES.clients);
          break;
        case 33:
          navigate(ROUTES.analytics);
          break;
        default:
          break;
      }
      setStepIndex((prevIndex) => prevIndex + 1);
    }
  };

  const startTour = () => {
    setRun(true);
  };

  const getRightStepIndexForCounter = (index: number) => {
    //because of missed steps in step array
    if (index < 9) {
      return index + 1;
    } else if (index >= 9 && index <= 18) {
      return index;
    } else if (index > 18 && index <= 24) {
      return index - 1;
    } else if (index > 24 && index <= 28) {
      return index - 2;
    } else if (index > 28) {
      return index - 3;
    }
  };

  useEffect(() => {
    if (run) {
      const disableOutsideClick = (e: MouseEvent) => {
        const tooltip = document.querySelector('.react-joyride__tooltip');
        if (tooltip && !tooltip.contains(e.target as Node)) {
          e.stopPropagation();
          e.preventDefault();
        }
      };
      document.addEventListener('click', disableOutsideClick, true);

      return () => {
        document.removeEventListener('click', disableOutsideClick, true);
      };
    }
  }, [run]);

  return (
    <TourContext.Provider
      value={{
        startTour,
        stepIndex,
        setStepIndex,
        setRun,
        setModalOpen,
        modalOpen,
        randomNum,
        randomAddClientData,
        setRandomNum,
        setRandomAddClientData,
      }}
    >
      {children}
      <Joyride
        hideBackButton
        callback={handleJoyrideCallback}
        continuous={true}
        run={run}
        showSkipButton={true}
        stepIndex={stepIndex}
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
        locale={{
          next: `Next Step (${getRightStepIndexForCounter(stepIndex)}/${steps.length - 4})`,
          last: `Last (${stepIndex - 3}/${steps.length - 4})`,
        }}
      />
    </TourContext.Provider>
  );
};

export default TourProvider;

export const useTourContext = () => {
  const ctx = useContext(TourContext);
  if (!ctx) {
    throw new Error('Something is wrong, make sure to wrap the element in TourProvider');
  }
  return ctx;
};
