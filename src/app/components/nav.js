'use client'
import {
  Box,
  Stack,
  Button,
  Link,
  Hide,
  Text,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Show,
  chakra,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  AiOutlineMenu,
  AiFillHome,
  AiOutlineInbox,
  AiOutlineSearch,
  AiFillBell,
} from "react-icons/ai";
import {GrFormClose} from "react-icons/gr";
import NextLink from 'next/link'
import { useEffect } from 'react';

// Animation keyframes using CSS syntax
const gradientAnimation = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

export default function Nav() {
  const mobileNav = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  const MotionBox = motion(Box);
  const MotionButton = motion(Button);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (!isMobile && mobileNav.isOpen) {
      mobileNav.onClose();
    }
  }, [isMobile, mobileNav]);

  const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
    return (
      <Link 
        as={NextLink}
        href={to}
        _hover={{ textDecoration: 'none' }}
      >
        <Text
          fontSize={{ base: "17px", md: "18px", lg: "19px" }}
          display="block"
          position="relative"
          transition="all 0.3s ease"
          color="gray.100"
          _hover={{
            transform: "translateY(-2px)",
            color: "#FFBE37"
          }}
          _after={{
            content: '""',
            position: "absolute",
            bottom: "-2px",
            left: "0",
            width: "0%",
            height: "2px",
            backgroundColor: "#FFBE37",
            transition: "all 0.3s ease",
          }}
          _hover={{
            _after: {
              width: "100%"
            }
          }}
          {...rest}
        >
          {children}
        </Text>
      </Link>
    );
  };

  return (
    <>
      <MotionBox
        position="sticky"
        top={0}
        zIndex={100}
        backdropFilter="blur(10px)"
        bg="none"
      >
        <Stack
          pl={{ base: "0", md: "20px" }}
          pr={{ base: "0", md: "20px" }}
          maxW="7xl"
          margin="auto"
          py={1}
        >
          <Box
            w="100%"
            h={{ base: "70px", md: "85px" }}
            borderRadius={{ base: "0", md: "50px" }}
            display="flex"
            px={{ base: 4, md: 6 }}
            justifyContent="space-between"
            alignItems="center"
            bg="rgba(49, 49, 49, 0.95)"
            boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          >
            <Show below="md">
              <Tooltip label="Search" placement="right">
                <IconButton
                  aria-label="Search"
                  icon={<AiOutlineSearch size="20px" />}
                  variant="ghost"
                  color="white"
                  _hover={{ bg: "whiteAlpha.200" }}
                />
              </Tooltip>
            </Show>

            <Show above="md">
              <HStack spacing={{ md: 4, lg: 8 }} px={{ md: 4, lg: 10 }}>
                <MenuItem to="/explore">Explore</MenuItem>
                <MenuItem to="/about">About</MenuItem>
                <MenuItem to="/donation">Donation</MenuItem>
              </HStack>
            </Show>

            <Link 
              href="/"
              as={NextLink}
              _hover={{ textDecoration: 'none' }}
            >
              <Text
                fontSize={{ base: "30px", md: "37px" }}
                fontWeight="700"
                bgGradient="linear(to-r, #FFBE37, #FFD700)"
                bgClip="text"
                animation={`${gradientAnimation} 3s ease infinite`}
                letterSpacing="wider"
              >
                GIVAA
              </Text>
            </Link>

            <HStack spacing={{ base: 2, md: 4, lg: 8 }} px={{ md: 4, lg: 10 }}>
              <Show above="md">
                <MenuItem to="/">Blog</MenuItem>
                <MotionButton
                  as={Link}
                  href="/login"
                  border="1px solid white"
                  h="50px"
                  px={6}
                  borderRadius="full"
                  bg="transparent"
                  color="white"
                  _hover={{ bg: "whiteAlpha.200" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign in
                </MotionButton>
                <MotionButton
                  as={Link}
                  href="/signup"
                  h="50px"
                  px={6}
                  borderRadius="full"
                  bg="#FFBE37"
                  color="#1B1B18"
                  _hover={{ bg: "#FFD700" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign up
                </MotionButton>
              </Show>

              <Show below="md">
                <IconButton
                  aria-label={mobileNav.isOpen ? "Close menu" : "Open menu"}
                  icon={mobileNav.isOpen ? <GrFormClose size="24px" /> : <AiOutlineMenu size="24px" />}
                  variant="ghost"
                  color="white"
                  onClick={mobileNav.isOpen ? mobileNav.onClose : mobileNav.onOpen}
                  _hover={{ bg: "whiteAlpha.200" }}
                />
              </Show>
            </HStack>
          </Box>
        </Stack>
      </MotionBox>

      {/* Mobile Navigation Menu */}
      <VStack
        position="fixed"
        top="70px"
        left={0}
        right={0}
        display={mobileNav.isOpen ? "flex" : "none"}
        flexDirection="column"
        p={6}
        pb={8}
        bg="rgba(49, 49, 49, 0.98)"
        spacing={4}
        backdropFilter="blur(10px)"
        borderBottomRadius="20px"
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        zIndex={99}
      >
        <MenuItem to="/explore">Explore</MenuItem>
        <MenuItem to="/about">About</MenuItem>
        <MenuItem to="/donation">Donation</MenuItem>
        <MenuItem to="/">Blog</MenuItem>
        <MotionButton
          as={Link}
          href="/login"
          w="full"
          h="50px"
          borderRadius="full"
          border="1px solid white"
          bg="transparent"
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign in
        </MotionButton>
        <MotionButton
          as={Link}
          href="/signup"
          w="full"
          h="50px"
          borderRadius="full"
          bg="#FFBE37"
          color="#1B1B18"
          _hover={{ bg: "#FFD700" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign up
        </MotionButton>
      </VStack>
    </>
  );
}
