'use client';
import {
    Avatar,
    AvatarBadge,
    AvatarGroup,
    Box,
    Stack,
    Text,
    Heading,
    Button,
    Flex,
    Center,
    Hide,
    Wrap,
    WrapItem,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    InputLeftElement,
    SimpleGrid,
    ButtonGroup,
    Divider,
    AbsoluteCenter,
    VStack,
    Show,
  } from "@chakra-ui/react";
  import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { FcGoogle } from "react-icons/fc";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react";
export default function Signup (){
    const supabase = createClientComponentClient();
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    async function signUp() {
        const { error } = await supabase.auth.signUp({
            email,
            password,
          // redirectTo: `${window.location.origin}/auth/callback`,
        });
    
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg('Success! Please check your email for further instructions.');
        }
      }
    

    const initialState = {
        email: "",
        password: "",
      };
      const [form, setForm] = useState(initialState);
    
      const { email, password } = form;
    
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      return (
        <>
          <Box w={"100%"} h={"100vh"} >
            <Stack w={"100%"} spacing={"0"} h={"100%"} direction={["column","column","row","row"]}>
              <Center  h={"100%"} w={["100%","100%","50%","50%"]} bg={"white"}>
                <Box  p={10} w={["full","410px","410px","410px"]} h={"610px"}>
                  <Heading
                    fontFamily={"DM sans"}
                    fontSize={"36px"}
                    fontWeight={"700"}
                    letterSpacing={"-0.72px"}
                    color={"#C66D3E"}
                  >
                    Weclome Back
                  </Heading>
                  <Text
                    fontFamily={"DM sans"}
                    fontSize={"16px"}
                    fontWeight={"400"}
                    letterSpacing={"-0.72px"}
                  >
                    Enter your email and password to sign in!
                  </Text>
                  <Button
                  fontFamily={'DM Sans'} 
                    my={"30px"}
                    border={"1px solid #DAD7D6"}
                    h={"50px"}
                    w={"full"}
                    borderRadius={"16px"}
                    color={"#2D3748"}
                    bg={"#F4F7FE"}
                    leftIcon={<FcGoogle />}
                  >
                    Sign up with Google
                  </Button>
    
                  <Box position="relative" mb={"50px"}>
                    <Divider />
                    <AbsoluteCenter
                      bg={"white"}
                      fontFamily={"DM sans"}
                      fontSize={"14px"}
                      fontWeight={"500"}
                      letterSpacing={"-0.72px"}
                      color={"#ECE0DA"}
                      px="4"
                    >
                      or
                    </AbsoluteCenter>
                  </Box>
    
                  <VStack spacing={"10"} justifyContent={"flex-end"}>
                  <Box w={"full"} display={"block"}>
                    <Text
                    color={'#2D3748'}
                    fontSize={'14px'}
                    fontFamily={'DM Sans'}
                    lineHeight={'100%'}
                    fontWeight={'600'}
                    letterSpacing={'-0.28px'}
                    mb={'10px'}
                    >
                    Email*
                    </Text>
                    <InputGroup pl={0}>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize={"1.2em"}
                      />
                      <Input
                       name="email"
                       value={email}
                   onChange={handleChange}
                        type="email"
                        borderRadius={"16px"}
                        h={"50px"}
                        pl={"24px"}
                        placeholder="mail@simmmple.com"
                      />
                      <InputRightElement>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                            stroke="#DAD7D6"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                            stroke="#DAD7D6"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </InputRightElement>
                    </InputGroup>
                    </Box>
                    <Box w={"full"} display={"block"}>
                    <Text
                    color={'#2D3748'}
                    fontSize={'14px'}
                    fontFamily={'DM Sans'}
                    lineHeight={'100%'}
                    fontWeight={'600'}
                    letterSpacing={'-0.28px'}
                    mb={'10px'}
                    >
                Password*
                    </Text>
                      <InputGroup display={"block"} pl={0}>
                        <Input
                        name="password"
                            value={password}
                          onChange={handleChange}
                          type="password"
                          borderRadius={"16px"}
                          h={"50px"}
                          pl={"24px"}
                          placeholder="Min. 8 characters"
                        />
                        <InputRightElement>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_431_4090)">
                              <path
                                d="M9.99998 5.41667C13.1583 5.41667 15.975 7.19167 17.35 10C15.975 12.8083 13.1666 14.5833 9.99998 14.5833C6.83331 14.5833 4.02498 12.8083 2.64998 10C4.02498 7.19167 6.84165 5.41667 9.99998 5.41667ZM9.99998 3.75C5.83331 3.75 2.27498 6.34167 0.833313 10C2.27498 13.6583 5.83331 16.25 9.99998 16.25C14.1666 16.25 17.725 13.6583 19.1666 10C17.725 6.34167 14.1666 3.75 9.99998 3.75ZM9.99998 7.91667C11.15 7.91667 12.0833 8.85 12.0833 10C12.0833 11.15 11.15 12.0833 9.99998 12.0833C8.84998 12.0833 7.91665 11.15 7.91665 10C7.91665 8.85 8.84998 7.91667 9.99998 7.91667ZM9.99998 6.25C7.93331 6.25 6.24998 7.93333 6.24998 10C6.24998 12.0667 7.93331 13.75 9.99998 13.75C12.0666 13.75 13.75 12.0667 13.75 10C13.75 7.93333 12.0666 6.25 9.99998 6.25Z"
                                fill="#DAD7D6"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_431_4090">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </InputRightElement>
                      </InputGroup>

                    </Box>
    {errorMsg && <Alert status='error'>
    <AlertIcon />
    {errorMsg}
  </Alert>}
      {successMsg &&  <Alert status='success'>
    <AlertIcon />
    {successMsg}
  </Alert>}
                    <Button
                 fontWeight={'700'}
                    border={"1px solid #DAD7D6"}
                    h={"50px"}
                    w={"full"}
                    borderRadius={"16px"}
                    color={"#fff"}
                    bg={"#F68A50"}
                    fontFamily={'DM Sans'}
                    fontSize={'14px'}
                    onClick={signUp}
                  >
         Sign up
                  </Button>
                  </VStack>
                </Box>
              </Center>
              <Show above="md">
              <Center
                backgroundColor={"#e8e8ea"}
                opacity={1}
                backgroundImage={
                  "repeating-radial-gradient( circle at 0 0, transparent 0, #e8e8ea 23px ), repeating-linear-gradient( #F68A5055, #F68A50 )"
                }
                h={"100%"}
                w={["100%","100%","50%","50%"]}
              >
                <Heading color={"white"} fontSize={"75px"}>
                  GIVAA
                </Heading>
              </Center>
              </Show>
            
            </Stack>
          </Box>
        </>
      );
}