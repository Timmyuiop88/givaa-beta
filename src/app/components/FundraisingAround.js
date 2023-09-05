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
  Wrap, WrapItem
  } from "@chakra-ui/react";
  import { useRef, useEffect, useState } from "react";
  import Fund from "./fund";
  import { FaChevronRight,FaChevronLeft } from "react-icons/fa6";
  const ref = { current: {} }
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

export default function Around(){
    return(
        <Box
        w={'100%'}
        h={'auto'}
      
        pb={10}
        >
            <Stack
            direction={'column'}
            w={'100%'}
            maxW={'9xl'}
            h={'auto'}
            m={'auto'}
            
            pt={20}
            >
      <Text
     textAlign={'center'}
     color={'#FFBE37'}
     fontSize={'40px'}
     fontWeight={'400'}
      >
Help your Neighbour
      </Text>
                <Box
                w={'100%'}
                h={'auto'}
              textAlign={'center'}
                >
                    <Heading>
                    Fundraising Around You
                    </Heading>

                </Box>
           
<Box w={'100%'}
pl={['5','5',10,10]}
h={'auto'}
m={'auto'}
pb={20}
display={'flex'}
justifyContent={'space-between'}

alignItems={'center'}
pr={['5','5',10,10]}
>
  <Stack
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
  h={'54px'}
  w={'54px'}
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
  pt={10}
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
  h={'54px'}
  w={'54px'}
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