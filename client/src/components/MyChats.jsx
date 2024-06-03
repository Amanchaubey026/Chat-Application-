// import React from 'react'

import { Box } from "@chakra-ui/react"
import { ChatState } from "../contexts/ChatProvider";

const MyChats = () => {
  const {selectedChat,setSelectedChat,user,chat, setChat} = ChatState();
  return (
    <Box color="white">
      My Chat
    </Box>
  )
}

export default MyChats
