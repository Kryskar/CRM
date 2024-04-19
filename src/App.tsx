import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

import { ROUTES } from './constants/routes';
import SessionProvider from './contexts/SessionProvider';
import StatisticsProvider from './contexts/StatisticsProvider';
const Home = React.lazy(() => import('./pages/Home/Home'));
const Clients = React.lazy(() => import('./pages/Clients/Clients'));
const Calendar = React.lazy(() => import('./pages/Calendar/Calendar'));
const Chances = React.lazy(() => import('./pages/Chances/Chances'));
const Finalized = React.lazy(() => import('./pages/Finalized/Finalized'));
const Analytics = React.lazy(() => import('./pages/Analytics/Analytics'));
const AddClient = React.lazy(() => import('./pages/Add_Client/AddClient'));

const App = () => {

  return (
    <>
    <SessionProvider>
      <StatisticsProvider>
      <Suspense fallback={<Spinner color='red.500' size={'xl'} />}>
        <Routes>
          <Route element={<Home />} path={ROUTES.home}>
            <Route element={<Clients />} path={ROUTES.clients} />
            <Route element={<Calendar />} path={ROUTES.calendar} />
            <Route element={<Chances />} path={ROUTES.chances} />
            <Route element={<Finalized />} path={ROUTES.finalized} />
            <Route element={<Analytics />} path={ROUTES.analytics} />
            <Route element={<AddClient/>} path={ROUTES.addClient}/>
          </Route>
        </Routes>
      </Suspense>
      </StatisticsProvider>
      </SessionProvider>
    </>
  );
};

export default App;
