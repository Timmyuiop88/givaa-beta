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
  import Fund from "./fund";
  import { useRef, useEffect, useState } from "react";

  import { FaChevronRight,FaChevronLeft } from "react-icons/fa6";

  const ref = { current: {} }
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

export default function Featured(){
    return(

        <Box
        w={'100%'}
        h={'auto'}
      
        pb={10}
        >
            <Stack
            direction={'column'}
            w={'100%'}
            maxW={'6xl'}
            h={'auto'}
            m={'auto'}
           
            pt={['20px','20px','40px','50px']}
            spacing={0}
            >
      
                <Box
                w={'100%'}
                h={'auto'}
              textAlign={'center'}
           
            
                >
                    <Heading
                    pl={'25px'}
                    color={'#4D4D4D'}
                    fontSize={'54px'}
                    fontWeight={'600'}
                    lineHeight={'75px'}
                    letterSpacing={'0.54px'}
                    textAlign={['left','left','center','center']}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    
                    >
                    Featured Projects
                    </Heading>

                </Box>
                
<Box w={'100%'}

pl={['10px','10px',10,10]}
h={'auto'}
m={'auto'}
pb={['20px','20px','40px','50px']}
display={'flex'}
justifyContent={'space-between'}

alignItems={'center'}
pr={['0px','0px',10,10]}
>
  <Stack
 
   data-aos="fade-up"
   data-aos-duration="1000"
 direction={'row'}
 alignItems={'center'}
 spacing={10}
  overflowX={"scroll"}
  sx={{
    "::-webkit-scrollbar": {
      display: "none",
    },
  }}
  scrollSnapType={'x mandatory'}
 h={'auto'}
  justifyContent={"left"}
  m={"auto"}
  w={"100%"}
  >

<Hide below="md">

  <Button
  h={'50px'}
  w={'50px'}
  borderRadius={'100%'}
  bg={'#FFBE37'}
  color={'white'}
  onClick={() => scroll(-200)}
  >
    <FaChevronLeft

className="left-arrow"


/>

  </Button>

</Hide>
 
<Stack 
ref={ref}
  direction={["row", "row", "row", "row"]}
  overflowX={"scroll"}
  overflowY={'none'}
  sx={{
    "::-webkit-scrollbar": {
      display: "none",
    },
  }}
  scrollBehavior={'smooth'}
  scrollSnapType={'x mandatory'}
 h={'auto'}
  justifyContent={"left"}
  m={"auto"}
  w={"100%"}
  pt={['10px','10px','40px','50px']}
  spacing={0}
>
  

   <Fund
       w={['320px','320px','350px','350px']}

    fundraiserName="Organization "
    Description="Discover the inspiring stories of individuals and organizations who have used....."
    CreatedBy="4 Breath 4 Life"
    Amount="10000"
    Percent="37"
    TimeRemaining="250"
  />
   <Fund
    w={['320px','320px','350px','350px']}

    fundraiserName="Organization "
    Description="Discover the inspiring stories of individuals and organizations who have used....."
    CreatedBy="4 Breath 4 Life"
    Amount="10000"
    Percent="37"
    TimeRemaining="250"
  />
  <Fund
  w={['320px','320px','350px','350px']}

    fundraiserName="Organization "
    Description="Discover the inspiring stories of individuals and organizations who have used....."
    CreatedBy="4 Breath 4 Life"
    Amount="10000"
    Percent="37"
    TimeRemaining="250"
  />
  <Fund
      w={['320px','320px','350px','350px']}

    fundraiserName="Organization "
    Description="Discover the inspiring stories of individuals and organizations who have used....."
    CreatedBy="4 Breath 4 Life"
    Amount="10000"
    Percent="37"
    TimeRemaining="250"
  />
  <Fund
       w={['320px','320px','350px','350px']}

    fundraiserName="Organization "
    Description="Discover the inspiring stories of individuals and organizations who have used....."
    CreatedBy="4 Breath 4 Life"
    Amount="10000"
    Percent="37"
    TimeRemaining="250"
  />
  
</Stack>
<Hide below="md">

<Button
  h={'50px'}
  w={'50px'}
  borderRadius={'100%'}
  bg={'#FFBE37'}
  color={'white'}
  onClick={() => scroll(200)}
  >
<FaChevronRight
className="right-arrow"

/>
</Button>

</Hide>


  </Stack>


</Box>
                


            </Stack>

        </Box>
    )
}