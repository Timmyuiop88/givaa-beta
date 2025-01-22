"use client";

import { useState, useCallback } from "react";
import { 
  Box, 
  Modal, 
  Button, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter,
  ButtonGroup,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  HStack,
  Icon
} from "@chakra-ui/react";
import Cropper from "react-easy-crop";
import { MdZoomIn } from "react-icons/md";

const ASPECT_RATIOS = [
  { label: '16:9', value: 16/9 },
  { label: '4:3', value: 4/3 },
  { label: '1:1', value: 1 },
];

export default function ImageCropper({ image, onCropDone, onCropCancel, setIsCropping }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(16/9);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = useCallback((croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  return (
    <Modal 
      isOpen={true} 
      size="xl" 
      onClose={() => setIsCropping(false)}
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent borderRadius="20px" mx="10px">
        <ModalHeader>Adjust Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Box position="relative" height="400px" bg="gray.100">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropSize={{ width: 348, height: 232 }}
              objectFit="contain"
              restrictPosition={false}
            />
          </Box>
          
          <Box p={4}>
            <Text mb={2} fontSize="sm" fontWeight="medium">Zoom</Text>
            <HStack spacing={4}>
              <Icon as={MdZoomIn} />
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={setZoom}
              >
                <SliderTrack>
                  <SliderFilledTrack bg="#F68A50" />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </HStack>

            <Text mt={4} mb={2} fontSize="sm" fontWeight="medium">Aspect Ratio</Text>
            <ButtonGroup size="sm" isAttached variant="outline">
              {ASPECT_RATIOS.map(({ label, value }) => (
                <Button
                  key={label}
                  onClick={() => setAspectRatio(value)}
                  colorScheme={aspectRatio === value ? "orange" : "gray"}
                >
                  {label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup spacing={3}>
            <Button 
              variant="ghost" 
              onClick={() => setIsCropping(false)}
            >
              Cancel
            </Button>
            <Button
              colorScheme="orange"
              onClick={() => onCropDone(croppedArea)}
              loadingText="Applying..."
            >
              Apply Crop
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}


