'use client';

import {
  Box,
  useColorModeValue,
  Text,
  Button,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  ButtonGroup,
  Flex,
  Textarea,
  Select,
  CircularProgress,
  CircularProgressLabel,
  InputLeftElement,
  InputGroup,
  useSteps,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Input,
  SimpleGrid,
  Heading,
  HStack,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { useEffect } from 'react';
import { useCampaignForm } from '../../../hooks/useCampaignForm';
import FileUpload from "./file";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useCategories } from '../../../hooks/useCategories';

const steps = [
  { title: 'Basics', description: 'Campaign info' },
  { title: 'Media', description: 'Images & gallery' },
  { title: 'Goals', description: 'Funding details' },
  { title: 'Review', description: 'Final check' }
];

const Form1 = ({ formData, handleInputChange }) => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <VStack spacing={6} align="stretch">
        <FormControl isRequired>
          <FormLabel>Campaign Title</FormLabel>
          <Input
            size="lg"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Give your campaign a catchy title"
          />
          <FormHelperText>Make it clear and memorable</FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            size="lg"
            value={formData.category_id || ''}
            onChange={(e) => {
              const value = e.target.value;
              handleInputChange('category_id', value ? parseInt(value, 10) : '');
            }}
            isDisabled={categoriesLoading}
            placeholder="Select a category"
          >
            {categories?.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </Select>
          <FormHelperText>
            Choose the category that best fits your campaign
          </FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            size="lg"
            rows={4}
            placeholder="Tell your story and explain why people should support your cause"
          />
          <FormHelperText>
            Be detailed and transparent about how the funds will be used
          </FormHelperText>
        </FormControl>
      </VStack>
    </motion.div>
  );
};

const Form2 = ({ tempImages, handleImageSelect, removeGalleryImage, loading }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
  >
    <VStack spacing={8} align="stretch">
      <FormControl isRequired>
        <FormLabel>Cover Image</FormLabel>
        <FileUpload
          onSelectImage={(file) => handleImageSelect(file, 'cover')}
          currentImage={tempImages.cover?.preview}
          isLoading={loading}
          helperText="This will be the main image for your campaign"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Gallery Images</FormLabel>
        <FileUpload
          onSelectImage={(file) => handleImageSelect(file, 'gallery')}
          isLoading={loading}
          accept="image/*"
          multiple
          helperText="Add up to 5 additional images to showcase your campaign"
        />
        {tempImages.gallery.length > 0 && (
          <SimpleGrid 
            columns={{ base: 2, md: 3 }} 
            spacing={4} 
            mt={4}
          >
            {tempImages.gallery.map((img, index) => (
              <Box 
                key={index} 
                position="relative"
                borderRadius="md"
                overflow="hidden"
                aspectRatio={16/9}
              >
                <Image
                  src={img.preview}
                  alt={`Gallery image ${index + 1}`}
                  objectFit="cover"
                  w="full"
                  h="full"
                />
                <IconButton
                  icon={<FiX />}
                  size="sm"
                  position="absolute"
                  top={2}
                  right={2}
                  colorScheme="red"
                  onClick={() => removeGalleryImage(index)}
                  aria-label="Remove image"
                />
              </Box>
            ))}
          </SimpleGrid>
        )}
      </FormControl>
    </VStack>
  </motion.div>
);

