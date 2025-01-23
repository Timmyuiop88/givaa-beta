'use client'
import {
  Avatar,
  Box,
  Text,
  Heading,
  Button,
  Progress,
  Card,
  CardBody,
  HStack,
  VStack,
  Tag,
  Icon,
} from "@chakra-ui/react";
import Image from 'next/image'
import { FiClock, FiTrendingUp } from "react-icons/fi";
import { useRouter } from 'next/navigation';

export default function Fund(props) {
  const router = useRouter();
  const {
    w,
    fundraiserName,
    Description,
    Amount,
    TimeRemaining,
    Percent,
    coverImage,
    id
  } = props;
    
  const handleClick = () => {
    router.push(`/fundraiser/${id}`);
  };

  return (
    <Card 
      minW={w} 
      maxW={w} 
      m={'auto'} 
      bg={'white'} 
      border={'1px solid'}
      borderColor={'gray.100'}
      borderRadius={'2xl'}
      overflow="hidden"
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{ 
        transform: 'translateY(-8px)',
        shadow: 'xl',
        borderColor: 'yellow.400',
      }}
      onClick={handleClick}
      position="relative"
    >
      <Box position="relative" h="200px">
        <Image
          fill
          style={{ objectFit: 'cover' }}
          src={coverImage || '/images/donate.png'}
          alt={fundraiserName}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {Percent >= 75 && (
          <Tag
            position="absolute"
            top={4}
            right={4}
            colorScheme="yellow"
            borderRadius="full"
            px={3}
            py={1}
            fontSize="xs"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Icon as={FiTrendingUp} />
            Trending
          </Tag>
        )}
      </Box>

      <CardBody p={5}>
        <VStack align="stretch" spacing={4}>
          <Heading 
            size="md"
            noOfLines={2}
            lineHeight="1.4"
          >
            {fundraiserName}
          </Heading>

          <Text
            color={'gray.600'}
            fontSize={'sm'}
            noOfLines={2}
            lineHeight="1.6"
          >
            {Description}
          </Text>

          <Box>
            <Progress 
              value={Percent} 
              size="sm" 
              borderRadius="full" 
              colorScheme="yellow"
              bg="gray.100"
              hasStripe
              isAnimated
            />
            <HStack justify="space-between" mt={2} fontSize="sm" color="gray.600">
              <Text fontWeight="medium">{Percent}% Funded</Text>
              <HStack spacing={1}>
                <Icon as={FiClock} />
                <Text>{TimeRemaining} days left</Text>
              </HStack>
            </HStack>
          </Box>

          <Box 
            p={4} 
            bg="gray.50" 
            borderRadius="xl"
          >
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                ${Amount?.toLocaleString()}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Goal Amount
              </Text>
            </VStack>
          </Box>

          <Button
            size="lg"
            bg="#FFBE37"
            color="white"
            _hover={{ 
              bg: "#FFD700",
              transform: 'translateY(-2px)',
              shadow: 'md'
            }}
            _active={{
              bg: "#FFBE37",
              transform: 'translateY(0)',
            }}
            borderRadius="xl"
            fontWeight="bold"
            transition="all 0.2s"
            w="full"
          >
            Donate now
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
}