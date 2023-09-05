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
} from "@chakra-ui/react";
import { FaChevronRight,FaChevronLeft } from "react-icons/fa6";
import Image from 'next/image'
export default function Blog() {
  return (
    <Box w={"100%"} h={"auto"} bg={""} pt={"50px"}>
      <Text
        textAlign={"center"}
        fontSize={"16px"}
        fontWeight={"500"}
        color={"#696969"}
      >
        BLOGS & ARTICLES
      </Text>
      <Heading
        maxW={"900px"}
        textAlign={"center"}
        fontSize={"48px"}
        fontWeight={"500"}
        color={"#232323"}
        pt={"20px"}
        m={"auto"}
      >
        Those Who Are Happiest Are Those Who Do The Most For Others.
      </Heading>
      <Text
        m={"auto"}
        textAlign={"center"}
        maxW={"800px"}
        color={"#696969"}
        fontSize={"14px"}
        fontWeight={"400"}
        pt={"20px"}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
        pellentesque cras interdum ornare feugiat eget feugiat. Nunc, urna vitae
        pellentesque risus, ut volutpat eget libero vel.
      </Text>

      <Stack
      maxW={'7xl'}
      padding={'5'}
      direction={'row'}
      alignItems={'center'}
      spacing={5}
      overflowX={"scroll"}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
      scrollSnapType={'x mandatory'}
      m={"auto"}
      w={"100%"}
      >
        
        <Box
        m={'auto'}
        minW={['310px','310px','500px','512px']}
        w={['310px','310px','500px','512px']}
        h={'690px'}
       
        >
            <Image src="/images/blog2.png"
            alt="blog image"
            width={'512'} height={'448'}/>
<Heading
w={'100%'}
fontSize={['15px','15px','20px','24px']}
lineHeight={'24px'}
fontWeight={'500'}
color={'#232323'}
mt={'20px'}
>
Exeter children’s Fundraising shop celebrates grand reopening
</Heading>
<Text
w={'100%'}
mt={'20px'}
fontSize={'14px'}
lineHeight={'24px'}
fontWeight={'400'}
>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis pellentesque cras interdum ornare feugiat eget feugiat. Nunc, urna vitae pellentesque risus, ut volutpat eget libero vel.
</Text>


        </Box>
        <Box
          m={'auto'}
          minW={['310px','310px','500px','512px']}
       w={['310px','310px','500px','512px']}
        h={'690px'}
       
        >
                   <Image src="/images/blog1.png" alt="blog image"
            width={'512'} height={'448'}/>
                   <Heading
w={'100%'}
fontSize={['15px','15px','20px','24px']}
lineHeight={'24px'}
fontWeight={'500'}
color={'#232323'}
mt={'20px'}
>
Exeter children’s Fundraising shop celebrates grand reopening
</Heading>
<Text
w={'100%'}
mt={'20px'}
fontSize={'14px'}
lineHeight={'24px'}
fontWeight={'400'}
>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis pellentesque cras interdum ornare feugiat eget feugiat. Nunc, urna vitae pellentesque risus, ut volutpat eget libero vel.
</Text>

        </Box>
        <Box
          m={'auto'}
       minW={['310px','310px','500px','512px']}
       w={['310px','310px','500px','512px']}
        h={'694px'}

        >
            
       <Image src="/images/blog3.png"  alt="blog image"
            width={'512'} height={'448'}/>
       <Heading
w={'100%'}
fontSize={['15px','15px','20px','24px']}
lineHeight={'24px'}
fontWeight={'500'}
color={'#232323'}
mt={'20px'}
>
Exeter children’s Fundraising shop celebrates grand reopening
</Heading>
<Text
w={'100%'}
mt={'20px'}
fontSize={'14px'}
lineHeight={'24px'}
fontWeight={'400'}
>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis pellentesque cras interdum ornare feugiat eget feugiat. Nunc, urna vitae pellentesque risus, ut volutpat eget libero vel.
</Text>
        </Box>


      </Stack>
    </Box>
  );
}
