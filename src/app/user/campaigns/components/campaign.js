"use client";
import {
  Box,
  Text,
  Image,
  Progress,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  VStack,
  useToast,
  Portal,
} from "@chakra-ui/react";
import { FiMoreVertical, FiEdit2, FiTrash2, FiCheck, FiPause } from "react-icons/fi";
import { useUpdateCampaign, useDeleteCampaign } from "../../../hooks/useCampaigns";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function CampaignCard({ campaign }) {
  const router = useRouter();
  const toast = useToast();
  const updateCampaign = useUpdateCampaign();
  const deleteCampaign = useDeleteCampaign();

  const handleEdit = () => {
    router.push(`/user/campaigns/edit/${campaign.campaign_id}`);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const updateData = {
        status: newStatus,
        ...(newStatus === 'ACTIVE' && {
          start_date: new Date().toISOString()
        })
      };

      await updateCampaign.mutateAsync({
        id: parseInt(campaign.campaign_id),
        data: updateData
      });
      
      toast({
        title: newStatus === 'ACTIVE' ? 'Campaign published' : 'Campaign unpublished',
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error('Status change error:', error);
      toast({
        title: "Error updating campaign",
        description: error.message || "Please try again later",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        await deleteCampaign.mutateAsync(parseInt(campaign.campaign_id));
        toast({
          title: "Campaign deleted",
          status: "success",
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: "Error deleting campaign",
          status: "error",
          duration: 3000,
        });
      }
    }
  };

  const progress = Math.round((campaign.current_amount / campaign.goal_amount) * 100) || 0;
  const daysLeft = Math.ceil((new Date(campaign.end_date) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-4px)", shadow: "md" }}
    >
      <Box position="relative">
        <Image
          src={campaign.cover_image || "/placeholder.jpg"}
          alt={campaign.title}
          height="200px"
          width="100%"
          objectFit="cover"
        />
        <Badge
          position="absolute"
          top={4}
          right={4}
          colorScheme={campaign.status === "DRAFT" ? "gray" : "green"}
          px={3}
          py={1}
          borderRadius="full"
          textTransform="capitalize"
        >
          {campaign.status.toLowerCase()}
        </Badge>
      </Box>

      <Box p={5}>
        <HStack justify="space-between" mb={3}>
          <Text fontSize="xl" fontWeight="bold" noOfLines={1}>
            {campaign.title}
          </Text>
          <Menu isLazy placement="bottom-end">
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={IconButton}
                  icon={<FiMoreVertical />}
                  variant="ghost"
                  size="sm"
                  borderRadius="full"
                  aria-label="Campaign options"
                  isActive={isOpen}
                  _hover={{ bg: 'gray.100' }}
                  _active={{ bg: 'gray.200' }}
                />
                <Portal>
                  <MenuList
                    shadow="lg"
                    py={2}
                    minW="160px"
                  >
                    <MenuItem
                      icon={<FiEdit2 />}
                      onClick={handleEdit}
                      _hover={{ bg: 'gray.100' }}
                      command="⌘E"
                    >
                      Edit
                    </MenuItem>
                    {campaign.status === "DRAFT" ? (
                      <MenuItem 
                        icon={<FiCheck />} 
                        color="green.500"
                        onClick={() => handleStatusChange("ACTIVE")}
                        _hover={{ bg: 'gray.100' }}
                        command="⌘P"
                      >
                        Publish
                      </MenuItem>
                    ) : campaign.status === "ACTIVE" && (
                      <MenuItem 
                        icon={<FiPause />} 
                        color="orange.500"
                        onClick={() => handleStatusChange("DRAFT")}
                        _hover={{ bg: 'gray.100' }}
                        command="⌘U"
                      >
                        Unpublish
                      </MenuItem>
                    )}
                    <MenuItem 
                      icon={<FiTrash2 />} 
                      color="red.500"
                      onClick={handleDelete}
                      _hover={{ bg: 'gray.100' }}
                      command="⌘⌫"
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Portal>
              </>
            )}
          </Menu>
        </HStack>

        <Text color="gray.600" noOfLines={2} mb={4}>
          {campaign.description}
        </Text>

        <Progress 
          value={progress} 
          size="sm" 
          colorScheme="orange" 
          borderRadius="full" 
          mb={4}
        />

        <VStack spacing={2} align="stretch">
          <HStack justify="space-between">
            <Text fontWeight="semibold">
              ${campaign.current_amount.toLocaleString()}
            </Text>
            <Text color="gray.600">
              of ${campaign.goal_amount.toLocaleString()}
            </Text>
          </HStack>

          <HStack justify="space-between" fontSize="sm" color="gray.500">
            <Text>{progress}% Funded</Text>
            <Text>{daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}</Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
} 