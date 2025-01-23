"use client";

import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  Flex,
  Icon,
  IconButton,
  CloseButton,
  Text,
  useDisclosure,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  VStack,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { 
  FiMenu, 
  FiSettings, 
  FiBell, 
  FiLogOut, 
  FiUser, 
  FiChevronDown,
  FiHome,
  FiDollarSign,
  FiBarChart2,
  FiCreditCard,
  FiCheckCircle,
  FiActivity
} from "react-icons/fi";
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LinkItems = [
  { 
    name: "Dashboard", 
    icon: FiHome, 
    path: "/user",
    description: "Overview & analytics"
  },
  { 
    name: "My Campaigns", 
    icon: FiBarChart2, 
    path: "/user/campaigns",
    description: "Manage your fundraisers"
  },
  { 
    name: "Transactions", 
    icon: FiDollarSign, 
    path: "/user/transactions",
    description: "Payment history"
  },
  { 
    name: "Verification", 
    icon: FiCheckCircle, 
    path: "/user/verification",
    description: "Account verification status"
  },
  { 
    name: "Payout Methods", 
    icon: FiCreditCard, 
    path: "/user/payouts",
    description: "Manage withdrawal options"
  },
  { 
    name: "Activity Log", 
    icon: FiActivity, 
    path: "/user/activity",
    description: "Recent account activities"
  }
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w="full"
      h="100vh"
      position="fixed"
      {...rest}
    >
      <Flex h="16" alignItems="center" mx="4" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="#f68950"
        >
          GIVAA
        </Text>
        <CloseButton onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          <VStack align="start" spacing={0}>
            <Text fontSize="14px">{link.name}</Text>
            <Text fontSize="12px" color="gray.500">
              {link.description}
            </Text>
          </VStack>
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, path, ...rest }) => {
  return (
    <Link href={path} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="3"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color="gray.600"
        _hover={{
          bg: "#fff5ef",
          color: "#f68950",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            as={icon}
            _groupHover={{
              color: "#f68950",
            }}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, isOpen, ...rest }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Flex
      px="4"
      height="14"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      position="fixed"
      top="0"
      w="100%"
      zIndex={2}
      {...rest}
    >
      <IconButton
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        fontSize="2xl"
        fontWeight="bold"
        color="#f68950"
        ml="4"
      >
        GIVAA
      </Text>

      <HStack spacing="4" ml="auto">
        
        <IconButton
          size="md"
          variant="ghost"
          aria-label="notifications"
          icon={<FiBell />}
        />

        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack>
              <Avatar
                size={"sm"}
                name={session?.user?.name || 'User'}
                src={session?.user?.image}
                bg="#f68950"
              />
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm" fontWeight="medium">
                  {session?.user?.name || 'User'}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {session?.user?.email}
                </Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg="white"
            borderColor="gray.200"
          >
            <Link href="/user/profile">
              <MenuItem icon={<FiUser />}>Profile</MenuItem>
            </Link>
            <Link href="/user/settings">
              <MenuItem icon={<FiSettings />}>Settings</MenuItem>
            </Link>
            <MenuDivider />
            <MenuItem 
              icon={<FiLogOut />} 
              onClick={handleLogout}
              color="red.500"
              _hover={{
                bg: 'red.50',
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="relative">
      {/* Mobile Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Box
        ml={0}
        transition="margin-left 0.3s"
        position="relative"
        w="100vw"
      >
        <MobileNav onOpen={onOpen} isOpen={isOpen} />
        <Box mt="14" mx="0" px="0">
          {/* Page content will be rendered here */}
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
