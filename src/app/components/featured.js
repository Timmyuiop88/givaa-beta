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
    Spinner,
    Skeleton,
    SkeletonText,
    Card,
    CardBody,
    VStack,
    Progress,
  } from "@chakra-ui/react";
  import Fund from "./fund";
  import { useRef } from "react";
  import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
  import { useQuery } from '@tanstack/react-query';

  // Add a FundSkeleton component
  const FundSkeleton = ({ w }) => (
    <Card 
      minW={w} 
      maxW={w} 
      m={'auto'} 
      bg={'white'} 
      border={'1px solid'}
      borderColor={'gray.100'}
      borderRadius={'2xl'}
      overflow="hidden"
    >
      <Skeleton height="200px" />
      <CardBody p={5}>
        <VStack align="stretch" spacing={4}>
          <SkeletonText noOfLines={2} spacing={2} />
          <SkeletonText noOfLines={2} spacing={2} />
          <Skeleton height="8px" borderRadius="full" />
          <Skeleton height="80px" borderRadius="xl" />
          <Skeleton height="48px" borderRadius="xl" />
        </VStack>
      </CardBody>
    </Card>
  );

  const fetchFeaturedCampaigns = async () => {
    const response = await fetch('/api/campaigns');
    if (!response.ok) {
      throw new Error('Failed to fetch campaigns');
    }
    return response.json();
  };

export default function Featured(){
    const scrollRef = useRef(null);
    
    const { data: campaigns, isLoading, error } = useQuery({
      queryKey: ['featuredCampaigns'],
      queryFn: fetchFeaturedCampaigns,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
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
              maxW={'6xl'}
              h={'auto'}
              m={'auto'}
              pt={['20px','20px','40px','50px']}
              spacing={6}
            >
                <Box w={'100%'} h={'auto'} textAlign={'center'}>
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
                      Featured Campaigns
                    </Heading>
                </Box>
                
                <Box 
                  w={'100%'}
                  pl={['5','5',10,10]}
                  h={'auto'}
                  m={'auto'}
                  pb={['20px','20px','40px','50px']}
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  pr={['5','5',10,10]}
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
                      pt={['10px','10px','40px','50px']}
                      spacing={6}
                    >
                      {isLoading ? (
                        Array(4).fill(0).map((_, index) => (
                          <FundSkeleton key={index} w={['320px','320px','350px','350px']} />
                        ))
                      ) : error ? (
                        <Center w="full">
                          <Text color="red.500">Failed to load campaigns</Text>
                        </Center>
                      ) : campaigns?.campaigns.length === 0 ? (
                        <Center w="full">
                          <Text color="gray.500">No campaigns available</Text>
                        </Center>
                      ) : (
                        campaigns?.campaigns.map((campaign) => {
                          const progress = Math.round((campaign.current_amount / campaign.goal_amount) * 100) || 0;
                          const daysLeft = Math.ceil((new Date(campaign.end_date) - new Date()) / (1000 * 60 * 60 * 24));
                          return(
                            <Fund
                              key={campaign.campaign_id}
                              id={campaign.campaign_id}
                              w={['320px','320px','350px','350px']}
                              fundraiserName={campaign.title}
                              Description={campaign.description}
                              Amount={campaign.goal_amount.toLocaleString()}
                              Percent={progress}
                              TimeRemaining={daysLeft}
                              coverImage={campaign.cover_image}
                            />
                          )
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
    )
}