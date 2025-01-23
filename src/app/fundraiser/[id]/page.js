'use client'
import { useParams, useRouter } from 'next/navigation';
import { useCampaignDetails } from '@/app/hooks/useCampaignDetails';
import Nav from '@/app/components/nav';
import {
  Box,
  Container,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Progress,
  Button,
  Image,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Textarea,
  SimpleGrid,
  Center,
  Spinner,
  Skeleton,
  SkeletonText,
  Stack,
  IconButton,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  useToast,
  FormHelperText,
  Checkbox,
  Tag,
  TagLabel,
  TagLeftIcon,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FiHeart, FiShare2, FiMessageCircle, FiHome, FiX, FiFacebook, FiTwitter, FiLink, FiDollarSign, FiClock, FiTag, FiAward, FiZoomIn } from "react-icons/fi";
import Link from 'next/link';

const MotionBox = motion(Box);

// Add this component for section headers
const SectionHeader = ({ title, count }) => (
  <Flex 
    align="center" 
    justify="space-between" 
    mb={6}
    pb={3}
    borderBottom="2px solid"
    borderColor="gray.100"
  >
    <Heading size="lg" color="gray.800">{title}</Heading>
    {count !== undefined && (
      <Tag size="lg" colorScheme="yellow" borderRadius="full">
        {count}
      </Tag>
    )}
  </Flex>
);

