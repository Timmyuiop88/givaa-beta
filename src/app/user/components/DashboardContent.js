'use client';

import { Box } from "@chakra-ui/react";
import DashboardStats from "./stats";
import NavBar from "./navBar";
import { useQuery } from '@tanstack/react-query';

export default function DashboardContent() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
  });

  console.log(stats)

  return (
    <>
      <NavBar />
      <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py={6}>
        <DashboardStats 
          stats={stats} 
          isLoading={isLoading} 
          error={error} 
        />
      </Box>
    </>
  );
} 