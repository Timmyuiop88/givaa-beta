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
    Spinner,
} from "@chakra-ui/react";
import { useRef } from "react";
import Fund from "./fund";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useQuery } from '@tanstack/react-query';

const fetchNearbyCampaigns = async () => {
  const response = await fetch('/api/campaigns?type=nearby');
  if (!response.ok) {
    throw new Error('Failed to fetch campaigns');
  }
  return response.json();
};

export default function Around() {
    const scrollRef = useRef(null);
    
    const { data: campaigns, isLoading, error } = useQuery({
      queryKey: ['nearbyCampaigns'],
      queryFn: fetchNearbyCampaigns,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    });

    const scroll = (scrollOffset) => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += scrollOffset;
      }
    };

    return(
        <Box w={'100%'} h={'auto'} pb={10}>
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
                <Box w={'100%'} h={'auto'} textAlign={'center'}>
                    <Heading>
                      Fundraising Around You
                    </Heading>
                </Box>
           
                <Box 
                  w={'100%'}
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
                        <FaChevronLeft className="left-arrow" />
                      </Button>
                    </Hide>
                 
                    <Stack 
                      ref={scrollRef}
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
                      {isLoading ? (
                        <Center w="full">
                          <Spinner size="xl" color="orange.500" thickness="4px" />
                        </Center>
                      ) : error ? (
                        <Center w="full">
                          <Text color="red.500">Failed to load campaigns</Text>
                        </Center>
                      ) : campaigns?.campaigns.length === 0 ? (
                        <Center w="full">
                          <Text color="gray.500">No campaigns available in your area</Text>
                        </Center>
                      ) : (
                        campaigns?.campaigns.map((campaign) => {
                          const progress = Math.round((campaign.current_amount / campaign.goal_amount) * 100) || 0;
                          const daysLeft = Math.ceil((new Date(campaign.end_date) - new Date()) / (1000 * 60 * 60 * 24));
                          return (
                            <Fund
                              key={campaign.id}
                              w={['320px','320px','350px','350px']}
                              fundraiserName={campaign.title}
                              Description={campaign.description}
                              Amount={campaign.goal_amount.toLocaleString()}
                              Percent={progress}
                              TimeRemaining={daysLeft}
                              coverImage={campaign.cover_image}
                            />
                          );
                        })
                      )}
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
                        <FaChevronRight className="right-arrow" />
                      </Button>
                    </Hide>
                  </Stack>
                </Box>
            </Stack>
        </Box>
    );
}