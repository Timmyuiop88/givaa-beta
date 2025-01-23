'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Flex,
  Divider,
  Spinner,
  useToast,
  Center
} from '@chakra-ui/react';
import {
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiCreditCard,
  FiArrowRight
} from 'react-icons/fi';

const StatCard = ({ title, value, icon: Icon, change, helperText, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardBody>
          <Center minH="100px">
            <Spinner color="orange.500" />
          </Center>
        </CardBody>
      </Card>
    );
  }

  const isPositive = change > 0;
  const changeText = isPositive ? `+${change}%` : `${change}%`;
  const changeColor = isPositive ? "green.500" : "red.500";

  return (
    <Card>
      <CardBody>
        <Flex justify="space-between" align="start">
          <Box flex="1">
            <Text color="gray.500" fontSize="sm">
              {title}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" mt={2}>
              {typeof value === 'number' ? `$${value.toFixed(2)}` : value}
            </Text>
            {helperText && (
              <Text fontSize="sm" color="gray.500" mt={1}>
                {helperText}
              </Text>
            )}
          </Box>
          <Box
            p={2}
            bg="orange.50"
            color="orange.500"
            borderRadius="lg"
          >
            {Icon && <Icon size={20} />}
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

const BalanceCard = ({ balance, pendingBalance, isLoading }) => {
  const toast = useToast();

  const handleWithdraw = () => {
    toast({
      title: "Coming Soon",
      description: "Withdrawal functionality will be available soon.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  if (isLoading) {
    return (
      <Card
        borderRadius="xl"
        bgGradient="linear(to-r, #f68950, #ff7e47)"
        color="white"
        boxShadow="lg"
        mb={6}
      >
        <CardBody p={6}>
          <Center minH="200px">
            <Spinner color="white" size="xl" />
          </Center>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card
      borderRadius="xl"
      bgGradient="linear(to-r, #f68950, #ff7e47)"
      color="white"
      boxShadow="lg"
      mb={6}
    >
      <CardBody p={6}>
        <VStack align="stretch" spacing={6}>
          <Box>
            <Text fontSize="sm" opacity={0.9}>Available Balance</Text>
            <Heading size="lg" mt={2}>${balance.toFixed(2)}</Heading>
          </Box>
          
          <Box>
            <Text fontSize="sm" opacity={0.9}>Pending Balance</Text>
            <Text fontSize="xl" fontWeight="semibold" mt={1}>
              ${pendingBalance.toFixed(2)}
            </Text>
            <Text fontSize="xs" mt={1} opacity={0.8}>
              Will be available in 7-14 days
            </Text>
          </Box>

          <HStack spacing={4}>
            <Button
              bg="white"
              color="#f68950"
              _hover={{ bg: "gray.100" }}
              size="sm"
              leftIcon={<FiCreditCard />}
              onClick={handleWithdraw}
            >
              Withdraw Funds
            </Button>
            <Button
              variant="outline"
              colorScheme="white"
              size="sm"
              _hover={{ bg: "whiteAlpha.200" }}
              onClick={() => toast({
                title: "Coming Soon",
                description: "Transaction history will be available soon.",
                status: "info",
                duration: 3000,
                isClosable: true,
              })}
            >
              View History
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const CampaignProgress = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <Card borderRadius="xl" boxShadow="sm">
        <CardBody>
          <Center minH="200px">
            <Spinner color="orange.500" size="xl" />
          </Center>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card borderRadius="xl" boxShadow="sm">
      <CardBody>
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Campaign Progress
        </Text>
        <VStack spacing={4} align="stretch">
          <Box>
            <Flex justify="space-between" mb={2}>
              <Text>Active Campaigns</Text>
              <Text fontWeight="semibold">{stats.active || 0}</Text>
            </Flex>
            <Flex justify="space-between" mb={2}>
              <Text>Completed</Text>
              <Text fontWeight="semibold">{stats.completed || 0}</Text>
            </Flex>
            <Flex justify="space-between" mb={2}>
              <Text>Draft</Text>
              <Text fontWeight="semibold">{stats.draft || 0}</Text>
            </Flex>
          </Box>
          <Divider />
          <Box>
            <Flex justify="space-between" mb={2}>
              <Text>Total Raised</Text>
              <Text fontWeight="semibold">${stats.totalRaised?.toFixed(2) || '0.00'}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Total Goal</Text>
              <Text fontWeight="semibold">${stats.totalGoal?.toFixed(2) || '0.00'}</Text>
            </Flex>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

const RecentActivity = ({ activities = [], isLoading }) => {
  if (isLoading) {
    return (
      <Card borderRadius="xl" boxShadow="sm">
        <CardBody>
          <Center minH="200px">
            <Spinner color="orange.500" size="xl" />
          </Center>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card borderRadius="xl" boxShadow="sm">
      <CardBody>
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="lg" fontWeight="semibold">
            Recent Activity
          </Text>
          <Button
            variant="ghost"
            colorScheme="orange"
            size="sm"
            rightIcon={<FiArrowRight />}
          >
            View All
          </Button>
        </Flex>
        <VStack spacing={4} align="stretch">
          {activities.map((activity, index) => (
            <Box key={activity.uuid || index}>
              <Flex justify="space-between" align="center">
                <VStack align="start" spacing={0}>
                  {activity.transaction_type === "DONATION" && (
                    <>
                      <Text fontWeight="medium">
                        New donation received
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        ${activity.amount} • {activity.status.toLowerCase()}
                      </Text>
                    </>
                  )}
                  {activity.transaction_type === "WITHDRAWAL" && (
                    <>
                      <Text fontWeight="medium">
                        Funds withdrawn
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        ${activity.amount} • {activity.status.toLowerCase()}
                      </Text>
                    </>
                  )}
                </VStack>
                <Text fontSize="sm" color="gray.500">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </Text>
              </Flex>
              {index < activities.length - 1 && <Divider mt={4} />}
            </Box>
          ))}
          {activities.length === 0 && (
            <Text color="gray.500" textAlign="center" py={4}>
              No recent activity
            </Text>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default function DashboardContent() {
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    }
  });

  const { data: balanceData, isLoading: balanceLoading } = useQuery({
    queryKey: ['userBalance'],
    queryFn: async () => {
      const res = await fetch('/api/balance');
      if (!res.ok) throw new Error('Failed to fetch balance');
      return res.json();
    }
  });

  return (
    <Box p={8}>
      {/* Balance Card */}
      <BalanceCard 
        balance={balanceData?.balance?.available || 0}
        pendingBalance={balanceData?.balance?.pending || 0}
        isLoading={balanceLoading}
      />

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <StatCard
          title="Total Donations"
          value={statsData?.overview?.totalDonations || 0}
          icon={FiDollarSign}
          change={statsData?.overview?.monthlyGrowth || 0}
          helperText="from last month"
          isLoading={statsLoading}
        />
        <StatCard
          title="Total Donors"
          value={statsData?.overview?.totalDonors || 0}
          icon={FiUsers}
          change={statsData?.donors?.total || 0}
          helperText="total unique donors"
          isLoading={statsLoading}
        />
        <StatCard
          title="Monthly Growth"
          value={statsData?.overview?.monthlyGrowth || 0}
          icon={FiTrendingUp}
          change={statsData?.overview?.monthlyGrowth || 0}
          helperText="from last month"
          isLoading={statsLoading}
        />
        <StatCard
          title="Avg. Donation"
          value={statsData?.overview?.averageDonation || 0}
          icon={FiDollarSign}
          change={statsData?.overview?.averageDonation || 0}
          helperText="per donation"
          isLoading={statsLoading}
        />
      </SimpleGrid>

      {/* Campaign Progress and Recent Activity */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <CampaignProgress 
          stats={statsData?.campaigns || {}}
          isLoading={statsLoading}
        />
        <RecentActivity 
          activities={balanceData?.recentTransactions || []}
          isLoading={balanceLoading}
        />
      </SimpleGrid>
    </Box>
  );
} 