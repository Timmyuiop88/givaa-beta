"use client";
import {
  Box,
  Text,
  Button,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Hide,
  Show
} from "@chakra-ui/react";
import { FiPlus, FiFilter, FiSearch } from "react-icons/fi";
import { useCampaigns } from "../../../hooks/useCampaigns";
import NavBar from "../../../user/components/navBar";
import Link from "next/link";
import { useState } from "react";
import CampaignCard from "./campaign";

export default function PageContent() {
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    sort: "created_at",
    order: "desc",
  });

  const { data, isLoading, error } = useCampaigns(filters);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const FilterDrawer = () => (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Filter Campaigns</DrawerHeader>
        <DrawerBody>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text mb={2}>Status</Text>
              <Select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">All</option>
                <option value="ACTIVE">Active</option>
                <option value="DRAFT">Draft</option>
              </Select>
            </Box>
            <Box>
              <Text mb={2}>Sort By</Text>
              <Select
                value={filters.sort}
                onChange={(e) => handleFilterChange("sort", e.target.value)}
              >
                <option value="created_at">Date Created</option>
                <option value="end_date">End Date</option>
                <option value="goal_amount">Goal Amount</option>
              </Select>
            </Box>
            <Box>
              <Text mb={2}>Order</Text>
              <Select
                value={filters.order}
                onChange={(e) => handleFilterChange("order", e.target.value)}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </Select>
            </Box>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  return (
    <Box minH="100vh" bg="gray.50">
      <NavBar />
      <Box px={{ base: 4, md: 8, lg: 16 }} py={8}>
        <VStack spacing={8} align="stretch">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "stretch", md: "center" }}
            gap={4}
          >
            <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
              Your Campaigns
            </Text>
            <HStack spacing={4} w={{ base: "full", md: "auto" }}>
              <InputGroup maxW={{ base: "full", md: "300px" }}>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search campaigns..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  bg="white"
                  borderRadius="full"
                />
              </InputGroup>
              <Button
                leftIcon={<FiFilter />}
                variant="outline"
                onClick={onOpen}
                borderRadius="full"
                px={6}
              >
                <Text display={{ base: "none", md: "block" }}>Filter</Text>
              </Button>
              <Link href="/user/campaigns/new" style={{ display: 'contents' }}>
                <Button
                  leftIcon={<FiPlus />}
                  bg="#FF5A5F"
                  color="white"
                  _hover={{ bg: "#FF4448" }}
                  borderRadius="full"
                  px={6}
                >
                  New <Show above="md">Campaign</Show>
                </Button>
              </Link>
            </HStack>
          </Flex>

          {data?.campaigns?.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
              spacing={6}
            >
              {data.campaigns.map((campaign) => (
                <CampaignCard key={campaign.campaign_id} campaign={campaign} />
              ))}
            </SimpleGrid>
          ) : (
            <Box
              textAlign="center"
              py={16}
              px={4}
              bg="white"
              borderRadius="lg"
              shadow="sm"
            >
              <Text fontSize="xl" color="gray.600" mb={4}>
                {isLoading
                  ? "Loading campaigns..."
                  : error
                  ? "Error loading campaigns"
                  : "No campaigns found"}
              </Text>
              {!isLoading && !error && (
                <Link href="/user/campaigns/new">
                  <Button
                    leftIcon={<FiPlus />}
                    bg="#FF5A5F"
                    color="white"
                    _hover={{ bg: "#FF4448" }}
                    size="lg"
                    borderRadius="full"
                  >
                    Create Your First Campaign
                  </Button>
                </Link>
              )}
            </Box>
          )}
        </VStack>
      </Box>
      <FilterDrawer />
    </Box>
  );
}
