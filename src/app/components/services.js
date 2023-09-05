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
  } from "@chakra-ui/react";

  import { Image } from "@chakra-ui/react";

export default function Services(){
return(


    <Box>
    <Stack
  direction={['column','column','row','row']}
  w={'100%'}
 maxW={'7xl'}
 h={'auto'}

 m={'auto'}
  >
    <Box
    w={['100%','100%','50%','50%']}
    h={'100%'}
    textAlign={['center','center','left','left']}
  pl={'16px'}
  pr={'16px'}
  data-aos="fade-right"
  data-aos-duration="1000"
    >


<Text 
 textAlign={'left'}
fontSize={[]}>OUR SERVICE</Text>
            <Heading
              color={"#232323"}
              fontSize={["45px", "45px", "48px", "50px"]}
              fontWeight={"500"}
              textAlign={'left'}
            >Happiness Doesn’t Result From What We Get, But From What We Give
            </Heading>
            <Text
             textAlign={'left'}
              fontSize={"15px"}
              fontWeight={"400"}
              lineHeight={"25px"}
              fontStyle={"normal"}
              color={"#696969"}
              mt={["20px", "20px", "23px", "23px"]}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
              pellentesque cras interdum ornare feugiat eget feugiat. Nunc, urna
              vitae pellentesque risus, ut volutpat eget libero vel.
            </Text>
            <Box
              mt={["15px", "15px", "20px", "20px"]}
              display={"flex"}
              justifyContent={["center", "center", "left", "left"]}
            >
              <Button
                h={"60px"}
                w={["full","full","262px","262px"]}
                bg={"#FFBE37"}
                borderRadius={"105px"}
                color={"white"}
              >
                Start Fundraising
              </Button>
            </Box>

    </Box>


   

    <Box

    w={['100%','100%','50%','50%']}
    h={'auto'}
    justifyContent={'center'}
   
    >
      <Stack
      direction={'column'}
      >
        <Stack
        direction={['column','column','row','row']}
        m={'auto'}
        w={'100%'}
        pt={5}>
<Box
pb={'5'}
m={'auto'}
w={['90%','90%','48%','48%']}
h={['auto','auto','200px','220px']}
data-aos="fade-up"

>
    <Center
    h={'70px'}
    w={'70px'}
    bg={'#e9f5ee'}
    borderRadius={'50%'}
    m={'auto'}

    >
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
  <path d="M4.50011 12.3953V12.375C4.50008 10.3749 5.09244 8.41959 6.20246 6.75576C7.31247 5.09193 8.89041 3.79413 10.7372 3.0261C12.584 2.25807 14.6169 2.05422 16.5794 2.44027C18.5419 2.82632 20.3461 3.78497 21.7644 5.19528C22.8803 4.6445 24.1267 4.41293 25.366 4.52614C26.6052 4.63936 27.7891 5.09295 28.7867 5.83681C29.7843 6.58067 30.5569 7.58583 31.0191 8.74125C31.4812 9.89666 31.615 11.1574 31.4056 12.384C31.7135 12.4126 32.0122 12.5043 32.283 12.6535C32.5539 12.8026 32.7911 13.006 32.9798 13.2509C33.1686 13.4958 33.3048 13.777 33.38 14.0769C33.4553 14.3768 33.4679 14.689 33.4171 14.994C32.4001 21.1118 29.8846 24.984 25.8751 26.613V28.125C25.8751 29.0201 25.5195 29.8786 24.8866 30.5115C24.2537 31.1445 23.3952 31.5 22.5001 31.5H13.5001C12.605 31.5 11.7466 31.1445 11.1136 30.5115C10.4807 29.8786 10.1251 29.0201 10.1251 28.125V26.613C6.11561 24.984 3.60011 21.1118 2.58311 14.994C2.53403 14.6971 2.545 14.3934 2.61538 14.1008C2.68577 13.8082 2.81412 13.5327 2.99287 13.2906C3.17161 13.0485 3.39709 12.8448 3.65599 12.6914C3.91488 12.5379 4.20192 12.438 4.50011 12.3975V12.3953ZM6.75011 12.375H9.00011C9.00011 10.8832 9.59274 9.45244 10.6476 8.39755C11.7025 7.34266 13.1333 6.75003 14.6251 6.75003C16.1169 6.75003 17.5477 7.34266 18.6026 8.39755C19.6575 9.45244 20.2501 10.8832 20.2501 12.375H22.5001C22.5001 10.2864 21.6704 8.28341 20.1936 6.80656C18.7167 5.32971 16.7137 4.50003 14.6251 4.50003C12.5365 4.50003 10.5335 5.32971 9.05664 6.80656C7.57979 8.28341 6.75011 10.2864 6.75011 12.375ZM11.2501 12.375H18.0001C18.0001 11.4799 17.6445 10.6215 17.0116 9.98854C16.3787 9.35561 15.5202 9.00003 14.6251 9.00003C13.73 9.00003 12.8716 9.35561 12.2386 9.98854C11.6057 10.6215 11.2501 11.4799 11.2501 12.375ZM26.6986 12.375H29.1084C29.2782 11.7101 29.2941 11.0152 29.1547 10.3432C29.0153 9.67118 28.7243 9.03988 28.304 8.49738C27.8836 7.95487 27.345 7.51547 26.7291 7.21266C26.1133 6.90985 25.4364 6.75162 24.7501 6.75003C24.2101 6.75003 23.6971 6.84453 23.2201 7.01778C23.6184 7.65678 23.9469 8.34528 24.1989 9.06753C24.6274 8.96124 25.0777 8.98312 25.4939 9.13047C25.9102 9.27782 26.274 9.54414 26.5402 9.89638C26.8064 10.2486 26.9633 10.6713 26.9915 11.1119C27.0197 11.5526 26.9178 11.9918 26.6986 12.375ZM23.6251 27H12.3751V28.125C12.3751 28.4234 12.4936 28.7095 12.7046 28.9205C12.9156 29.1315 13.2017 29.25 13.5001 29.25H22.5001C22.7985 29.25 23.0846 29.1315 23.2956 28.9205C23.5066 28.7095 23.6251 28.4234 23.6251 28.125V27Z" fill="#35AB64"/>
</svg>
    </Center>
    <Heading
    m={'auto'}
    textAlign={'center'}
    fontSize={'20px'}
    fontWeight={'500'}
    color={'#232323'}
    mt={'10px'}
    >
    Healthy Food
    </Heading>
    <Text
    m={'auto'}
    maxW={'300px'}
    w={'100%'}
    fontSize={'14px'}
    fontWeight={'400'}
    textAlign={'center'}
    lineHeight={'24px'}
    color={'#696969'}
  
    >

Lorem ipsum dolor sit amet, consectetur adipiscing elit. cras interdum ornare feugiat eget feugiat.
    </Text>

</Box>
<Box
pb={'5'}
m={'auto'}
w={['90%','90%','48%','48%']}
h={['auto','auto','200px','220px']}
data-aos="fade-up"
>
<Center
    h={'70px'}
    w={'70px'}
    bg={'#e8eaf9'}
    borderRadius={'50%'}
    m={'auto'}
    > <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M25.875 24.6546L18 29.0843L10.125 24.6546V19.9744L7.875 18.7244V25.9704L18 31.6657L28.125 25.9704V18.7244L25.875 19.9744V24.6546Z" fill="#F87F06"/>
    <path d="M18 3.23279L2.25 11.3994V13.3495L18 22.0992L31.5 14.5995V20.8125H33.75V11.3994L18 3.23279Z" fill="#F87F06"/>
  </svg>
    </Center>
    <Heading
    m={'auto'}
    textAlign={'center'}
    fontSize={'20px'}
    fontWeight={'500'}
    color={'#232323'}
    mt={'10px'}
    >
   Education
    </Heading>
    <Text
    m={'auto'}
    maxW={'300px'}
    w={'100%'}
    fontSize={'14px'}
    fontWeight={'400'}
    textAlign={'center'}
    lineHeight={'24px'}
    color={'#696969'}
  
    >

Lorem ipsum dolor sit amet, consectetur adipiscing elit. cras interdum ornare feugiat eget feugiat.
    </Text>

</Box>

        </Stack>
        <Stack
        w={'100%'}
       direction={['column','column','row','row']}
       
       
        justifyContent={'center'}
        
     
        pb={10}>

        <Box
     data-aos="fade-up"
     pb={'5'}
     m={'auto'}
     w={['90%','90%','48%','48%']}
     h={['auto','auto','200px','220px']}
>
<Center
    h={'70px'}
    w={'70px'}
    bg={'#e8eaf9'}
    borderRadius={'50%'}
    m={'auto'}
    >
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
  <path d="M13.5 4.5C13.2016 4.5 12.9155 4.61853 12.7045 4.82951C12.4935 5.04048 12.375 5.32663 12.375 5.625V10.125H9C7.80653 10.125 6.66193 10.5991 5.81802 11.443C4.97411 12.2869 4.5 13.4315 4.5 14.625V25.875C4.5 27.0685 4.97411 28.2131 5.81802 29.057C6.66193 29.9009 7.80653 30.375 9 30.375H27C28.1935 30.375 29.3381 29.9009 30.182 29.057C31.0259 28.2131 31.5 27.0685 31.5 25.875V14.625C31.5 13.4315 31.0259 12.2869 30.182 11.443C29.3381 10.5991 28.1935 10.125 27 10.125H23.625V5.625C23.625 5.32663 23.5065 5.04048 23.2955 4.82951C23.0845 4.61853 22.7984 4.5 22.5 4.5H13.5ZM21.375 10.125H14.625V6.75H21.375V10.125ZM19.125 16.875V19.125H21.375C21.6734 19.125 21.9595 19.2435 22.1705 19.4545C22.3815 19.6655 22.5 19.9516 22.5 20.25C22.5 20.5484 22.3815 20.8345 22.1705 21.0455C21.9595 21.2565 21.6734 21.375 21.375 21.375H19.125V23.625C19.125 23.9234 19.0065 24.2095 18.7955 24.4205C18.5845 24.6315 18.2984 24.75 18 24.75C17.7016 24.75 17.4155 24.6315 17.2045 24.4205C16.9935 24.2095 16.875 23.9234 16.875 23.625V21.375H14.625C14.3266 21.375 14.0405 21.2565 13.8295 21.0455C13.6185 20.8345 13.5 20.5484 13.5 20.25C13.5 19.9516 13.6185 19.6655 13.8295 19.4545C14.0405 19.2435 14.3266 19.125 14.625 19.125H16.875V16.875C16.875 16.5766 16.9935 16.2905 17.2045 16.0795C17.4155 15.8685 17.7016 15.75 18 15.75C18.2984 15.75 18.5845 15.8685 18.7955 16.0795C19.0065 16.2905 19.125 16.5766 19.125 16.875Z" fill="#F87F06"/>
</svg>
    </Center>
    <Heading
    m={'auto'}
    textAlign={'center'}
    fontSize={'20px'}
    fontWeight={'500'}
    color={'#232323'}
    mt={'10px'}
    >
 Medical Help
    </Heading>
    <Text
    m={'auto'}
    maxW={'300px'}
    w={'100%'}
    fontSize={'14px'}
    fontWeight={'400'}
    textAlign={'center'}
    lineHeight={'24px'}
    color={'#696969'}
  
    >

Lorem ipsum dolor sit amet, consectetur adipiscing elit. cras interdum ornare feugiat eget feugiat.
    </Text>

</Box>
<Box
pb={5}
 m={'auto'}
 w={['90%','90%','48%','48%']}
 h={['180px','180px','200px','220px']}
 data-aos="fade-up"
>
<Center
    h={'70px'}
    w={'70px'}
    bg={'#e9f5ee'}
    borderRadius={'50%'}
    m={'auto'}
    >
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
  <path d="M18 3C10.005 9.825 6 15.72 6 20.7C6 28.17 11.7 33 18 33C24.3 33 30 28.17 30 20.7C30 15.72 25.995 9.825 18 3ZM19.5 28.365C19.02 28.455 18.525 28.5 18 28.5C13.965 28.5 10.68 25.59 10.5 21H12.75C12.87 24.105 15 26.25 18 26.25C18.525 26.25 19.035 26.19 19.5 26.055V28.365Z" fill="#35AB64"/>
</svg>
    </Center>
    <Heading
    m={'auto'}
    textAlign={'center'}
    fontSize={'20px'}
    fontWeight={'500'}
    color={'#232323'}
    mt={'10px'}
    >
    Clean Water
    </Heading>
    <Text
    m={'auto'}
    maxW={'300px'}
    w={'100%'}
    fontSize={'14px'}
    fontWeight={'400'}
    textAlign={'center'}
    lineHeight={'24px'}
    color={'#696969'}
  
    >

Lorem ipsum dolor sit amet, consectetur adipiscing elit. cras interdum ornare feugiat eget feugiat.
    </Text>


</Box>

        </Stack>
      </Stack>
</Box>

  </Stack>

    </Box>
)

}