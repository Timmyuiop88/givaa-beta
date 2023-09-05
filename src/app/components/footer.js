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
    Image
    , List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Divider
  } from "@chakra-ui/react";

  import { BsFacebook,BsTwitter,BsYoutube,BsInstagram } from "react-icons/bs";
export default function Footer(){
    return(

            <Box 
            w={'100%'}
            h={'auto'}
            bg={'#222'}
            pt={'50px'}
            pl={'10px'}
            pr={'10px'}
            pb={'50px'}
            >

                <Stack
                m={'auto'}
                direction={['column','column','row','row']}
                maxW={'8xl'}
                w={'100%'}
                h={'auto'}
                pb={'50px'}
           
                >
             <Box
           
             w={'full'}
             h={'auto'}
          
        
        
             >
                <Heading
                fontSize={'36px'}
                fontWeight={'500'}
                color={'#FFBE37'}
                >
                Givaa
                </Heading>
                <Text
                mt={'40px'}
                fontSize={'12px'}
                w={'100%'}
                h={'auto'}
                color={'#FDFDFD'}
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis pellentesquefffff cras interdum ornare feugiat eget feugiat. Nunc, urna vitae pellentesque risus, ut volutpat eget libero vel.  
                </Text>
                </Box>    
                <Box
                    m={['0px','0px','auto','auto']}
                    w={'full'}
                    h={'auto'}
         
    
          
             >
                <Heading
                  fontSize={'16px'}
                  fontWeight={'500'}
                  color={'#FDFDFD'}
                  lineHeight={'normal'}
                  ml={'0'}
                >
                Company  
                </Heading>
                
                <OrderedList 
                w={'100%'}
                styleType={'none'}
                fontSize={'12px'}
                fontWeight={'500'}
                color={'#FDFDFD'}
                lineHeight={'normal'}
                spacing={'25px'}
             ml={'0'}
             mt={'20px'}
                
                >
  <ListItem>About Us</ListItem>
  <ListItem>Service</ListItem>
  <ListItem>Program</ListItem>
  <ListItem>Blog</ListItem>
</OrderedList>
                </Box>       

                     <Box
                              m={['0px','0px','auto','auto']}
                              w={'full'}
                              h={'auto'}
                             
                          
                          
             >
                 <Heading
               fontSize={'16px'}
                fontWeight={'500'}
                color={'#FDFDFD'}
                lineHeight={'normal'}
                    
                >
                Our Contact
                </Heading>
                
                <OrderedList 
                   w={'100%'}
                styleType={'none'}
                fontSize={'12px'}
                fontWeight={'500'}
                color={'#FDFDFD'}
                lineHeight={'normal'}
                spacing={'25px'}
             ml={'0'}
             mt={'20px'}
                
                >
  <ListItem>(229) 555-0109</ListItem>
  <ListItem>Givaa@email.com</ListItem>
  <ListItem>Thornridge Cir. Shiloh, Hawaii 81063</ListItem>

</OrderedList>
                
                
                </Box>       

                     <Box
              m={['0px','0px','auto','auto']}
              w={'full'}
              h={'auto'}
            
          
           
             >
                  <Heading
           fontSize={'16px'}
                fontWeight={'500'}
                color={'#FDFDFD'}
                lineHeight={'normal'}
                >
               Publication
                </Heading>
                
                <OrderedList styleType={'none'}
   fontSize={'12px'}
                fontWeight={'500'}
                color={'#FDFDFD'}
                lineHeight={'normal'}
                spacing={'25px'}
             ml={'0'}
             mt={'20px'}
                
                >
  <ListItem>
  <ListIcon as={BsFacebook}/>
    Facebook</ListItem>
  <ListItem>
  <ListIcon as={BsTwitter}/>
    Twitter</ListItem>
  <ListItem>
  <ListIcon as={BsInstagram}/>
    Instagram</ListItem>
  <ListItem>
  <ListIcon as={BsYoutube}/>
    Youtube</ListItem>
</OrderedList>
                
                </Box>       
                       
                    


                </Stack>
                <Divider/>

                <Text
                mt={'10px'}
                textAlign={'center'}
                fontSize={'12px'}
                w={'100%'}
                h={'auto'}
                color={'#FDFDFD'}
                 >
                © 2023 Givaa - All Rights Reserved
                </Text>
               </Box>

    )
}