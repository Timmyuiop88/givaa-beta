
'use client'
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
 
  Hide,
  Wrap, WrapItem
} from "@chakra-ui/react";
import { IoHeartCircle } from "react-icons/io5";
import { RiCoinsFill } from "react-icons/ri";
import { LuClock3 } from "react-icons/lu";
import { BsCalendar2WeekFill } from "react-icons/bs";
export default function Campaign() {
  return (
 <Box
 w={'100%'}
 h={'auto'}
 bg={'#F9F9F9'}



 >
<Wrap
m={'auto'}
justify={['block','block','center','center']}


>
  <WrapItem
  data-aos="fade-up"
  data-aos-delay="50"
  >
  <Box minW={['100%','100%','280px','280px']} w={['100%','100%','280px','280px']} h='auto'
    
    display={"flex"}
    alignItems={"center"}
    padding={'20px'}
    >
     
    <Box
            w={"65px"}
            h={"65px"}
            bg={"#e7edec"}
            borderRadius={"50%"}
            color={"#478277"}
            fontSize={"33px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
           
          >
            <IoHeartCircle />
          </Box>
          <Box 
          ml={'20px'}
          >
            <Heading
            color={'#FFBE37'}
               fontSize={['20px','20px','36px','36px']}
            fontWeight={'700'}
            >28k+</Heading>

            <Text
            fontWeight={'400'}
            color={'#1D2C29'}
            fontSize={'15px'}
            >Success Campaigns</Text>
          </Box>


    </Box>
  </WrapItem>
  <WrapItem
  data-aos="fade-up"
  data-aos-delay="50"
  >

  <Box w={['100%','100%','280px','280px']} h='auto'
    
    display={"flex"}
    alignItems={"center"}
    padding={'20px'}
    >
      
      <Box
            w={"65px"}
            h={"65px"}
            bg={"#e7edec"}
            borderRadius={"50%"}
            color={"#478277"}
            fontSize={"33px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
           
          >
            <RiCoinsFill />
          </Box>
          <Box
          ml={'20px'} >
          <Heading
            color={'#FFBE37'}
               fontSize={['20px','20px','36px','36px']}
            fontWeight={'700'}
            >$124M</Heading>

            <Text
            fontWeight={'400'}
            color={'#1D2C29'}
            fontSize={'15px'}
            >Money Donated </Text>
          </Box>


    </Box>
  </WrapItem>
  <WrapItem
  data-aos="fade-up"
  data-aos-delay="50"
  >
    <Box w={['100%','100%','100%','100%']} h='auto'
              bg={''}
    display={"flex"}
    alignItems={"center"}
    padding={'20px'}
    
    
    >
    <Box
            w={"65px"}
            h={"65px"}
            bg={"#e7edec"} 
            borderRadius={"50%"}
            color={"#478277"}
            fontSize={"33px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
           
          >
            <LuClock3 />
          </Box>
          <Box
ml={'20px'}
          >
          <Heading
            color={'#FFBE37'}
               fontSize={['20px','20px','36px','36px']}
            fontWeight={'700'}
            >565+</Heading>

            <Text
            fontWeight={'400'}
            color={'#1D2C29'}
            fontSize={'15px'}
            > Active Campaigns </Text>
          </Box>
    </Box>
  </WrapItem>
  <WrapItem
  data-aos="fade-up"
  data-aos-delay="50"
  >
  <Box w={['100%','100%','280px','280px']} h='auto'
    
    display={"flex"}
    alignItems={"center"}
    padding={'20px'}
    >
     
     <Box
            w={"65px"}
            h={"65px"}
            bg={"#e7edec"}
            borderRadius={"50%"}
            color={"#478277"}
            fontSize={"33px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
           
          >
            <BsCalendar2WeekFill />
          </Box>
          <Box 
          ml={'20px'}
          >
          <Heading
            color={'#FFBE37'}
            fontSize={['20px','20px','36px','36px']}
            fontWeight={'700'}
            >1300+</Heading>

            <Text
            fontWeight={'400'}
            color={'#1D2C29'}
            fontSize={'15px'}
            >  Fundraising last month </Text>
          </Box>


    </Box>
  </WrapItem>
</Wrap>
  
 </Box>
  )
}
