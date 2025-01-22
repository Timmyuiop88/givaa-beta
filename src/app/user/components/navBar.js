"use client";

import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  CloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
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
import { FiMenu, FiSearch, FiCompass, FiStar, FiSettings, FiBell, FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LinkItems = [
  {
    name: "Overview",
    icon: (
      <svg
        width="22"
        height="23"
        viewBox="0 0 22 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_482_1046)">
          <path
            d="M9.17404 3.4458H2.79419V9.82565H9.17404V3.4458Z"
            stroke="currentColor"
            strokeWidth="1.56241"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.7591 2.00635H12.947V9.81841H20.7591V2.00635Z"
            stroke="currentColor"
            strokeWidth="1.56241"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.1997 13.4714H12.8198V19.8513H19.1997V13.4714Z"
            stroke="currentColor"
            strokeWidth="1.56241"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.17404 13.4714H2.79419V19.8513H9.17404V13.4714Z"
            stroke="currentColor"
            strokeWidth="1.56241"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_482_1046">
            <rect
              width="21.8738"
              height="21.8738"
              fill="white"
              transform="translate(0.0603027 0.71167)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    path: "/user",
  },
  { 
    name: "Campaigns", 
    icon: (
      <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.9974 2.28198L1.8833 6.83902L10.9974 11.3961L20.1114 6.83902L10.9974 2.28198Z" stroke="currentColor" strokeWidth="1.56241" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.8833 15.9531L10.9974 20.5102L20.1114 15.9531" stroke="currentColor" strokeWidth="1.56241" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.8833 11.396L10.9974 15.953L20.1114 11.396" stroke="currentColor" strokeWidth="1.56241" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ), 
    path: "/user/campaigns" 
  },
  { name: "Explore", icon: FiCompass, path: "/user/explore" },
  { name: "Favourites", icon: FiStar, path: "/user/favourites" },
  { name: "Settings", icon: FiSettings, path: "/user/settings" },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "white")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "60%", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontWeight="bold"
        >
          GIVAA
        </Text>
        <CloseButton display={{ base: "flex", md: "flex" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, path, ...rest }) => {
  const IconComponent = typeof icon === 'function' ? icon : () => icon;
  
  return (
    <Link href={path} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#f68950",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Box
            as="span"
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
          >
            {typeof icon === 'function' ? <Icon as={IconComponent} /> : icon}
          </Box>
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
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
      ml={{ base: 0, md: 0 }}
      px={{ base: 4, md: "50px" }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.800")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "flex" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "flex" }}
        fontSize="2xl"
        fontWeight="bold"
        color={'#f68950'}
      >
        GIVAA
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="notifications"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
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
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{session?.user?.name || 'User'}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {session?.user?.email}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
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
        </Flex>
      </HStack>
    </Flex>
  );
};

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "none" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent bg={'none'} onClick={onClose}>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
    </>
  );
};

export default NavBar;