const Form3 = ({ formData, handleInputChange }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
  >
    <VStack spacing={6} align="stretch">
      <FormControl isRequired>
        <FormLabel>Funding Goal</FormLabel>
        <InputGroup size="lg">
          <InputLeftElement color="gray.500">$</InputLeftElement>
          <Input
            type="number"
            value={formData.goal_amount}
            onChange={(e) => handleInputChange('goal_amount', e.target.value)}
            placeholder="5,000"
          />
        </InputGroup>
        <FormHelperText>Set a realistic goal for your campaign</FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Campaign Duration</FormLabel>
        <Input
          size="lg"
          type="date"
          value={formData.end_date}
          onChange={(e) => handleInputChange('end_date', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
        <FormHelperText>
          Choose when your campaign will end
        </FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>Campaign Visibility</FormLabel>
        <Select
          size="lg"
          value={formData.visibility}
          onChange={(e) => handleInputChange('visibility', e.target.value)}
        >
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
        </Select>
        <FormHelperText>
          Control who can see your campaign
        </FormHelperText>
      </FormControl>
    </VStack>
  </motion.div>
);

const Form4 = ({ formData, tempImages }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
  >
    <VStack spacing={6} align="stretch">
      <Box 
        borderRadius="lg" 
        overflow="hidden"
        borderWidth={1}
        bg="white"
      >
        {tempImages.cover?.preview && (
          <Image
            src={tempImages.cover.preview}
            alt="Campaign cover"
            objectFit="cover"
            w="full"
            h="200px"
          />
        )}
        <VStack p={6} spacing={4} align="stretch">
          <Heading size="lg">{formData.title}</Heading>
          <Text color="gray.600" noOfLines={3}>
            {formData.description}
          </Text>
          <HStack justify="space-between">
            <Box>
              <Text fontWeight="bold" fontSize="2xl">
                ${parseFloat(formData.goal_amount).toLocaleString()}
              </Text>
              <Text color="gray.500">Goal Amount</Text>
            </Box>
            <Box textAlign="right">
              <Text fontWeight="bold">
                {new Date(formData.end_date).toLocaleDateString()}
              </Text>
              <Text color="gray.500">End Date</Text>
            </Box>
          </HStack>
          {tempImages.gallery.length > 0 && (
            <Box>
              <Text fontWeight="medium" mb={2}>Gallery Images</Text>
              <SimpleGrid columns={4} spacing={2}>
                {tempImages.gallery.map((img, i) => (
                  <Image
                    key={i}
                    src={img.preview}
                    alt={`Gallery ${i + 1}`}
                    boxSize="60px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                ))}
              </SimpleGrid>
            </Box>
          )}
        </VStack>
      </Box>
    </VStack>
  </motion.div>
);

export default function Wizard({ initialData, mode = "create" }) {
  const {
    step,
    progress,
    formData,
    tempImages,
    loading,
    handleInputChange,
    handleImageSelect,
    removeGalleryImage,
    handleSubmit,
    nextStep,
    prevStep,
    uploadProgress,
    handleCancel,
  } = useCampaignForm(initialData, mode);

  const { activeStep, setActiveStep } = useSteps({
    index: step - 1,
    count: steps.length,
  });

  useEffect(() => {
    setActiveStep(step - 1);
  }, [step, setActiveStep]);

  return (
    <Box
      maxW="4xl"
      mx="auto"
      p={{ base: 4, md: 8 }}
      bg="white"
      borderRadius="xl"
      boxShadow="sm"
      position="relative"
    >
      <Box 
        position="absolute"
        top={4}
        right={4}
        zIndex="1"
      >
        <CircularProgress
          value={progress}
          color="orange.400"
          size={{ base: "40px", md: "60px" }}
        >
          <CircularProgressLabel>{progress}%</CircularProgressLabel>
        </CircularProgress>
      </Box>

      <Box mb={8} overflowX={{ base: "auto", md: "visible" }}>
        <Stepper 
          index={activeStep} 
          size={{ base: "sm", md: "md" }}
          colorScheme="orange"
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box flexShrink="0" display={{ base: "none", md: "block" }}>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box position="relative" mb={8}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <Form1
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {step === 2 && (
            <Form2
              tempImages={tempImages}
              handleImageSelect={handleImageSelect}
              removeGalleryImage={removeGalleryImage}
              loading={loading}
            />
          )}
          {step === 3 && (
            <Form3
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {step === 4 && (
            <Form4 
              formData={formData}
              tempImages={tempImages}
            />
          )}
        </AnimatePresence>
      </Box>

      <ButtonGroup 
        spacing={4} 
        width="100%" 
        justifyContent="space-between"
        mt={8}
      >
        {step === 1 ? (
          <Button
            onClick={handleCancel}
            variant="outline"
            colorScheme="gray"
            size={{ base: "md", md: "lg" }}
          >
            Cancel
          </Button>
        ) : (
          <Button
            onClick={prevStep}
            isDisabled={loading}
            variant="outline"
            colorScheme="orange"
            size={{ base: "md", md: "lg" }}
          >
            Back
          </Button>
        )}
        <Button
          onClick={step === 4 ? handleSubmit : nextStep}
          isLoading={loading}
          colorScheme="orange"
          size={{ base: "md", md: "lg" }}
        >
          {step === 4 ? 'Create Campaign' : 'Next'}
        </Button>
      </ButtonGroup>
    </Box>
  );
} 