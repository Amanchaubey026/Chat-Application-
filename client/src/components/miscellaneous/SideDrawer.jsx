/* eslint-disable no-unused-vars */
import { FaSearch } from "react-icons/fa";
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Image, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useToast } from "@chakra-ui/react";
import { useState } from "react";
import logo from '../../assets/logoChat.png'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from "../../contexts/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from 'axios'
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {setSelectedChat,user,chat, setChat} = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const logoutHandler = ()=>{
    localStorage.removeItem("userInfo");
    navigate('/');
  }

  const handleSearch = async()=>{
    if(!search){
      toast({
        title:"Please enter something inside the search",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top-left"
      })
    }
    try {
      setLoading(true);
      const config ={
        headers:{
          Authorization : `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get(`http://localhost:3000/api/user?search=${search}`,config);
      setLoading(false);
      setSearchResult(data)
    } catch (error) {
      toast({
        title:"error occured!",
        description:"failed to load search results",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom-left"
      })
    }
  }
  const accessChat = async(userId)=>{
    try {
      setLoadingChat(true);
      const config ={
        headers:{
          "Content-type":"application/json",
          Authorization : `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.post(`http://localhost:3000/api/chat`,{userId},config);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title:"error fetching the chat",
        description:error.message,
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom-left"
      })
    }
  }
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        w={"100%"}
        p={'5px 10px 5px 10px'}
        borderWidth={'5px'}
      >
        <Tooltip
          label="Search Users to chat with"
          hasArrow
          placement="bottom-end"
        >
          <Button variant={"ghost"} onClick={onOpen}>
            <FaSearch />
            <Text display={{ base: "none", md: "flex" }} px={"4"}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Box>
            <Image maxH={10} src={logo} alt="ConvoHub"/>
        </Box>
        <div>
            <Menu>
                <MenuButton p={1}>
                 <BellIcon fontSize={'2xl'} margin={1} />
                </MenuButton>
                {/* <MenuList></MenuList> */}
            </Menu>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                    <Avatar size={'sm'} cursor={'pointer'} name={user.name} src={user.picture}/>
                </MenuButton>
                <MenuList>
                    <ProfileModal user={user}>
                    <MenuItem>My Profile</MenuItem>
                    </ProfileModal>
                    <MenuDivider/> 
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerHeader borderBottom={'1px'}>Search Users</DrawerHeader>
        <DrawerBody>
          <Box display={'flex'} pb={'2'}>
            <Input
            placeholder="Search by name or email"
            mr={2}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
            <Button 
            onClick={handleSearch}
            >Go</Button>
          </Box>
          {
            loading?(
              <ChatLoading/>
            ):(
              searchResult?.map(user=>(
                <UserListItem
                key={user._id}
                user={user}
                handleFunction = {()=>accessChat(user._id)}                
                />
              ))
            )
          }
        </DrawerBody>
      </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
