import React from "react"
import { Route, Routes } from "react-router-dom"
const Home = React.lazy(()=> import("./pages/Home/Home"))

const App = () => {
  const ROUTES = {
    home:"/",
  }
  return (
    <>
     <Routes>
      <Route path={ROUTES.home} element={<Home/>}/>
     </Routes>
    </>
  )
}

export default App
