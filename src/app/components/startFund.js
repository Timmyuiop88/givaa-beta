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


export default function StartFund(){
    return(
        
        <Box
        w={'100%'}
        h={'auto'}

        pt={10}
        >
            <Box
            maxW={'7xl'}
            h={'auto'}
            w={'100%'}
       pb={10}
            m={'auto'}
            >
                <Stack 
                spacing={0}
                direction={['column','column','row','row']}
                >
                    <Box
                 m={'auto'}
                 w={['90%','90%','50%','50%']}
                    h={'300px'}
                    bg={'white'}
                    pl={'5%'}
                    pt={['5%','5%','5%','5%']}
                    >
                       <Heading
                       color={'#4E4E4E'}
                       fontWeight={'600'}
                       fontSize={'48px'}
                       letterSpacing={'0.48px'}
                       >
                       Start a fundraising for
                        
                        </Heading> 
                        <Text
                        mt={'15px'}
                        color={'#4E4E4E'}
                       fontWeight={'400'}
                       fontSize={'16px'}
                       
                        >
                        Lorem ipsum dolor sit amet consectetur. Porttitor diam mauris tincidunt ipsum ut nulla auctor at. Massa pellentesque.
                        </Text>

                    </Box>
                    <Box
                 m={'auto'}
                 w={['90%','90%','50%','50%']}
                    h={'300px'}
                    bgImage="url('/images/start1.png')"
                bgSize={'cover'}
                pl={'5%'}
                 pt={['5%','5%','5%','5%']}
                    >
                        
                        <Heading
                       color={'#ffffff'}
                       fontWeight={'600'}
                       fontSize={'48px'}
                       letterSpacing={'0.48px'}
                       >
                    Yourself
                        
                        </Heading> 
                        <Text
                        mt={'15px'}
                        color={'#ffffff'}
                       fontWeight={'400'}
                       fontSize={'16px'}
                       
                        >
                        Lorem ipsum dolor sit amet consectetur. Porttitor diam mauris tincidunt ipsum ut nulla auctor at. Massa pellentesque.
                        </Text>
                    </Box>
                </Stack>
                <Stack 
                   spacing={0}
               direction={['column','column','row','row']}
                >
                    <Box
                    m={'auto'}
                    w={['90%','90%','50%','50%']}
                    h={'300px'}
                    bgImage="url('/images/start2.png')"
                    bgSize={'cover'}
                    pl={'5%'}
                    pt={['5%','5%','5%','5%']}
                    >
                        
                        <Heading
                       color={'#ffffff'}
                       fontWeight={'600'}
                       fontSize={'48px'}
                       letterSpacing={'0.48px'}
                       >
                     Friends and family
                        
                        </Heading> 
                        <Text
                        mt={'15px'}
                        color={'white'}
                       fontWeight={'400'}
                       fontSize={'16px'}
                       
                        >
                        Lorem ipsum dolor sit amet consectetur. Porttitor diam mauris tincidunt ipsum ut nulla auctor at. Massa pellentesque.
                        </Text>
                    </Box>
                    <Box
                     m={'auto'}
                     w={['90%','90%','50%','50%']}
                    h={'300px'}
                    bgImage="url('/images/start3.png')"
                    bgSize={'cover'}
                    pl={'5%'}
                    pt={['5%','5%','5%','5%']}
                    >
                           <Heading
                       color={'#ffffff'}
                       fontWeight={'600'}
                       fontSize={'48px'}
                       letterSpacing={'0.48px'}
                       >
                      Charity
                        
                        </Heading> 
                        <Text
                        mt={'15px'}
                        color={'#ffffff'}
                       fontWeight={'400'}
                       fontSize={'16px'}
                       
                        >
                        Lorem ipsum dolor sit amet consectetur. Porttitor diam mauris tincidunt ipsum ut nulla auctor at. Massa pellentesque.
                        </Text>

                    </Box>
                </Stack>

            </Box>
        </Box>
    )
}