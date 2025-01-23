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
  Skeleton,
  SkeletonText,
  Card,
  CardBody,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import { FiSearch, FiSliders, FiFilter } from "react-icons/fi";
import { useRef, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Footer from "../components/footer";
import Nav from "../components/nav";
import Ready from "../components/ready";
import Fund from "../components/fund";
import debounce from 'lodash/debounce';

// Add FundSkeleton component
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
    transition="all 0.2s"
    _hover={{ shadow: 'lg', borderColor: 'orange.200' }}
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
    staleTime: 1000 * 60 * 5,
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

  const activeFiltersCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === 'category' && value !== 'all') count++;
    if (key === 'amountRange' && (value[0] > 0 || value[1] < 100000)) count++;
    if (key === 'sortBy' && value !== 'newest') count++;
    return count;
  }, 0);

  return (
    <Box bg={"#fdfdfd"}>
      <Box
        w={"100%"}
        h={"auto"}
        bg={"#fdfaf1"}
        pt={["0px", "0px", "30px", "30px"]}
      >
        <Nav />
        <VStack spacing={4} mb={8}>
          <Heading
            mt={["20px", "20px", "50px", "50px"]}
            textAlign={"center"}
            fontWeight={"500"}
            fontSize={["35px", "35px", "40px", "48px"]}
            color={"gray.800"}
          >
            Search{" "}
            <Text as={"span"} color={"#FFBE37"}>
              Fundraisers
            </Text>
          </Heading>
          <Text
            maxW={"xl"}
            textAlign={"center"}
            fontSize={["15px", "15px", "20px", "20px"]}
            fontWeight={"400"}
            color={"gray.600"}
          >
            Look for people, fundraiser names, locations, and more
          </Text>
        </VStack>

        <Box maxW={"3xl"} mx={"auto"} px={4}>
          <InputGroup
            size={"lg"}
            bg={"#F6F6F7"}
            borderRadius={"full"}
            overflow={"hidden"}
            border={"none"}
            _hover={{ bg: "#F0F0F1" }}
            transition="all 0.2s"
          >
            <InputLeftElement h={"full"} pl={6}>
              <Icon as={FiSearch} boxSize={5} color={"gray.500"} />
            </InputLeftElement>
            <Input
              pl={14}
              h={["50px", "50px", "56px", "56px"]}
              fontSize={["16px", "16px", "17px", "17px"]}
              fontWeight={"400"}
              placeholder="Search for fundraisers"
              border={"none"}
              color={"gray.700"}
              _placeholder={{ color: "gray.500" }}
              _focus={{ 
                bg: "#F0F0F1",
                boxShadow: "none"
              }}
              onChange={handleSearch}
            />
            <InputRightElement h={"full"} w={"auto"} pr={2}>
              <Button
                onClick={onOpen}
                h={["38px", "38px", "44px", "44px"]}
                px={4}
                borderRadius={"full"}
                bg={"white"}
                color={"gray.700"}
                fontWeight={500}
                fontSize={"15px"}
                leftIcon={<Icon as={FiSliders} />}
                boxShadow="sm"
                _hover={{ 
                  bg: "white",
                  shadow: "md"
                }}
                position="relative"
              >
                <Hide below="md">Filters</Hide>
                {activeFiltersCount > 0 && (
                  <Tag
                    position="absolute"
                    top={-1}
                    right={-1}
                    size="sm"
                    borderRadius="full"
                    colorScheme="orange"
                    boxShadow="sm"
                  >
                    {activeFiltersCount}
                  </Tag>
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>

        <Box w={'100%'} pt={'50px'} px={4}>
          <SimpleGrid 
            m={'auto'} 
            justifyContent={'center'} 
            maxW={'7xl'} 
            minChildWidth='350px' 
            spacing={6}
            pb={10}
          >
            {isLoading ? (
              Array(8).fill(0).map((_, index) => (
                <FundSkeleton key={index} w={['full','full','350px','350px']} />
              ))
            ) : error ? (
              <Center w="full" p={8}>
                <Text color="red.500" fontSize="lg">Failed to load campaigns</Text>
              </Center>
            ) : data?.campaigns.length === 0 ? (
              <Center w="full" p={8}>
                <VStack spacing={4}>
                  <Text color="gray.500" fontSize="lg">No campaigns found</Text>
                  <Text color="gray.400" fontSize="sm">Try adjusting your search or filters</Text>
                </VStack>
              </Center>
            ) : (
              data?.campaigns.map((campaign) => {
                const progress = Math.round((campaign.current_amount / campaign.goal_amount) * 100) || 0;
                const daysLeft = Math.ceil((new Date(campaign.end_date) - new Date()) / (1000 * 60 * 60 * 24));
                return (
                  <Fund
                    key={campaign.campaign_id}
                    id={campaign.campaign_id}
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
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader 
            borderBottomWidth="1px" 
            bg="gray.50"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Icon as={FiFilter} />
            Filter Campaigns
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack spacing={8} align="stretch" py={4}>
              <Box>
                <Text mb={4} fontWeight="semibold" fontSize="lg">Category</Text>
                <RadioGroup value={filters.category} onChange={(value) => handleFilterChange('category', value)}>
                  <VStack align="start" spacing={3}>
                    <Radio value="all" colorScheme="orange">All Categories</Radio>
                    <Radio value="medical" colorScheme="orange">Medical</Radio>
                    <Radio value="education" colorScheme="orange">Education</Radio>
                    <Radio value="emergency" colorScheme="orange">Emergency</Radio>
                    <Radio value="community" colorScheme="orange">Community</Radio>
                  </VStack>
                </RadioGroup>
              </Box>

              <Box>
                <Text mb={4} fontWeight="semibold" fontSize="lg">Amount Range</Text>
                <RangeSlider
                  defaultValue={filters.amountRange}
                  min={0}
                  max={100000}
                  step={1000}
                  onChange={(value) => handleFilterChange('amountRange', value)}
                >
                  <RangeSliderTrack bg="gray.200">
                    <RangeSliderFilledTrack bg="orange.400" />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} boxSize={6} />
                  <RangeSliderThumb index={1} boxSize={6} />
                </RangeSlider>
                <Flex justify="space-between" mt={2}>
                  <Text fontSize="sm" color="gray.600">
                    ${filters.amountRange[0].toLocaleString()}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    ${filters.amountRange[1].toLocaleString()}
                  </Text>
                </Flex>
              </Box>

              <Box>
                <Text mb={4} fontWeight="semibold" fontSize="lg">Sort By</Text>
                <RadioGroup value={filters.sortBy} onChange={(value) => handleFilterChange('sortBy', value)}>
                  <VStack align="start" spacing={3}>
                    <Radio value="newest" colorScheme="orange">Newest First</Radio>
                    <Radio value="oldest" colorScheme="orange">Oldest First</Radio>
                    <Radio value="goal_high" colorScheme="orange">Highest Goal</Radio>
                    <Radio value="goal_low" colorScheme="orange">Lowest Goal</Radio>
                    <Radio value="progress" colorScheme="orange">Most Progress</Radio>
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
