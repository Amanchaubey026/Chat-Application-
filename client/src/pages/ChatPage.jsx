// import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
const ChatPage = () => {
    const [chatData,setChatData] = useState([]);
    const fetchChats = async()=>{
        const {data} = await axios.get('http://localhost:3000/api/chat');
        console.log(data);
        setChatData(data)
    }
    useEffect(()=>{
        fetchChats()
    },[])
  return (
    <div>
     {
        chatData.length>0 && chatData.map((chat)=>(
            <p key={chat._id}>
                {chat.chatName}
            </p>
        ))
     }
    </div>
  )
}

export default ChatPage
