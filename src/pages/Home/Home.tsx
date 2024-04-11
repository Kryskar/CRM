import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

import BoardBox from '../../components/BoardBox/BoardBox_Container/BoardBox';
import Navbar from '../../components/Navbar/Navbar_Container/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar_Container/Sidebar';
import TaskBoard from '../../components/TaskBoard/Taskboard_Container/TaskBoard';
import { BG_COLOR } from '../../constants/theme';
import { useCheckDbForUser } from '../../hooks/useCheckDbForClient';
import { useGetSession } from '../../hooks/useGetSession';
// import { useCheckDbForClient } from '../../hooks/useCheckDbForClient';

const Home = () => {
    const {decodedData} = useGetSession()

  const {syncDbData}=useCheckDbForUser();
  const { pathname } = useLocation();

   useEffect(()=>{
      syncDbData()
    },[decodedData]) //eslint-disable-line

  return (
    <Flex bgColor={BG_COLOR} direction={'column'} gap={'20px'} h={'100vh'} w={'100vw'}>
      <Box h='60px'>
        <Navbar />
      </Box>
      {pathname === '/' && (
        <Flex gap={'20px'} h={'90%'}>
          <Sidebar w='20%'/>
          <BoardBox w='60%' />
          <TaskBoard w='20%' />
        </Flex>
      )}
      <Outlet />
    </Flex>
  );
};

export default Home;
