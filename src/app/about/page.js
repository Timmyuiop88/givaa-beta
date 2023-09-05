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
    Wrap,
    WrapItem,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    InputLeftElement,
    SimpleGrid,
     ButtonGroup
  } from "@chakra-ui/react";
import Nav from "../components/nav";
  import Partners from "../components/partners";
import Footer from "../components/footer";

export default function About(){
    return(
        <>
            <Box
        w={'100%'}
       h={'auto'}
       bg={'#fdfaf1'}
       pt={["0px", "0px", "30px", "30px"]}
        >
            <Nav/>
            <Text
            mt={'50px'}
            fontSize={['14px','14px','16px','16px']}
            fontWeight={'500'}
            color={'#696969'}
            textAlign={'center'}
            >
            HOME - ABOUT
            </Text>
            <Heading
            fontWeight={'500'}
             pt={['20px','20px','50px','50px']}
            m={'auto'} maxW={'1000px'} w={'90%'}
            textAlign={'center'}
            lineHeight={'normal'}
            fontSize={['20px','20px','48px','48px']}
            color={'#232323'}
            >
          Always Give Without Remembering And Always Receive Without Forgetting
            </Heading>
            <Text
            w='80%'
            maxW={'900px'}
            m={'auto'}
            mt={['20px','20px','50px','50px']}
            fontSize={['12px','12px','14px','14px']}
            fontWeight={'500'}
            color={'#696969'}
            textAlign={'center'}
            pb={['20px','20px','100px','100px']}
            >
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis pellentesque cras interdum ornare feugiat eget feugiat. Nunc, urna vitae pellentesque risus, ut volutpat eget libero vel.
            </Text>
            <Box
            w={'100%'}
            h={'auto'}
            bg={'white'}
            >

<Stack
  direction={['column','column','row','row']}
  w={'100%'}
 maxW={'7xl'}
 h={'auto'}
 pt={'50px'}
 m={'auto'}
 pb={'100px'}
  >


    <Box
    
    w={['100%','100%','50%','50%']}
    h={'auto'}
    
   direction={'column'}
    >
         
      <Image src="images/about.png"
  
      m={'auto'}
      w={['300px','300px','500px','500px']}/>


</Box>

<Box
   
    w={['100%','100%','50%','50%']}
    h={'100%'}
    textAlign={['center','center','left','left']}
  pl={10}
  pr={10}
    >



            <Heading
              color={"#232323"}
              fontSize={["32px", "32px", "40px", "50px"]}
              fontWeight={"500"}
            >
             There Is No Exercise Better For The Heart Than Reaching Down And Lifting People Up
            </Heading>
          
            <Box
              mt={["30px", "30px", "55px", "55px"]}
            
              justifyContent={["center", "center", "left", "left"]}
              
            >
             <Box
             w={'100%'}
             h={'auto'}
         
     pb={'60px'}
             display={'flex'}
             
             >

                <Center
                h={'50px'}
                w={'50px'}
                bg={'#FFBE37'}
                borderRadius={'10px'}
                >
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
  <path d="M13.922 18C13.922 19.0443 14.3368 20.0458 15.0752 20.7842C15.8136 21.5227 16.8152 21.9375 17.8595 21.9375C18.9037 21.9375 19.9053 21.5227 20.6437 20.7842C21.3821 20.0458 21.797 19.0443 21.797 18C21.797 16.9557 21.3821 15.9542 20.6437 15.2158C19.9053 14.4773 18.9037 14.0625 17.8595 14.0625C16.8152 14.0625 15.8136 14.4773 15.0752 15.2158C14.3368 15.9542 13.922 16.9557 13.922 18ZM33.1243 17.093C29.7915 10.0723 24.7536 6.53906 18.0001 6.53906C11.243 6.53906 6.20867 10.0723 2.87586 17.0965C2.74218 17.3796 2.67285 17.6887 2.67285 18.0018C2.67285 18.3148 2.74218 18.624 2.87586 18.907C6.20867 25.9277 11.2466 29.4609 18.0001 29.4609C24.7571 29.4609 29.7915 25.9277 33.1243 18.9035C33.395 18.334 33.395 17.673 33.1243 17.093ZM17.8595 24.1875C14.4423 24.1875 11.672 21.4172 11.672 18C11.672 14.5828 14.4423 11.8125 17.8595 11.8125C21.2766 11.8125 24.047 14.5828 24.047 18C24.047 21.4172 21.2766 24.1875 17.8595 24.1875Z" fill="#FDFDFD"/>
</svg>
                </Center>
                <Box
                h={'auto'}
                w={'100%'}
         
                >
                    <Heading
                    pl={'20px'}
                    fontSize={'36px'}
                    fontWeight={'500'}
                    color={'#232323'}
                    textAlign={'left'}
                    
                    >
                    Vision
                    </Heading>
<Text
pl={'20px'}
 textAlign={'left'}
 fontSize={'14px'}
 fontWeight={'400'}
 lineHeight={'24px'}
>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis pellentesque cras interdum ornare feugiat eget feugiat. Nunc, urna vitae pellentesque risus, ut volutpat eget libero vel. 
</Text>
                </Box>

             </Box>
             <Box
             w={'100%'}
             h={'auto'}
             
             display={'flex'}
             
             >

                <Center
                h={'50px'}
                w={'50px'}
                bg={'#FFBE37'}
                borderRadius={'10px'}
                >
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
  <path d="M18 9C13.0365 9 9 13.0365 9 18C9 22.9635 13.0365 27 18 27C22.9635 27 27 22.9635 27 18C27 13.0365 22.9635 9 18 9ZM18 24C14.691 24 12 21.309 12 18C12 14.691 14.691 12 18 12C21.309 12 24 14.691 24 18C24 21.309 21.309 24 18 24Z" fill="#FDFDFD"/>
  <path d="M18 3C9.8685 3 3 9.8685 3 18C3 26.1315 9.8685 33 18 33C26.1315 33 33 26.1315 33 18C33 9.8685 26.1315 3 18 3ZM18 30C11.4945 30 6 24.5055 6 18C6 11.4945 11.4945 6 18 6C24.5055 6 30 11.4945 30 18C30 24.5055 24.5055 30 18 30Z" fill="#FDFDFD"/>
  <path d="M18 15C16.3785 15 15 16.3785 15 18C15 19.6215 16.3785 21 18 21C19.6215 21 21 19.6215 21 18C21 16.3785 19.6215 15 18 15Z" fill="#FDFDFD"/>
</svg>
                </Center>
                <Box
                h={'auto'}
                w={'100%'}
         
                >
                    <Heading
                    pl={'20px'}
                    fontSize={'36px'}
                    fontWeight={'500'}
                    color={'#232323'}
                    textAlign={'left'}
                    
                    >
                    Mission
                    </Heading>
<Text
pl={'20px'}
 textAlign={'left'}
 fontSize={'14px'}
 fontWeight={'400'}
 lineHeight={'24px'}
>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis pellentesque cras interdum ornare feugiat eget feugiat. Nunc, urna vitae pellentesque risus, ut volutpat eget libero vel. 
</Text>
                </Box>

             </Box>

             
            </Box>

    </Box>

  </Stack>
            </Box>




            <Box
            w={'100%'}
            h={'auto'}
            bg={'#FFBE37'}
            >

<Stack
  direction={['column','column','row','row']}
  w={'100%'}
 maxW={'7xl'}
 h={'auto'}
 pt={'50px'}
 m={'auto'}
 pb={'100px'}
  >


    
<Box
   
    w={['100%','100%','50%','50%']}
    h={'100%'}
    textAlign={['center','center','left','left']}
  pl={10}
  pr={10}
  color={'#FDFDFD'}
    >



            <Heading
               color={'#FDFDFD'}
              fontSize={["32px", "32px", "40px", "50px"]}
              fontWeight={"500"}
            >
            Why You Need To Choose Us?
            </Heading>
          
            <Box
              mt={["30px", "30px", "55px", "55px"]}
            
              justifyContent={["center", "center", "left", "left"]}
              
            >
             <Box
             w={'100%'}
             h={'auto'}
         
     pb={'60px'}
             display={'flex'}
             
             >

                <Center
                h={'35px'}
                w={'35px'}
                bg={'white'}
                borderRadius={'10px'}
                >
<Heading color={'black'} fontSize={'16px'} fontWeight={'500'}>
    1
</Heading>        </Center>
                <Box
                h={'auto'}
                w={'100%'}
         
                >
                    <Heading
                    pl={'20px'}
                    fontSize={'36px'}
                    fontWeight={'500'}
                    color={'#FDFDFD'}
                    textAlign={'left'}
                    
                    >
                 Trustworthy
                    </Heading>
<Text
pl={'20px'}
 textAlign={'left'}
 fontSize={'14px'}
 fontWeight={'400'}
 lineHeight={'24px'}
>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis pellentesque cras interdum ornare feugiat eget feugiat. Nunc, urna vitae pellentesque risus, ut volutpat eget libero vel. 
</Text>
                </Box>

             </Box>
             <Box
             w={'100%'}
             h={'auto'}
             
             display={'flex'}
             
             >

                <Center
                h={'35px'}
                w={'35px'}
                bg={'white'}
                borderRadius={'10px'}
                >
<Heading color={'black'} fontSize={'16px'} fontWeight={'500'}>
    2
</Heading>    </Center>
                <Box
                h={'100%'}
                w={'100%'}
             
         
                >
                    <Heading
                    pl={'20px'}
                    fontSize={'36px'}
                    fontWeight={'500'}
                    color={'#FDFDFD'}
                    textAlign={'left'}
                    
                    >
                  Wide Networking
                    </Heading>
<Text
pl={'20px'}
 textAlign={'left'}
 fontSize={'14px'}
 fontWeight={'400'}
 lineHeight={'24px'}
>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis pellentesque cras interdum ornare feugiat eget feugiat. Nunc, urna vitae pellentesque risus, ut volutpat eget libero vel. 
</Text>
                </Box>

             </Box>
             <Box
             w={'100%'}
             h={'auto'}
             pt={'50px'}
             display={'flex'}
             
             >

                <Center
                h={'35px'}
                w={'35px'}
                bg={'white'}
                borderRadius={'10px'}
                >
<Heading color={'black'} fontSize={'16px'} fontWeight={'500'}>
    3
</Heading>    </Center>
                <Box
                h={'auto'}
                w={'100%'}
         
                >
                    <Heading
                    pl={'20px'}
                    fontSize={'36px'}
                    fontWeight={'500'}
                    color={'#FDFDFD'}
                    textAlign={'left'}
                    
                    >
                 24/7 Customer Service
                    </Heading>
<Text
pl={'20px'}
 textAlign={'left'}
 fontSize={'14px'}
 fontWeight={'400'}
 lineHeight={'24px'}
>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis pellentesque cras interdum ornare feugiat eget feugiat. Nunc, urna vitae pellentesque risus, ut volutpat eget libero vel. 
</Text>
                </Box>

             </Box>
             
            </Box>

    </Box>
    <Box
    
    w={['100%','100%','50%','50%']}
    h={'auto'}
    hideBelow={'md'}
   direction={'column'}
    >
         
      <Image src="images/about2.png"
  borderRadius={'30px'}
      m={'auto'}
      w={'100%'}/>


</Box>

  </Stack>
            </Box>
<Partners/>
        </Box>
        <Footer/>
        </>
    
    )
}