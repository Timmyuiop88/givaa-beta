'use client'

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

  } from "@chakra-ui/react";
  import Link from 'next/link';
  import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
  import { AiFillGift } from "react-icons/ai";
  import { BsGearFill } from "react-icons/bs";
  import { FiMenu, FiSearch, FiHome,FiTrendingUp,
    FiChevronDown
    ,FiCompass,FiStar,FiSettings,FiBell} from "react-icons/fi";
  import { HiCode, HiCollection } from "react-icons/hi";
  import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import SignOut from "../auth/signout";

const LinkItems = [
  { name: 'Home', icon: <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_482_1046)">
  <path d="M9.17404 3.4458H2.79419V9.82565H9.17404V3.4458Z" stroke="#F68A50" stroke-width="1.56241" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20.7591 2.00635H12.947V9.81841H20.7591V2.00635Z" stroke="#F68A50" stroke-width="1.56241" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.1997 13.4714H12.8198V19.8513H19.1997V13.4714Z" stroke="#F68A50" stroke-width="1.56241" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.17404 13.4714H2.79419V19.8513H9.17404V13.4714Z" stroke="#F68A50" stroke-width="1.56241" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
  <clipPath id="clip0_482_1046">
  <rect width="21.8738" height="21.8738" fill="white" transform="translate(0.0603027 0.71167)"/>
  </clipPath>
  </defs>
  </svg>
  , path: '/user' },
  { name: 'Campaigns', icon: FiTrendingUp, path: 'user/campaigns' },
  { name: 'Explore', icon: FiCompass, path: '/user/explore' },
  { name: 'Favourites', icon: FiStar, path: '/user/favourites' },
  { name: 'Settings', icon: FiSettings, path: '/user/settings' },

];


 
const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
     
      <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"

          fontWeight="bold">
   GIVAA
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon: svgHtml, children, path, ...rest }) => {
  return (
    <Link href={path} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {svgHtml && (
          <Box
            as="span"
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
         // Insert SVG as HTML
          >
            {svgHtml} 
          </Box>
        )}
        {children}
      </Flex>
    </Link>
  );
};

  
  const MobileNav = ({ onOpen, ...rest }) => {
    return (
      <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

  
        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"

          fontWeight="bold">
   GIVAA
        </Text>
  
        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">Justina Clark</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <SignOut/>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    );
  };
export default function Navb(){
  const { isOpen, onOpen, onClose } = useDisclosure();
  return( <>
 <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
        <MobileNav onOpen={onOpen} />
  
</>)
}