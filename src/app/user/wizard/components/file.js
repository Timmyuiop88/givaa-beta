"use client";
import { Box, Button, Image, Input, VStack, Text, useToast } from "@chakra-ui/react";
import { useRef } from "react";

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

export default function FileUpload({ 
  onSelectImage, 
  currentImage, 
  isLoading, 
  multiple = false,
  helperText 
}) {
  const inputRef = useRef(null);
  const toast = useToast();

  const validateFile = (file) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Only JPG and PNG images are accepted",
        status: "error",
      });
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Image must be less than 4MB",
        status: "error",
      });
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files) return;

    if (multiple) {
      const validFiles = Array.from(files).filter(validateFile);
      if (validFiles.length) {
        validFiles.forEach(onSelectImage);
      }
    } else {
      const file = files[0];
      if (file && validateFile(file)) {
        onSelectImage(file);
      }
    }
    
    // Reset input to allow selecting the same file again
    e.target.value = '';
  };

  return (
    <VStack spacing={4} align="start">
      <Input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        multiple={multiple}
        onChange={handleFileChange}
        display="none"
      />
      <Button
        onClick={() => inputRef.current?.click()}
        isLoading={isLoading}
        colorScheme="orange"
        variant="outline"
      >
        {multiple ? 'Add Images' : 'Choose Image'}
      </Button>
      {helperText && (
        <Text fontSize="sm" color="gray.500">
          {helperText}
        </Text>
      )}
      <Text fontSize="xs" color="gray.400">
        Accepted formats: JPG, PNG (max 4MB)
      </Text>
      {!multiple && currentImage && (
        <Box borderRadius="md" overflow="hidden" maxW="300px">
          <Image
            src={currentImage}
            alt="Selected image"
            objectFit="cover"
          />
        </Box>
      )}
    </VStack>
  );
}


