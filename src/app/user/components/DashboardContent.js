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
  useToast,
  Center,
  Skeleton,
  SkeletonText,
  SkeletonCircle
} from '@chakra-ui/react';
import {
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiCreditCard,
  FiArrowRight
} from 'react-icons/fi';
import NavBar from './navBar';

const StatCard = ({ title, value, icon: Icon, change, helperText, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardBody>
          <Flex justify="space-between" align="start">
            <Box flex="1">
              <SkeletonText noOfLines={1} width="80px" mb={2} />
              <Skeleton height="28px" width="120px" mb={2} />
              <SkeletonText noOfLines={2} width="100px" />
            </Box>
            <Skeleton borderRadius="lg" height="36px" width="36px" />
          </Flex>
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
              {title === "Total Donors" ? value : `$${value.toFixed(2)}`}
            </Text>
            <Text fontSize="sm" color={changeColor} mt={1}>
              {changeText}
            </Text>
            {helperText && (
              <Text fontSize="sm" color="gray.500">
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
          <VStack align="stretch" spacing={6}>
            <Box>
              <SkeletonText noOfLines={1} width="120px" speed={1} />
              <Skeleton height="40px" width="200px" mt={2} speed={1} />
            </Box>
            <Box>
              <SkeletonText noOfLines={1} width="120px" speed={1} />
              <Skeleton height="32px" width="150px" mt={2} speed={1} />
              <SkeletonText noOfLines={1} width="180px" mt={1} speed={1} />
            </Box>
            <HStack spacing={4}>
              <Skeleton height="32px" width="120px" speed={1} />
              <Skeleton height="32px" width="100px" speed={1} />
            </HStack>
          </VStack>
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
              onClick={() => toast({
                title: "Coming Soon",
                description: "Withdrawal functionality will be available soon.",
                status: "info",
                duration: 3000,
                isClosable: true,
              })}
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
          <SkeletonText noOfLines={1} width="150px" mb={6} />
          <Skeleton height="8px" mb={6} borderRadius="full" />
          <SimpleGrid columns={3} spacing={4}>
            {[1, 2, 3].map((i) => (
              <Box key={i} textAlign="center" p={4} bg="gray.50" borderRadius="lg">
                <Skeleton height="28px" mb={2} />
                <SkeletonText noOfLines={1} width="60px" mx="auto" />
              </Box>
            ))}
          </SimpleGrid>
        </CardBody>
      </Card>
    );
  }

  const total = (stats.active || 0) + (stats.completed || 0) + (stats.draft || 0);
  const activePercent = total > 0 ? ((stats.active || 0) / total) * 100 : 0;
  const completedPercent = total > 0 ? ((stats.completed || 0) / total) * 100 : 0;
  const draftPercent = total > 0 ? ((stats.draft || 0) / total) * 100 : 0;

  return (
    <Card borderRadius="xl" boxShadow="sm">
      <CardBody>
        <Text fontSize="lg" fontWeight="semibold" mb={6}>
          Campaign Progress
        </Text>
        
        <Box mb={6} position="relative">
          <Box
            w="100%"
            h="8px"
            bg="gray.100"
            borderRadius="full"
            overflow="hidden"
            display="flex"
          >
            <Box
              w={`${activePercent}%`}
              h="100%"
              bg="orange.400"
              transition="width 0.3s ease"
            />
            <Box
              w={`${completedPercent}%`}
              h="100%"
              bg="green.400"
              transition="width 0.3s ease"
            />
            <Box
              w={`${draftPercent}%`}
              h="100%"
              bg="gray.300"
              transition="width 0.3s ease"
            />
          </Box>
        </Box>

        <SimpleGrid columns={3} spacing={4}>
          <Box textAlign="center" p={4} bg="gray.50" borderRadius="lg">
            <Text fontSize="2xl" fontWeight="bold" color="orange.400">
              {stats.active || 0}
            </Text>
            <Text fontSize="sm" color="gray.600">Active</Text>
          </Box>
          
          <Box textAlign="center" p={4} bg="gray.50" borderRadius="lg">
            <Text fontSize="2xl" fontWeight="bold" color="green.400">
              {stats.completed || 0}
            </Text>
            <Text fontSize="sm" color="gray.600">Completed</Text>
          </Box>
          
          <Box textAlign="center" p={4} bg="gray.50" borderRadius="lg">
            <Text fontSize="2xl" fontWeight="bold" color="gray.400">
              {stats.draft || 0}
            </Text>
            <Text fontSize="sm" color="gray.600">Draft</Text>
          </Box>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

const RecentActivity = ({ activities = [], isLoading }) => {
  if (isLoading) {
    return (
      <Card borderRadius="xl" boxShadow="sm">
        <CardBody>
          <Flex justify="space-between" align="center" mb={4}>
            <SkeletonText noOfLines={1} width="120px" />
            <Skeleton height="32px" width="80px" />
          </Flex>
          <VStack spacing={4} align="stretch">
            {[1, 2, 3].map((i) => (
              <Box key={i}>
                <Flex justify="space-between" align="center">
                  <VStack align="start" spacing={1}>
                    <Skeleton height="20px" width="150px" />
                    <Skeleton height="16px" width="100px" />
                  </VStack>
                  <Skeleton height="16px" width="80px" />
                </Flex>
                {i < 3 && <Divider mt={4} />}
              </Box>
            ))}
          </VStack>
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
    <>
    <NavBar />
     <Box p={8}>
      <BalanceCard 
        balance={balanceData?.balance?.available || 0}
        pendingBalance={balanceData?.balance?.pending || 0}
        isLoading={balanceLoading}
      />

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
    </>
  );
} 