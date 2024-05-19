// import React from 'react'

import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import ChatPage from "./pages/ChatPage"

const App = () => {
  return (
    <div className="app"> 
      <Routes>
        <Route path="/"  element={<Homepage />} />
        <Route path="/chats"  element={<ChatPage/>}/>
      </Routes>
    </div>
  )
}

export default App
