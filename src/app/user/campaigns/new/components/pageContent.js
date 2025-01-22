"use client";
import {
  Box,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  SimpleGrid,
  Text,
  Button,
  Card,
  CardBody,
  Stack,
  Heading,
  Progress,
  CardFooter,
  Center,
  Spinner,
  HStack
} from "@chakra-ui/react";
import Image from "next/image";
import NavBar from "../../../components/navBar";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { signIn, signOut, useSession } from "next-auth/react";
import Wizard from "../../../wizard/page";
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

export default function PageNewCampain() {
  const router = useRouter();

  const handleClose = () => {
    if (window.confirm('Are you sure you want to leave? Your progress will be lost.')) {
      router.push('/user/campaigns');
    }
  };

  return (
    <Box minH="100vh" bg={"#edf2f7"}>
      <NavBar />
      <Box px={{ base: 0, md: 50 }} p="4">
        <HStack justify="space-between" mb={4}>
          <Button
            leftIcon={<FiArrowLeft />}
            variant="ghost"
            onClick={handleClose}
          >
            Back to Campaigns
          </Button>
        </HStack>
        <Wizard />
      </Box>
    </Box>
  );
}
