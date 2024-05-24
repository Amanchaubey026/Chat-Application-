/* eslint-disable no-unused-vars */
// import React from 'react'
import { useToast } from '@chakra-ui/react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  function postDetails(pics){
    setLoading(true);
    if(pics === undefined ){
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom"
      })
      setLoading(false)
      return;
    }
    if(pics.type ==="image/jpeg" || pics.type ==="image/png"){
      const data = new FormData();
      data.append("file",pics);
      data.append("upload_preset","Chat-Application");
      data.append("cloud_name","djgrj9kqw");
      fetch("https://api.cloudinary.com/v1_1/djgrj9kqw/image/upload",{
        method:'post',
        body:data
      }).then((res)=>res.json())
        .then((data)=>{
          setPicture(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        }).catch((error)=>{
          console.log(error);
          setLoading(false);
        })
    }else{
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom"
      })
      setLoading(false);
      return;
    }
  }
  async function submitHandler(){
    setLoading(true);
    if(!name || !email || !password || !confirmPassword){
      toast({
        title: 'Please Fill all the Fields!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom"
      })
      setLoading(false)
      return;
    }
    if(password !== confirmPassword){
      toast({
        title: 'Password does not match!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom"
      })
      setLoading(false)
      return;
    }

    try {
      const config = {
        headers:{
          "Content-Type":"application/json",
        }
      }
      const {data} = await axios.post("http://localhost:3000/api/user",{name,email,password,picture},config);
      toast({
        title: 'Registration Successful!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:"bottom"
      })
      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false)
      navigate("/chats")
    } catch (error) {
      console.log(error);
      toast({
        title: 'error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:"bottom"
      })
      setLoading(false)
    }
  }

  return (
    <VStack spacing={"5px"} color={"black"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement w={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement w={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="picture" isRequired>
        <FormLabel>Upload your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
      </FormControl>
      <Button colorScheme="blue" w={'100%'} style={{marginTop:15} }onClick={submitHandler} isLoading={loading}>SignUp</Button>
    </VStack>
  );
};

export default SignUp;
