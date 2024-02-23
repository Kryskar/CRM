import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

import { useGetSession } from './hooks/useGetSession';
const Home = React.lazy(() => import('./pages/Home/Home'));
const Clients = React.lazy(() => import('./pages/Clients/Clients'));
const Calendar = React.lazy(() => import('./pages/Calendar/Calendar'));
const Chances = React.lazy(() => import('./pages/Chances/Chances'));
const Finalized = React.lazy(() => import('./pages/Finalized/Finalized'));
const Analitics = React.lazy(() => import('./pages/Analitics/Analitics'));
const LogIn = React.lazy(() => import('./pages/LogIn/LogIn'));

const App = () => {
const {session} = useGetSession()

  const ROUTES = {
    analitics: '/analitics',
    calendar: '/calendar',
    chances: '/chances',
    clients: '/clients',
    finalized: '/finalized',
    home: '/',
    login:'/login'
  };

  if (!session) return (<LogIn/>)
  
  return (
    <>
      <Suspense fallback={<Spinner color='red.500' size={'xl'} />}>
        <Routes>
          <Route element={<Home />} path={ROUTES.home}>
            <Route element={<Clients />} path={ROUTES.clients} />
            <Route element={<Calendar />} path={ROUTES.calendar} />
            <Route element={<Chances />} path={ROUTES.chances} />
            <Route element={<Finalized />} path={ROUTES.finalized} />
            <Route element={<Analitics />} path={ROUTES.analitics} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
