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
Wrap, WrapItem,
Progress,
Card, CardHeader, CardBody, CardFooter,
Divider,ButtonGroup,OrderedList,ListItem
} from "@chakra-ui/react";
import Image from 'next/image'
import { BiSolidUserCircle } from "react-icons/bi";

export default function Fund(props){
    
    return(

      <Card minW={props.w} maxW={props.w} m={'auto'} bg={'none'} border={'none'} boxShadow={'none'}>
      <CardBody >
     
        <Image
        width={'348'}
        height={'232'}
          src='/images/donate.png'
          alt='Green double couch with wooden legs'
          
        />
        <Stack mt='6' spacing='10px'>
          <Heading 
          
          fontSize={'15px'}
          
         fontWeight={'700'}
         lineHeight={'24px'}
          
          
          >Raising Money for Burnt Property</Heading>
            <Progress borderRadius={'6px'} size='sm' value={45} />
            <Box
            display={'flex'}
            justifyContent={'space-between'}
            w={'100%'}
            h={'auto'}
  
            alignItems={'center'}
            >
              <Text>
                $123,000 / 175,000
              </Text>
            <Text>
              24 days left
            </Text>

            </Box>
          <Text
          
           color={'#767676'}
           fontSize={'14px'}
           fontStyle={'italic'}
           fontWeight={'300'}
           lineHeight={'21px'}
           >
          Hi, I’m Debbie Lynn! I’m raising funds for my friend, Lorna Van Pelt, who has been suffering with severe…
          </Text>
          
        
         <Button
         borderRadius={'20px'}
         bg={'#FFBE37'}
         color={'#fdfdfd'}
         >
          Donate now
         </Button>
        </Stack>
      </CardBody>
     
      <CardFooter>
 
 
      </CardFooter>
    </Card>
    
    )
}