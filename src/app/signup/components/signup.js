"use client";
import * as z from 'zod'
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Stack,
  Spinner,
  Text,
  Heading,
  Button,
  Flex,
  Center,
  Hide,
  Wrap,
  WrapItem,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  SimpleGrid,
  ButtonGroup,
  Divider,
  AbsoluteCenter,
  VStack,
  Show,
} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import Footer from "../../components/footer";
import { useForm,SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Link from 'next/link';

// Enhanced form validation schema
const FormSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .max(255, 'Email is too long'),
  firstname: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name is too long')
    .regex(/^[a-zA-Z\s]*$/, 'First name can only contain letters and spaces'),
  lastname: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name is too long')
    .regex(/^[a-zA-Z\s]*$/, 'Last name can only contain letters and spaces'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password is too long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
});

export default function Signup() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const router = useRouter();

  const validateField = (name, value) => {
    try {
      FormSchema.shape[name].parse(value);
      setFieldErrors(prev => ({ ...prev, [name]: null }));
      return true;
    } catch (error) {
      setFieldErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // Validate all fields
      FormSchema.parse(formData);

      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Success - redirect to login
      router.push('/login?registered=true');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMsg('Please check all fields and try again.');
      } else {
        setErrorMsg(error.message || 'An error occurred during registration');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box w={"100%"} h={"100vh"}>
        <Stack
          w={"100%"}
          spacing={"0"}
          h={"100%"}
          direction={["column", "column", "row", "row"]}
        >
          <Center h={"auto"} w={["100%", "100%", "100%", "50%"]} bg={"white"}>
            <Box p={10} w={["full", "410px", "410px", "410px"]} h={"auto"}>
              <Heading
                fontFamily={"DM sans"}
                fontSize={"36px"}
                fontWeight={"700"}
                letterSpacing={"-0.72px"}
                color={"#C66D3E"}
              >
                Hello.
              </Heading>
              <Text
                fontFamily={"DM sans"}
                fontSize={"16px"}
                fontWeight={"400"}
                letterSpacing={"-0.72px"}
              >
                "Fueling Dreams, One Donation at a Time!"
              </Text>
              <Button
                fontFamily={"DM Sans"}
                my={"30px"}
                border={"1px solid #DAD7D6"}
                h={"50px"}
                w={"full"}
                borderRadius={"16px"}
                color={"#2D3748"}
                bg={"#F4F7FE"}
                leftIcon={<FcGoogle />}
              >
                Sign up with Google
              </Button>

              <Box position="relative" mb={"50px"}>
                <Divider />
                <AbsoluteCenter
                  bg={"white"}
                  fontFamily={"DM sans"}
                  fontSize={"14px"}
                  fontWeight={"500"}
                  letterSpacing={"-0.72px"}
                  color={"#ECE0DA"}
                  px="4"
                >
                  or
                </AbsoluteCenter>
              </Box>

              <VStack  spacing={"10"} justifyContent={"flex-end"}>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <Flex gap={4} mb={4}>
                    <Box flex={1}>
                      <Text
                        color={"#2D3748"}
                        fontSize={"14px"}
                        fontFamily={"DM Sans"}
                        fontWeight={"600"}
                        mb={"10px"}
                      >
                        First Name*
                      </Text>
                      <Input
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        type="text"
                        borderRadius={"16px"}
                        h={"50px"}
                        placeholder="John"
                        _focus={{
                          borderColor: "#F68A50",
                          boxShadow: "0 0 0 1px #F68A50"
                        }}
                        isInvalid={fieldErrors.firstname}
                      />
                      {fieldErrors.firstname && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {fieldErrors.firstname}
                        </Text>
                      )}
                    </Box>

                    <Box flex={1}>
                      <Text
                        color={"#2D3748"}
                        fontSize={"14px"}
                        fontFamily={"DM Sans"}
                        fontWeight={"600"}
                        mb={"10px"}
                      >
                        Last Name*
                      </Text>
                      <Input
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        type="text"
                        borderRadius={"16px"}
                        h={"50px"}
                        placeholder="Doe"
                        _focus={{
                          borderColor: "#F68A50",
                          boxShadow: "0 0 0 1px #F68A50"
                        }}
                        isInvalid={fieldErrors.lastname}
                      />
                      {fieldErrors.lastname && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {fieldErrors.lastname}
                        </Text>
                      )}
                    </Box>
                  </Flex>

                  <Box mb={4}>
                    <Text
                      color={"#2D3748"}
                      fontSize={"14px"}
                      fontFamily={"DM Sans"}
                      fontWeight={"600"}
                      mb={"10px"}
                    >
                      Email*
                    </Text>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      borderRadius={"16px"}
                      h={"50px"}
                      placeholder="your@email.com"
                      _focus={{
                        borderColor: "#F68A50",
                        boxShadow: "0 0 0 1px #F68A50"
                      }}
                      isInvalid={fieldErrors.email}
                    />
                    {fieldErrors.email && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {fieldErrors.email}
                      </Text>
                    )}
                  </Box>

                  <Box mb={4}>
                    <Text
                      color={"#2D3748"}
                      fontSize={"14px"}
                      fontFamily={"DM Sans"}
                      fontWeight={"600"}
                      mb={"10px"}
                    >
                      Password*
                    </Text>
                    <InputGroup>
                      <Input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        borderRadius={"16px"}
                        h={"50px"}
                        placeholder="Create a strong password"
                        _focus={{
                          borderColor: "#F68A50",
                          boxShadow: "0 0 0 1px #F68A50"
                        }}
                        isInvalid={fieldErrors.password}
                      />
                      <InputRightElement h={"50px"}>
                        <Button
                          variant={"ghost"}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {fieldErrors.password && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {fieldErrors.password}
                      </Text>
                    )}
                  </Box>

                  {errorMsg && (
                    <Alert status="error" borderRadius="md" mb={4}>
                      <AlertIcon />
                      <Text fontSize="sm">{errorMsg}</Text>
                    </Alert>
                  )}

                  <Button
                    _hover={{ bg: "#F68A50", transform: "translateY(-2px)" }}
                    _active={{ bg: "#C66D3E" }}
                    fontWeight={"700"}
                    h={"50px"}
                    w={"full"}
                    borderRadius={"16px"}
                    color={"#fff"}
                    bg={"#F68A50"}
                    fontFamily={"DM Sans"}
                    fontSize={"14px"}
                    type="submit"
                    transition="all 0.2s"
                    isLoading={loading}
                    loadingText="Creating account..."
                  >
                    Create Account
                  </Button>
                </form>
              </VStack>
            </Box>
          </Center>
          <Show above="lg">
            <Center
              backgroundColor={"#e8e8ea"}
              opacity={1}
              backgroundImage={
                "repeating-radial-gradient( circle at 0 0, transparent 0, #e8e8ea 23px ), repeating-linear-gradient( #F68A5055, #F68A50 )"
              }
              h={"100%"}
              w={["100%", "100%", "50%", "50%"]}
            >
              <Heading color={"white"} fontSize={"75px"}>
                GIVAA
              </Heading>
            </Center>
          </Show>
        </Stack>
      </Box>
    </>
  );
}
