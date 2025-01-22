"use client";
import {
  Box,
  Button,
  HStack,
  useToast,
  VStack,
  Spinner,
  Text,
  Center,
} from "@chakra-ui/react";
import { useRouter, useParams } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import NavBar from "../../../../components/navBar";
import Wizard from "../../../../wizard/page";
import { useQuery } from '@tanstack/react-query';

export default function EditCampaignContent() {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();

  const { data: campaign, isLoading, error } = useQuery({
    queryKey: ['campaign', params.id],
    queryFn: async () => {
      const res = await fetch(`/api/campaigns/${params.id}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to fetch campaign');
      }
      return res.json();
    },
  });

  const handleClose = () => {
    if (window.confirm('Are you sure you want to leave? Your changes may not be saved.')) {
      router.push('/user/campaigns');
    }
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <NavBar />
      <Box px={{ base: 4, md: 8, lg: 16 }} py={8}>
        <VStack spacing={8} align="stretch">
          <HStack justify="space-between">
            <Button
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              onClick={handleClose}
            >
              Back to Campaigns
            </Button>
          </HStack>

          {isLoading ? (
            <Center py={12}>
              <VStack spacing={4}>
                <Spinner 
                  size="xl" 
                  color="orange.500" 
                  thickness="4px"
                />
                <Text color="gray.600">Loading campaign details...</Text>
              </VStack>
            </Center>
          ) : error ? (
            <Center py={12}>
              <VStack spacing={4}>
                <Text color="red.500" fontSize="lg">
                  {error.message || 'Failed to load campaign'}
                </Text>
                <Button
                  onClick={() => router.push('/user/campaigns')}
                  colorScheme="orange"
                  variant="outline"
                >
                  Return to Campaigns
                </Button>
              </VStack>
            </Center>
          ) : campaign ? (
            <Wizard initialData={campaign} mode="edit" />
          ) : null}
        </VStack>
      </Box>
    </Box>
  );
} 