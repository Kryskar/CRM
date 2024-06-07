import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import BigSpinner from './components/Misc/BigSpinner';
import { ROUTES } from './constants/routes';
import OperationsProvider from './contexts/OperationsProvider';
import SessionProvider from './contexts/SessionProvider';
import StatisticsProvider from './contexts/StatisticsProvider';
import TourProvider from './contexts/TourProvider';
const Home = React.lazy(() => import('./pages/Home/Home'));
const Clients = React.lazy(() => import('./pages/Clients/Clients'));
const Calendar = React.lazy(() => import('./pages/Calendar/Calendar'));
const Finalized = React.lazy(() => import('./pages/Finalized/Finalized'));
const Analytics = React.lazy(() => import('./pages/Analytics/Analytics'));
const AddClient = React.lazy(() => import('./pages/Add_Client/AddClient'));

const App = () => {
  return (
    <>
      <SessionProvider>
        <OperationsProvider>
        <TourProvider>
        <StatisticsProvider>
          <Suspense fallback={<BigSpinner />}>
            <Routes>
              <Route element={<Home />} path={ROUTES.home}>
                <Route element={<Clients />} path={ROUTES.clients} />
                <Route element={<Calendar />} path={ROUTES.calendar} />
                <Route element={<Finalized />} path={ROUTES.finalized} />
                <Route element={<Analytics />} path={ROUTES.analytics} />
                <Route element={<AddClient />} path={ROUTES.addClient} />
              </Route>
            </Routes>
          </Suspense>
        </StatisticsProvider>
        </TourProvider>
        </OperationsProvider>
      </SessionProvider>
    </>
  );
};

export default App;
