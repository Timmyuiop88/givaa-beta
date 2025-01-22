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
  Spinner,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  RadioGroup,
  Radio,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  VStack,
} from "@chakra-ui/react";
import { BsFacebook, BsTwitter, BsYoutube, BsInstagram } from "react-icons/bs";
import { useRef, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Footer from "../components/footer";
import Nav from "../components/nav";
import Ready from "../components/ready";
import Fund from "../components/fund";
import debounce from 'lodash/debounce';

export default function Explore() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'ACTIVE',
    amountRange: [0, 100000],
    sortBy: 'newest'
  });

  // Debounced search function
  const debouncedSearch = useRef(
    debounce((term) => {
      setSearchTerm(term);
    }, 300)
  ).current;

  const { data, isLoading, error } = useQuery({
    queryKey: ['exploreCampaigns', searchTerm, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        search: searchTerm,
        category: filters.category,
        status: filters.status,
        minAmount: filters.amountRange[0],
        maxAmount: filters.amountRange[1],
        sortBy: filters.sortBy
      });
      const response = await fetch(`/api/campaigns?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch campaigns');
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Box bg={"#fdfdfd"}>
      <Box
        w={"100%"}
        h={"auto"}
        bg={"#fdfaf1"}
        pt={["0px", "0px", "30px", "30px"]}
      >
        <Nav />
        <Heading
          mt={["20px", "20px", "50px", "50px"]}
          mb={"10px"}
          textAlign={"center"}
          fontWeight={"500px"}
          fontSize={["35px", "35px", "40px", "48px"]}
        >
          Search{" "}
          <Text as={"span"} color={"#FFBE37"}>
            Fundraisers
          </Text>
        </Heading>
        <Text
          w={"90%"}
          m={"auto"}
          textAlign={"center"}
          fontSize={["15px", "15px", "20px", "20px"]}
          fontWeight={"400"}
          mb={["10px", "10px", "50px", "50px"]}
        >
          Look for people, fundraiser names, locations, and more
        </Text>
        <InputGroup
          pl={"5px"}
          pr={"5px"}
          maxW={"3xl"}
          m={"auto"}
          size={"xl"}
          alignItems={"center"}
        >
          <InputLeftElement alignItems={"center"} p={6}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M22.3733 17.7334C20.9768 16.4926 19.4799 15.3699 17.8977 14.3767C18.9681 12.5556 19.3401 10.4076 18.9444 8.33262C18.5487 6.25766 17.4123 4.39726 15.7468 3.09794C14.0813 1.79861 12.0004 1.14894 9.89147 1.26992C7.78258 1.3909 5.78956 2.27429 4.28361 3.75556C2.77765 5.23682 1.86144 7.21497 1.70562 9.32157C1.5498 11.4282 2.16499 13.5196 3.43662 15.2063C4.70824 16.893 6.5496 18.06 8.61773 18.49C10.6859 18.9199 12.8398 18.5835 14.6783 17.5434C15.6832 19.1201 16.809 20.6165 18.0455 22.0189C18.6068 22.5783 19.3643 22.8965 20.1566 22.9056C20.97 22.9085 21.7517 22.5898 22.3311 22.0189C22.617 21.7338 22.8435 21.3948 22.9975 21.0216C23.1515 20.6483 23.23 20.2483 23.2283 19.8445C23.2321 19.0557 22.9249 18.2972 22.3733 17.7334ZM5.32607 15.0628C4.32874 14.0667 3.64927 12.7972 3.37363 11.4148C3.09799 10.0325 3.23857 8.59942 3.77758 7.29698C4.3166 5.99454 5.22982 4.88124 6.40171 4.09794C7.57361 3.31465 8.9515 2.89655 10.3611 2.89655C11.7706 2.89655 13.1485 3.31465 14.3204 4.09794C15.4923 4.88124 16.4055 5.99454 16.9446 7.29698C17.4836 8.59942 17.6242 10.0325 17.3485 11.4148C17.0729 12.7972 16.3934 14.0667 15.3961 15.0628C14.7353 15.7248 13.9504 16.2499 13.0865 16.6082C12.2225 16.9665 11.2964 17.1509 10.3611 17.1509C9.42576 17.1509 8.49963 16.9665 7.63566 16.6082C6.7717 16.2499 5.98687 15.7248 5.32607 15.0628ZM21.2544 20.9423C21.1173 21.0836 20.9533 21.196 20.772 21.2727C20.5906 21.3495 20.3957 21.389 20.1989 21.389C20.002 21.389 19.8071 21.3495 19.6257 21.2727C19.4444 21.196 19.2804 21.0836 19.1433 20.9423C17.9859 19.6142 16.9275 18.203 15.9766 16.72C16.1666 16.5659 16.3461 16.4002 16.515 16.2239C16.6839 16.0656 16.8316 15.8862 16.9794 15.7173C18.4855 16.6587 19.9149 17.7176 21.2544 18.8839C21.3959 19.0202 21.5074 19.1844 21.5819 19.3661C21.6564 19.5479 21.6923 19.7431 21.6872 19.9395C21.6732 20.316 21.5188 20.6737 21.2544 20.9423Z"
                fill="#333333"
              />
            </svg>
          </InputLeftElement>
          <Input
            pl={'50px'}
            fontSize={["22px","25px","25px","25px"]}
            fontWeight={"300"}
            color={"#ADADAD"}
            placeholder="Search for fundraisers"
            bg={"#F1F1F1"}
            onChange={handleSearch}
          />
          <InputRightElement alignItems={"center"} p={"3"}>
            <Button
              onClick={onOpen}
              m={"auto"}
              h={"50px"}
              w={["50px", "50px", "auto", "auto"]}
              border={"1px solid #C8C8C8"}
              borderRadius={"105px"}
              color={"#333"}
              fontWeight={400}
              fontSize={"20px"}
              p={5}
              display={"flex"}
              justifyContent={"center"}
            >
              <Hide below="md">Filters</Hide>
              <Box ml={["0px", "0px", "5px", "10px"]} alignItems={"center"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.1667 10.2918H14.5917C14.7627 11.0459 15.1849 11.7194 15.7891 12.2019C16.3933 12.6844 17.1435 12.9472 17.9167 12.9472C18.6899 12.9472 19.4401 12.6844 20.0443 12.2019C20.6484 11.7194 21.0707 11.0459 21.2417 10.2918H23.1945C23.4044 10.2918 23.6058 10.2084 23.7542 10.06C23.9027 9.91149 23.9861 9.71012 23.9861 9.50016C23.9861 9.2902 23.9027 9.08883 23.7542 8.94037C23.6058 8.7919 23.4044 8.70849 23.1945 8.70849H21.2417C21.0707 7.95446 20.6484 7.28094 20.0443 6.79845C19.4401 6.31597 18.6899 6.05316 17.9167 6.05316C17.1435 6.05316 16.3933 6.31597 15.7891 6.79845C15.1849 7.28094 14.7627 7.95446 14.5917 8.70849H13.1667C12.9567 8.70849 12.7553 8.7919 12.6069 8.94037C12.4584 9.08883 12.375 9.2902 12.375 9.50016C12.375 9.71012 12.4584 9.91149 12.6069 10.06C12.7553 10.2084 12.9567 10.2918 13.1667 10.2918Z"
                    fill="#333333"
                  />
                </svg>
              </Box>
            </Button>
          </InputRightElement>
        </InputGroup>

        <Box w={'100%'} pt={'50px'} pl={'10px'} pr={'10px'}>
          <SimpleGrid m={'auto'} justifyContent={'center'} maxW={'7xl'} minChildWidth='350px' spacing='10px'>
            {isLoading ? (
              <Center w="full" h="200px">
                <Spinner size="xl" color="orange.500" thickness="4px" />
              </Center>
            ) : error ? (
              <Center w="full" h="200px">
                <Text color="red.500">Failed to load campaigns</Text>
              </Center>
            ) : data?.campaigns.length === 0 ? (
              <Center w="full" h="200px">
                <Text color="gray.500">No campaigns found</Text>
              </Center>
            ) : (
              data?.campaigns.map((campaign) => {
                const progress = Math.round((campaign.current_amount / campaign.goal_amount) * 100) || 0;
                const daysLeft = Math.ceil((new Date(campaign.end_date) - new Date()) / (1000 * 60 * 60 * 24));
                return (
                  <Fund
                    key={campaign.campaign_id}
                    w={['full','full','350px','350px']}
                    fundraiserName={campaign.title}
                    Description={campaign.description}
                    Amount={campaign.goal_amount}
                    Percent={progress}
                    TimeRemaining={daysLeft}
                    coverImage={campaign.cover_image}
                  />
                );
              })
            )}
          </SimpleGrid>
        </Box>
      </Box>

      {/* Filter Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Filter Campaigns</DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text mb={2} fontWeight="bold">Category</Text>
                <RadioGroup value={filters.category} onChange={(value) => handleFilterChange('category', value)}>
                  <VStack align="start">
                    <Radio value="all">All Categories</Radio>
                    <Radio value="medical">Medical</Radio>
                    <Radio value="education">Education</Radio>
                    <Radio value="emergency">Emergency</Radio>
                    <Radio value="community">Community</Radio>
                  </VStack>
                </RadioGroup>
              </Box>

              <Box>
                <Text mb={2} fontWeight="bold">Amount Range</Text>
                <RangeSlider
                  defaultValue={filters.amountRange}
                  min={0}
                  max={100000}
                  step={1000}
                  onChange={(value) => handleFilterChange('amountRange', value)}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack bg="orange.400" />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
                <Text mt={2} fontSize="sm" color="gray.600">
                  ${filters.amountRange[0]} - ${filters.amountRange[1]}
                </Text>
              </Box>

              <Box>
                <Text mb={2} fontWeight="bold">Sort By</Text>
                <RadioGroup value={filters.sortBy} onChange={(value) => handleFilterChange('sortBy', value)}>
                  <VStack align="start">
                    <Radio value="newest">Newest First</Radio>
                    <Radio value="oldest">Oldest First</Radio>
                    <Radio value="goal_high">Highest Goal</Radio>
                    <Radio value="goal_low">Lowest Goal</Radio>
                    <Radio value="progress">Most Progress</Radio>
                  </VStack>
                </RadioGroup>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Ready />
      <Footer />
    </Box>
  );
}
