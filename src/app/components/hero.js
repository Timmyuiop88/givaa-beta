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
  Center,
  Hide,
  chakra, shouldForwardProp
} from "@chakra-ui/react";
import Nav from "./nav";
import Image from 'next/image';
import {BsArrowUpRight} from "react-icons/bs";
import {RiExchangeFundsLine} from 'react-icons/ri'
import {FaChevronRight} from 'react-icons/fa6'


export default function Hero() {
  return (
 <Box 
 w={'100%'}
 h={'auto'}
 bg={"#fdfaf1"}
 pt={["0px", "0px", "30px", "30px"]}
 >
  
  <Nav/>

  <Stack
  direction={['column','column','row','row']}
  w={'100%'}
 maxW={'7xl'}
 h={'auto'}
 pt={'50px'}
 m={'auto'}
  >
    <Box

    w={['100%','100%','50%','50%']}
    h={'100%'}
    textAlign={['center','center','left','left']}
  pl={'15px'}
  pr={'15px'}
    >
<Box
mx={['auto','auto','0','0']}
maxW={'400px'}
h={'auto'}
w={'100%'}
mb={'30px'}
bg={'#e6e2d8'}
borderRadius={'50px'}
display={'flex'}
justifyContent={'space-between'}
p={1}
pr={5}
alignItems={'center'}
>
<Button
          
                h={"30px"}
                w={["60px"]}
                bg={"#FFBE37"}
                borderRadius={"105px"}
                color={"#fdfdfd"}
                fontWeight={'500'}
            
              >
              New
              </Button>
              <Text  
              alignItems={'center'}
              display={'flex'}
fontSize={["14px"]}
fontWeight={"400"}
lineHeight={["25px","25px","30px","30px"]}
fontStyle={"normal"}
color={"#232323"}
ml={'15px'}

  >
  We launched Givaa! See what's new</Text>
  <FaChevronRight/>
</Box>


            <Heading
              color={"#232323"}
              fontSize={["32px", "32px", "40px", "50px"]}
              fontWeight={"500"}
            
              
            >
              Let’s Help And Make People Smile By{" "}
              <Text as={"span"} color={"#FFBE37"}>
                Giving
              </Text>{" "}
              Of Yours
            </Heading>
            <Text
            
              fontSize={["15px","15px","20px","20px"]}
              fontWeight={"400"}
              lineHeight={["25px","25px","30px","30px"]}
              fontStyle={"normal"}
              color={"#696969"}
              mt={["20px", "20px", "33px", "33px"]}
             
            >
        Givaa is a digital platform for collecting donations to be distributed to people in need
            </Text>
            <Stack
            direction={['column','column','row','row']}
     
              px={'0px'}
              mt={["30px", "30px", "55px", "55px"]}
             
            >
              <Button
              m={['auto','auto','0','0']}
                h={"50px"}
                w={["250PX","200px","262px","262px"]}
                bg={"#FFBE37"}
                borderRadius={"105px"}
                color={"#fdfdfd"}
                fontWeight={'500'}
            
              >
                Start Fundraising
              </Button>
              <Button
     m={['auto','auto','0','0']}
                h={"50px"}
                w={["250px","200px","262px","262px"]}
                bg={"#fdfdfd"}
                borderRadius={"105px"}
                color={"#333"}
                border={'1px solid #C8C8C8'}
                leftIcon={ <svg width={20} h={20} class="w-3.5 h-3.5 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"></path></svg> }
                fontWeight={'500'}
              >
              Explore Campaigns
              </Button>
      
            </Stack>
            <Box
            w={'100%'}
            h={'auto'}
            px={'20px'}
            pt={'25px'}
            >
            
           
            </Box>

    </Box>

    <Box
    display={'flex'}
justifyContent={'center'}
     m={['auto','auto','auto','auto']}
    w={['100%','100%','50%','50%']}
    h={'auto'}
   pb={['14px','14px','30px','60px']}
    >
      <Image
      
     
      src="images/hero.svg"
      m={'auto'}
      width={'500'}
      height={'400'}
      alt="Hero image"
      />
   
  
  
  
</Box>

  </Stack>



 </Box>
  );
}
