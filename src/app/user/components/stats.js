"use client";

import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Flex,
  Text,
  Icon,
  Progress,
  Card,
  CardBody,
  Stack,
  SkeletonText,
  Heading,
  List,
  ListItem,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import { FaDollarSign, FaUsers, FaChartLine, FaCrown } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';

const calculatePercentageChange = (current, previous) => {
  if (!previous) return 0;
  const change = ((current - previous) / previous) * 100;
  // Round to 1 decimal place and ensure it's not too extreme
  return Math.min(Math.max(Math.round(change * 10) / 10, -99.9), 999.9);
};

const StatCard = ({ title, value, icon, previousValue, isLoading, format = 'number' }) => {
  if (isLoading) {
    return (
      <Card>
        <CardBody>
          <SkeletonText noOfLines={3} spacing='4' />
        </CardBody>
      </Card>
    );
  }

  const formattedValue = format === 'currency' 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
    : value.toLocaleString();

  const change = calculatePercentageChange(value, previousValue);
  
  // Define color schemes for different states
  const getChangeColor = (change) => {
    if (change > 0) return { text: '#38A169', bg: '#F0FFF4' }; // green
    if (change < 0) return { text: '#E53E3E', bg: '#FFF5F5' }; // red
    return { text: '#718096', bg: '#F7FAFC' }; // neutral
  };
  
  const changeColors = getChangeColor(change);

  return (
    <Card>
      <CardBody>
        <Stat>
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <StatLabel color="gray.500">{title}</StatLabel>
              <StatNumber fontSize="2xl" fontWeight="bold">
                {formattedValue}
              </StatNumber>
              {previousValue && (
                <Flex 
                  alignItems="center" 
                  mt={1}
                  bg={changeColors.bg}
                  px={2}
                  py={0.5}
                  borderRadius="full"
                  width="fit-content"
                >
                  <StatArrow 
                    type={change >= 0 ? 'increase' : 'decrease'} 
                    color={changeColors.text}
                  />
                  <Text 
                    fontSize="xs" 
                    fontWeight="medium"
                    color={changeColors.text}
                  >
                    {Math.abs(change)}%
                  </Text>
                </Flex>
              )}
            </Box>
            <Icon 
              as={icon} 
              w={8} 
              h={8} 
              color="#F68A50"
              opacity={0.8}
            />
          </Flex>
        </Stat>
      </CardBody>
    </Card>
  );
};

const RecentActivityCard = ({ activity, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardBody>
          <SkeletonText noOfLines={5} spacing='4' />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <Heading size="md" mb={4}>Recent Activity</Heading>
        <List spacing={3}>
          {activity.map((item, index) => (
            <ListItem key={index}>
              <Flex align="center" gap={3}>
                <Avatar size="sm" src={item.Campaign.cover_image} />
                <Box flex="1">
                  <Text fontWeight="medium">{item.Campaign.title}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {formatDistanceToNow(new Date(item.donation_date), { addSuffix: true })}
                  </Text>
                </Box>
                <Badge colorScheme="green">
                  ${item.amount.toLocaleString()}
                </Badge>
              </Flex>
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Card>
  );
};

const CampaignProgressCard = ({ campaigns, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardBody>
          <SkeletonText noOfLines={4} spacing='4' />
        </CardBody>
      </Card>
    );
  }

  const progress = (campaigns.totalRaised / campaigns.totalGoal) * 100;

  return (
    <Card>
      <CardBody>
        <Stack spacing={4}>
          <Heading size="md">Campaign Progress</Heading>
          <Progress value={progress} colorScheme="brand" rounded="md" />
          <Flex justify="space-between">
            <Text>Raised: ${campaigns.totalRaised.toLocaleString()}</Text>
            <Text>Goal: ${campaigns.totalGoal.toLocaleString()}</Text>
          </Flex>
          <SimpleGrid columns={3} gap={4}>
            <Box textAlign="center">
              <Text fontWeight="bold">{campaigns.active}</Text>
              <Text fontSize="sm" color="gray.500">Active</Text>
            </Box>
            <Box textAlign="center">
              <Text fontWeight="bold">{campaigns.completed}</Text>
              <Text fontSize="sm" color="gray.500">Completed</Text>
            </Box>
            <Box textAlign="center">
              <Text fontWeight="bold">{campaigns.draft}</Text>
              <Text fontSize="sm" color="gray.500">Draft</Text>
            </Box>
          </SimpleGrid>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default function DashboardStats({ stats, isLoading, error }) {
  if (error) {
    return <Text color="red.500">Error loading dashboard stats</Text>;
  }

  const currentStats = stats?.overview || {};
  const previousStats = stats?.previousPeriod || {};

  return (
    <Stack spacing={6}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <StatCard
          title="Total Donations"
          value={currentStats.totalDonations || 0}
          previousValue={previousStats.totalDonations}
          icon={FaDollarSign}
          isLoading={isLoading}
          format="currency"
        />
        <StatCard
          title="Total Donors"
          value={currentStats.totalDonors || 0}
          previousValue={previousStats.totalDonors}
          icon={FaUsers}
          isLoading={isLoading}
        />
        <StatCard
          title="Monthly Growth"
          value={currentStats.monthlyGrowth || 0}
          previousValue={previousStats.monthlyGrowth}
          icon={FaChartLine}
          isLoading={isLoading}
          format="currency"
        />
        <StatCard
          title="Avg. Donation"
          value={currentStats.averageDonation || 0}
          previousValue={previousStats.averageDonation}
          icon={FaCrown}
          isLoading={isLoading}
          format="currency"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <CampaignProgressCard
          campaigns={stats?.campaigns || {}}
          isLoading={isLoading}
        />
        <RecentActivityCard
          activity={stats?.recentActivity || []}
          isLoading={isLoading}
        />
      </SimpleGrid>
    </Stack>
  );
}
