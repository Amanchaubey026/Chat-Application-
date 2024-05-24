/* eslint-disable no-unused-vars */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function submitHandler() {
    setLoading(true);
    if( !email || !password ){
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

    try {
      const config = {
        headers:{
          "Content-Type":"application/json",
        }
      }
      const {data} = await axios.post("http://localhost:3000/api/user/login",{email,password},config);
      toast({
        title: 'Login Successful!',
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
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement w={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        w={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        isLoading={loading}
        variant={"solid"}
        colorScheme="red"
        w={"100%"}
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com"), setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