export default function FundraiserDetails() {
  const params = useParams();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [donationAmount, setDonationAmount] = useState("");
  const [message, setMessage] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [donationStep, setDonationStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useToast();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);

  const { data: campaign, isLoading, isError } = useCampaignDetails(params.id);

  const handleDonationStepNext = () => {
    if (donationStep === 1 && !donationAmount) {
      toast({
        title: "Please enter an amount",
        status: "warning",
        duration: 2000,
      });
      return;
    }
    setDonationStep(prev => prev + 1);
  };

  const handleDonationStepBack = () => {
    setDonationStep(prev => prev - 1);
  };

  const handleDonate = async () => {
    try {
      setIsProcessing(true);
      
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaign_id: params.id,
          amount: parseFloat(donationAmount.replace('$', '')),
          message,
          donor_name: donorName,
          donor_email: donorEmail,
          is_anonymous: isAnonymous
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to process donation');
      }

      toast({
        title: "Thank you for your donation!",
        description: "Your support means a lot to this campaign.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose();
      setDonationStep(1);
      setDonationAmount("");
      setMessage("");
      setDonorName("");
      setDonorEmail("");
      setIsAnonymous(false);
    } catch (error) {
      toast({
        title: "Failed to process donation",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setIsLightboxOpen(false);
  };

  const handleShare = () => {
    setIsShareOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSocialShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Support ${campaign.title} on Givaa`);
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (isLoading) {
    return (
      <Box minH="100vh" bg="#fcfbf1">
        <Nav />
        <Container maxW="7xl" py={8}>
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
            <GridItem>
              <MotionBox>
                <Skeleton height="400px" borderRadius="xl" />
                <VStack align="stretch" spacing={6} mt={6}>
                  <Skeleton height="40px" width="70%" />
                  <Skeleton height="20px" />
                  <Stack spacing={4}>
                    <HStack justify="space-between">
                      <VStack align="start">
                        <Skeleton height="30px" width="150px" />
                        <Skeleton height="20px" width="120px" />
                      </VStack>
                      <VStack align="end">
                        <Skeleton height="30px" width="100px" />
                        <Skeleton height="20px" width="80px" />
                      </VStack>
                    </HStack>
                  </Stack>
                  <HStack spacing={4}>
                    <Skeleton height="48px" width="150px" />
                    <Skeleton height="48px" width="120px" />
                  </HStack>
                  <Box mt={8}>
                    <Skeleton height="40px" width="300px" mb={4} />
                    <SkeletonText mt="4" noOfLines={4} spacing="4" />
                  </Box>
                </VStack>
              </MotionBox>
            </GridItem>
            <GridItem display={{ base: "none", lg: "block" }}>
              <Box position="sticky" top="100px">
                <VStack spacing={4} align="stretch" p={6} bg="gray.50" borderRadius="xl">
                  <Skeleton height="30px" width="200px" />
                  <SkeletonText mt="4" noOfLines={3} spacing="4" />
                </VStack>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    );
  }

  if (isError || !campaign) {
    return (
      <Box minH="100vh" bg="#fcfbf1">
        <Nav />
        <Container maxW="7xl" py={8}>
          <VStack spacing={4} align="center">
            <Heading>Campaign Not Found</Heading>
            <Text>The campaign you're looking for doesn't exist or has been removed.</Text>
            <Button
              as={Link}
              href="/"
              leftIcon={<FiHome />}
              colorScheme="yellow"
            >
              Return Home
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  const progress = Math.round((campaign.current_amount / campaign.goal_amount) * 100);
  const daysLeft = Math.ceil((new Date(campaign.end_date) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <Box minH="100vh" bg="#fcfbf1">
      <Nav />
      
      {/* Floating Action Bar */}
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        zIndex={10}
        bg="white"
        boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.1)"
        display={{ base: 'block', lg: 'none' }}
      >
        <Container maxW="7xl" py={4}>
          <HStack spacing={4} justify="space-between">
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color="gray.600">Raised</Text>
              <Text fontWeight="bold">${campaign.current_amount.toLocaleString()}</Text>
            </VStack>
            <Button
              bg="#FFBE37"
              color="white"
              px={8}
              _hover={{ bg: "#FFD700" }}
              onClick={onOpen}
              isDisabled={campaign.status !== 'ACTIVE'}
            >
              {campaign.status === 'ACTIVE' ? 'Donate Now' : 'Campaign ' + campaign.status.toLowerCase()}
            </Button>
          </HStack>
        </Container>
      </Box>

      <Container maxW="7xl" py={8}>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
          {/* Left Column */}
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box position="relative">
                <Image
                  src={campaign.cover_image || '/images/donate.png'}
                  alt={campaign.title}
                  borderRadius="xl"
                  w="full"
                  h="400px"
                  objectFit="cover"
                />
                
                {/* Quick Stats Overlay */}
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  bg="rgba(0, 0, 0, 0.7)"
                  backdropFilter="blur(8px)"
                  color="white"
                  p={4}
                  borderBottomRadius="xl"
                >
                  <SimpleGrid columns={3} spacing={4}>
                    <VStack align="start">
                      <Text fontSize="sm">Raised</Text>
                      <Text fontWeight="bold" fontSize="lg">
                        ${campaign.current_amount.toLocaleString()}
                      </Text>
                    </VStack>
                    <VStack align="start">
                      <Text fontSize="sm">Goal</Text>
                      <Text fontWeight="bold" fontSize="lg">
                        ${campaign.goal_amount.toLocaleString()}
                      </Text>
                    </VStack>
                    <VStack align="start">
                      <Text fontSize="sm">Time Left</Text>
                      <Text fontWeight="bold" fontSize="lg">
                        {daysLeft > 0 ? `${daysLeft} days` : 'Ended'}
                      </Text>
                    </VStack>
                  </SimpleGrid>
                </Box>
              </Box>

             
              {/* Campaign Title and Actions */}
              <VStack align="stretch" spacing={4} mt={4} mb={4}>
                <Flex justify="space-between" align="center">
                  <Heading size="xl">{campaign.title}</Heading>
                  <HStack>
                    <IconButton
                      aria-label="Share campaign"
                      icon={<FiShare2 />}
                      onClick={handleShare}
                      variant="ghost"
                      colorScheme="yellow"
                    />
                    <IconButton
                      aria-label="Save campaign"
                      icon={<FiHeart />}
                      variant="ghost"
                      colorScheme="yellow"
                    />
                  </HStack>
                </Flex>

                <HStack spacing={4} color="gray.600" wrap="wrap">
                  {campaign.Category && (
                    <Tag colorScheme="yellow" size="lg">
                      <TagLeftIcon as={FiTag} />
                      <TagLabel>{campaign.Category.name}</TagLabel>
                    </Tag>
                  )}
                  <Tag size="lg">
                    <TagLeftIcon as={FiClock} />
                    <TagLabel>{daysLeft > 0 ? `${daysLeft} days left` : 'Campaign ended'}</TagLabel>
                  </Tag>
                </HStack>

                <Box w="full">
                  <Progress 
                    value={progress || 0}
                    size="lg" 
                    borderRadius="full" 
                    colorScheme="yellow"
                    bg="gray.100"
                    hasStripe
                    isAnimated
                  />
                  <Flex justify="space-between" mt={1} fontSize="sm" color="gray.600">
                    <Text>{progress || 0}% Complete</Text>
                    <Text>${campaign.current_amount?.toLocaleString()} of ${campaign.goal_amount?.toLocaleString()}</Text>
                  </Flex>
                </Box>
              </VStack>
            </MotionBox>
          </GridItem>

          {/* Right Column - Sticky Sidebar */}
          <GridItem display={{ base: "none", lg: "block" }}>
            <Box position="sticky" top="100px">
              <VStack spacing={6}>
                {/* Donation Card */}
                <Box
                  bg="white"
                  p={6}
                  borderRadius="xl"
                  shadow="md"
                  w="full"
                >
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="2xl" fontWeight="bold">
                      ${campaign.current_amount.toLocaleString()}
                    </Text>
                    <Text color="gray.600">
                      raised of ${campaign.goal_amount.toLocaleString()} goal
                    </Text>
                    <Progress 
                      value={progress}
                      size="sm" 
                      borderRadius="full" 
                      colorScheme="yellow"
                      bg="gray.100"
                      hasStripe
                      isAnimated
                    />
                    <SimpleGrid columns={2} spacing={4}>
                      <VStack align="start">
                        <Text fontSize="lg" fontWeight="bold">
                          {campaign.donations?.length || 0}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Donors
                        </Text>
                      </VStack>
                      <VStack align="start">
                        <Text fontSize="lg" fontWeight="bold">
                          {daysLeft}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Days Left
                        </Text>
                      </VStack>
                    </SimpleGrid>
                    <Button
                      size="lg"
                      bg="#FFBE37"
                      color="white"
                      _hover={{ bg: "#FFD700" }}
                      onClick={onOpen}
                      isDisabled={campaign.status !== 'ACTIVE'}
                      w="full"
                    >
                      {campaign.status === 'ACTIVE' ? 'Donate Now' : 'Campaign ' + campaign.status.toLowerCase()}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      leftIcon={<FiShare2 />}
                      onClick={handleShare}
                      w="full"
                    >
                      Share
                    </Button>
                  </VStack>
                </Box>

                {/* Top Donors Card */}
                <Box
                  bg="white"
                  p={6}
                  borderRadius="xl"
                  shadow="md"
                  w="full"
                >
                  <VStack spacing={4} align="stretch">
                    <Heading size="md">Top Donors</Heading>
                    {campaign.donations?.length > 0 ? (
                      campaign.donations
                        .sort((a, b) => b.amount - a.amount)
                        .slice(0, 5)
                        .map((donor, index) => (
                          <HStack key={index} spacing={3}>
                            <Avatar 
                              size="sm" 
                              name={donor.is_anonymous ? "Anonymous" : donor.donor_name}
                              src={donor.donor_avatar}
                            />
                            <Box flex={1}>
                              <Text fontWeight="medium">
                                {donor.is_anonymous ? "Anonymous" : donor.donor_name}
                              </Text>
                              <Text fontSize="sm" color="green.500">
                                ${donor.amount.toLocaleString()}
                              </Text>
                            </Box>
                            {index < 3 && (
                              <Icon 
                                as={index === 0 ? FiAward : undefined}
                                color={index === 0 ? "yellow.400" : index === 1 ? "gray.400" : "orange.400"}
                                boxSize={5}
                              />
                            )}
                          </HStack>
                        ))
                    ) : (
                      <Text color="gray.500" fontSize="sm" textAlign="center">
                        No donors yet
                      </Text>
                    )}
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </GridItem>
        </Grid>

        {/* Donation Modal */}
        <Modal 
          isOpen={isOpen} 
          onClose={() => {
            onClose();
            setDonationStep(1);
          }} 
          size="xl"
        >
          <ModalOverlay />
          <ModalContent borderRadius="xl">
            <ModalHeader>
              <HStack>
                {donationStep > 1 && (
                  <IconButton
                    icon={<FiX />}
                    variant="ghost"
                    onClick={handleDonationStepBack}
                    aria-label="Go back"
                  />
                )}
                <Text>
                  {donationStep === 1 ? "Make a Donation" : "Complete Your Donation"}
                </Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <AnimatePresence mode="wait">
                {donationStep === 1 ? (
                  <MotionBox
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <VStack spacing={6}>
                      <Text fontSize="lg" color="gray.600" textAlign="center">
                        How much would you like to donate?
                      </Text>
                      
                      <SimpleGrid columns={2} spacing={4} w="full">
                        {["$10", "$25", "$50", "$100", "$250", "$500"].map((amount) => (
                          <Button
                            key={amount}
                            size="lg"
                            variant={donationAmount === amount ? "solid" : "outline"}
                            colorScheme="yellow"
                            onClick={() => setDonationAmount(amount)}
                            _hover={{
                              transform: 'translateY(-2px)',
                              shadow: 'md',
                            }}
                            transition="all 0.2s"
                          >
                            {amount}
                          </Button>
                        ))}
                      </SimpleGrid>
                      
                      <Text color="gray.500" fontSize="sm">Or enter a custom amount:</Text>
                      
                      <InputGroup size="lg">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<FiDollarSign color="gray.300" />}
                        />
                        <Input
                          placeholder="Enter amount"
                          value={donationAmount.replace('$', '')}
                          onChange={(e) => setDonationAmount(`$${e.target.value}`)}
                          type="number"
                        />
                      </InputGroup>

                      <Button
                        w="full"
                        size="lg"
                        bg="#FFBE37"
                        color="white"
                        _hover={{ bg: "#FFD700" }}
                        onClick={handleDonationStepNext}
                      >
                        Continue
                      </Button>
                    </VStack>
                  </MotionBox>
                ) : (
                  <MotionBox
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <VStack spacing={6}>
                      <Box 
                        p={4} 
                        bg="gray.50" 
                        borderRadius="lg" 
                        w="full"
                      >
                        <Text color="gray.600">Donation amount:</Text>
                        <Text fontSize="2xl" fontWeight="bold">
                          {donationAmount}
                        </Text>
                      </Box>

                      <FormControl isRequired>
                        <FormLabel>Your Name</FormLabel>
                        <Input
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Enter your name"
                          isDisabled={isAnonymous}
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                          type="email"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="Enter your email"
                        />
                        <FormHelperText>
                          Your email will not be displayed publicly
                        </FormHelperText>
                      </FormControl>

                      <FormControl>
                        <Checkbox
                          isChecked={isAnonymous}
                          onChange={(e) => {
                            setIsAnonymous(e.target.checked);
                            if (e.target.checked) {
                              setDonorName("Anonymous");
                            } else {
                              setDonorName("");
                            }
                          }}
                        >
                          Make this donation anonymous
                        </Checkbox>
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Leave a message (optional)</FormLabel>
                        <Textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Share a few words of support..."
                          rows={4}
                        />
                      </FormControl>

                      <Button
                        w="full"
                        size="lg"
                        bg="#FFBE37"
                        color="white"
                        _hover={{ bg: "#FFD700" }}
                        onClick={handleDonate}
                        isLoading={isProcessing}
                        loadingText="Processing donation..."
                        isDisabled={!donorEmail || (!isAnonymous && !donorName)}
                      >
                        Complete Donation
                      </Button>
                    </VStack>
                  </MotionBox>
                )}
              </AnimatePresence>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Image Lightbox */}
        <Modal isOpen={isLightboxOpen} onClose={closeLightbox} size="full">
          <ModalOverlay />
          <ModalContent bg="rgba(0, 0, 0, 0.9)" margin={0} rounded="none">
            <ModalCloseButton 
              color="white" 
              size="lg"
              _hover={{ bg: 'whiteAlpha.200' }}
            />
            <ModalBody 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              p={0}
            >
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Gallery image"
                  maxH="90vh"
                  maxW="90vw"
                  objectFit="contain"
                />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Share Modal */}
        <Modal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Share this campaign</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4}>
                <Button
                  w="full"
                  leftIcon={<FiFacebook />}
                  onClick={() => handleSocialShare('facebook')}
                  colorScheme="facebook"
                >
                  Share on Facebook
                </Button>
                <Button
                  w="full"
                  leftIcon={<FiTwitter />}
                  onClick={() => handleSocialShare('twitter')}
                  colorScheme="twitter"
                >
                  Share on Twitter
                </Button>
                <Button
                  w="full"
                  leftIcon={<FiLink />}
                  onClick={handleCopyLink}
                  variant="outline"
                >
                  {isCopied ? 'Copied!' : 'Copy Link'}
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Quick Stats Bar */}
        <Box
          bg="white"
          borderRadius="xl"
          p={{ base: 3, md: 4 }}
          mt={4}
          mb={6}
          shadow="sm"
        >
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 3, md: 4 }}>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color="gray.500">Raised</Text>
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                ${campaign.current_amount.toLocaleString()}
              </Text>
              <Text fontSize="sm" color="gray.500">
                of ${campaign.goal_amount.toLocaleString()}
              </Text>
            </VStack>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color="gray.500">Progress</Text>
              <Text fontSize="2xl" fontWeight="bold" color="yellow.500">
                {progress}%
              </Text>
              <Progress 
                value={progress}
                size="sm" 
                width="100px"
                borderRadius="full" 
                colorScheme="yellow"
              />
            </VStack>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color="gray.500">Donors</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {campaign.donations?.length || 0}
              </Text>
              <Text fontSize="sm" color="gray.500">supporters</Text>
            </VStack>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color="gray.500">Time Left</Text>
              <Text fontSize="2xl" fontWeight="bold" color={daysLeft > 5 ? "blue.500" : "orange.500"}>
                {daysLeft}
              </Text>
              <Text fontSize="sm" color="gray.500">days remaining</Text>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Story Section */}
        <Box mb={{ base: 8, md: 12 }}>
          <SectionHeader title="Story" />
          {campaign.description ? (
            <Box 
            h={'auto'}
            minH={'100px'}
            py={'10px'}
            px={'10px'}
              className="story-content"
              fontSize="lg" 
              color="gray.700"
              bg="white"
              p={8}
              borderRadius="xl"
              shadow="sm"
              sx={{
                'h1, h2, h3': {
                  fontWeight: 'bold',
                  my: 4
                },
                'p': {
                  mb: 4,
                  lineHeight: 1.8
                },
                'ul, ol': {
                  pl: 6,
                  mb: 4
                },
                'li': {
                  mb: 2
                }
              }}
            >
              {campaign.description}
            </Box>
          ) : (
            <Center py={10} bg="white" borderRadius="xl" shadow="sm">
              <VStack spacing={3}>
                <Text color="gray.500">No story available yet</Text>
              </VStack>
            </Center>
          )}
        </Box>

        {/* Gallery Section */}
        {campaign.gallery?.length > 0 && (
          <Box mb={{ base: 8, md: 12 }}>
            <SectionHeader title="Gallery" count={campaign.gallery.length} />
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
              {campaign.gallery.map((image, index) => (
                <Box
                  key={index}
                  position="relative"
                  cursor="pointer"
                  onClick={() => handleImageClick(image)}
                  transition="all 0.2s"
                  _hover={{ 
                    transform: 'scale(1.02)',
                    shadow: 'lg'
                  }}
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    height="200px"
                    width="100%"
                    objectFit="cover"
                    borderRadius="lg"
                  />
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="blackAlpha.300"
                    opacity={0}
                    transition="all 0.2s"
                    _hover={{ opacity: 1 }}
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FiZoomIn} color="white" boxSize={6} />
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* Updates Section */}
        <Box mb={{ base: 8, md: 12 }}>
          <SectionHeader title="Updates" count={campaign.updates?.length || 0} />
          {campaign.updates?.length > 0 ? (
            <VStack spacing={6} align="stretch">
              {campaign.updates.map((update, index) => (
                <Box 
                  key={index} 
                  p={6} 
                  bg="white" 
                  borderRadius="lg" 
                  shadow="sm"
                  transition="all 0.2s"
                  _hover={{ shadow: 'md' }}
                >
                  <VStack align="stretch" spacing={3}>
                    <Flex justify="space-between" align="center">
                      <Text fontWeight="bold" fontSize="lg">
                        {update.title}
                      </Text>
                      <Tag size="sm" colorScheme="gray">
                        {new Date(update.created_at).toLocaleDateString()}
                      </Tag>
                    </Flex>
                    <Text color="gray.600">
                      {update.content}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </VStack>
          ) : (
            <Center py={10} bg="white" borderRadius="xl" shadow="sm">
              <VStack spacing={3}>
                <Text color="gray.500">No updates posted yet</Text>
              </VStack>
            </Center>
          )}
        </Box>

        {/* Donors Section */}
        <Box mb={{ base: 8, md: 12 }}>
          <SectionHeader title="Donors" count={campaign.donations?.length || 0} />
          {campaign.donations?.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {campaign.donations.map((donation, index) => (
                <Box
                  key={index}
                  p={4}
                  bg="white"
                  borderRadius="lg"
                  shadow="sm"
                  transition="all 0.2s"
                  _hover={{ shadow: 'md' }}
                >
                  <HStack spacing={4}>
                    <Avatar 
                      size="md"
                      name={donation.is_anonymous ? "Anonymous" : donation.donor_name} 
                      src={donation.donor_avatar}
                    />
                    <VStack align="start" flex={1} spacing={1}>
                      <HStack justify="space-between" width="100%">
                        <Text fontWeight="bold">
                          {donation.is_anonymous ? "Anonymous" : donation.donor_name}
                        </Text>
                        <Text color="green.500" fontWeight="bold">
                          ${donation.amount.toLocaleString()}
                        </Text>
                      </HStack>
                      {donation.message && (
                        <Text fontSize="sm" color="gray.600">
                          "{donation.message}"
                        </Text>
                      )}
                      <Text fontSize="xs" color="gray.400">
                        {new Date(donation.donation_date).toLocaleDateString()}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Center py={10} bg="white" borderRadius="xl" shadow="sm">
              <VStack spacing={3}>
                <Text color="gray.500">No donations yet</Text>
                <Button
                  colorScheme="yellow"
                  onClick={onOpen}
                  isDisabled={campaign.status !== 'ACTIVE'}
                >
                  Be the first to donate
                </Button>
              </VStack>
            </Center>
          )}
        </Box>
      </Container>
    </Box>
  );
} 