"use client";
import * as z from "zod";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Stack,
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
import { signIn } from "next-auth/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const FormSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .max(255, 'Email is too long'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password is too long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
});

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (attempts >= 5) {
      setErrorMsg('Too many login attempts. Please try again later.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        email: formData.get('email'),
        password: formData.get('password')
      };

      // Validate form data
      await FormSchema.parse(data);

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      });

      if (result?.error) {
        setAttempts(prev => prev + 1);
        throw new Error(result.error);
      }

      router.push('/user');
      router.refresh();
    } catch (error) {
      setErrorMsg(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Add email validation on blur
  const validateEmail = (email) => {
    try {
      FormSchema.shape.email.parse(email);
      setIsEmailValid(true);
      return true;
    } catch (error) {
      setIsEmailValid(false);
      return false;
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
          <Center h={"100%"} w={["100%", "100%", "100%", "50%"]} bg={"white"}>
            <Box
              mt={"-50px"}
              p={[5, 5, 10, 10]}
              w={["full", "410px", "410px", "410px"]}
              h={"auto"}
            >
              <Heading
                fontFamily={"DM sans"}
                fontSize={"30px"}
                fontWeight={"700"}
                letterSpacing={"-0.72px"}
                color={"#C66D3E"}
                mb={2}
              >
                Welcome Back
              </Heading>
              <Text
                fontFamily={"DM sans"}
                fontSize={"16px"}
                fontWeight={"400"}
                letterSpacing={"-0.72px"}
                color={"gray.600"}
                mb={8}
              >
                Enter your credentials to access your account
              </Text>

              {/* Comment out Google Sign in for now */}
              {/* <Button
                fontFamily={"DM Sans"}
                my={"30px"}
                // ... existing button styles ...
              >
                Sign up with Google
              </Button> */}

              <VStack spacing={"20px"} justifyContent={"flex-end"}>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <Box w={"full"} display={"block"} mb={4}>
                    <Text
                      color={"#2D3748"}
                      fontSize={"14px"}
                      fontFamily={"DM Sans"}
                      fontWeight={"600"}
                      mb={"10px"}
                    >
                      Email*
                    </Text>
                    <InputGroup>
                      <Input
                        name="email"
                        type="email"
                        borderRadius={"16px"}
                        h={"50px"}
                        pl={"24px"}
                        placeholder="your@email.com"
                        _focus={{
                          borderColor: "#F68A50",
                          boxShadow: "0 0 0 1px #F68A50"
                        }}
                        onBlur={(e) => validateEmail(e.target.value)}
                        isInvalid={!isEmailValid}
                      />
                    </InputGroup>
                    {!isEmailValid && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        Please enter a valid email address
                      </Text>
                    )}
                  </Box>

                  <Box w={"full"} display={"block"} mb={4}>
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
                        type={showPassword ? "text" : "password"}
                        borderRadius={"16px"}
                        h={"50px"}
                        pl={"24px"}
                        placeholder="Enter your password"
                        _focus={{
                          borderColor: "#F68A50",
                          boxShadow: "0 0 0 1px #F68A50"
                        }}
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
                  </Box>

                  <Flex justify="space-between" mb={4}>
                    <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
                      <Text
                        color={"#F68A50"}
                        fontSize={"14px"}
                        fontFamily={"DM Sans"}
                        _hover={{ textDecoration: 'underline' }}
                      >
                        Forgot Password?
                      </Text>
                    </Link>
                  </Flex>

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
                    loadingText="Signing in..."
                  >
                    Sign In
                  </Button>

                  <Center mt={4}>
                    <Text color={"gray.600"} fontSize={"14px"} fontFamily={"DM Sans"}>
                      Don't have an account?{" "}
                      <Link href="/signup" style={{ textDecoration: 'none' }}>
                        <Text
                          as="span"
                          color={"#F68A50"}
                          _hover={{ textDecoration: 'underline' }}
                        >
                          Sign up
                        </Text>
                      </Link>
                    </Text>
                  </Center>
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
