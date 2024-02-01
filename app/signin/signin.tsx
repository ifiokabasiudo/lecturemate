"use client";
import {
  Box,
  Flex,
  Text,
  Center,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  InputRightAddon,
  InputGroup,
  Link,
  useToast,
  Icon,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import Head from "next/head";
import { Formik, Form, Field } from "formik";
import NextLink from "next/link";
import Layout from "../../src/components/Auth/Layout";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff, IoLogoGoogle } from "react-icons/io5";

export default function Signin({ user }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("sign-in");
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (user) {
      router.push("/app/chat");
    }
  }, []);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data.user) {
        // Sign-in was successful, navigate to the home page or any other desired route.
        router.push("/app/chat");
        // Alternatively, you can use router.push('/') again to refresh the page.
      }

      if (error) {
        if (error.message === "Failed to fetch") {
          alert("Check your Internet Connection");
          return;
        }

        if (error.message === "Invalid signin credentials") {
          alert("Incorrect username or password");
        }
      }
    } catch (error) {
      console.log("An error occured with error statement: " + error);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
  
      if (data) {
        // Sign-in was successful, navigate to the home page or any other desired route.
        router.push("/app/chat");
        // Alternatively, you can use router.push('/') again to refresh the page.
      }
      
      if (error) {
        console.log(error)
      }
    } catch (error) {
      console.log("An error occured with error statement: " + error);
    }
    
  }

  // Google clientID = 92841343693-lvfk4t6qh9qhud6rten4lp0d17vuf1lv.apps.googleusercontent.com
  // Google client Secret = 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

  const toast = useToast();
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  return (
    <Layout>
      
      <Flex
       direction="column"
       h="full"
       bg={'#14171D'}
       w={{ base: "full", lg: "40%" }}
       zIndex={2}
       position={"fixed"}
       overflowY={"scroll"}
       css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: "white",
          borderRadius: '24px',
        },
      }}
      >
        <Flex
          justify="flex-start"
          onClick={() => router.push("/")}
          cursor="pointer"
          align="center"
          py={{ base: "10px", lg: "20px"}}
          ml={{base: "20px", lg: "50px"}}
          gap={1}
          w="11em"
        >
          <Image
            src="/logowhite.png"
            alt="Lecture mate logo"
            w={6}
            pointerEvents="none"
          />
          <Text fontWeight="black" fontSize={22}>Lecture Mate</Text>
        </Flex>

        <Flex
          direction="column"
          h={{ base: "full", lg: "80%" }}
          w={"full"}
          py={5}
          px={{ base: "20px", lg: "10%" }}
        >
          <Text mt={10} fontSize={"1.5rem"} fontWeight={600}>
            Welcome back
          </Text>
          <Text fontSize={"1.125rem"} fontWeight={500}>
            Sign in to your account
          </Text>

{/*           <Flex
            mt={5}
            p="2"
            w="100%"
            border="1px solid #53AF28"
            cursor="pointer"
            _hover={{ bg: "#53AF2820"}}
            justify="center"
            align="center"
            gap={2}
            borderRadius="6px"
            onClick={handleGoogleSignin}
          >
            <Icon as={IoLogoGoogle} />
            <Text>Continue with Google</Text>
          </Flex> */}
          <Flex fontSize={"1rem"} direction="column" mt={10}>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values, actions) => {
                const response = await supabase.auth.signInWithPassword({
                  email: values.email,
                  password: values.password,
                });
                if (response.data.user) {
                  actions.setSubmitting(false);
                  toast({
                    title: "Sign in Complete",
                    description: `Welcome back, ${response.data.user.user_metadata.username}`,
                    status: "success",
                    variant: "left-accent",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                  });
                  setTimeout(() => {
                    router.push("/app/chat");
                  }, 1000);
                } else if (
                  response.error?.message === "Invalid signin credentials"
                ) {
                  actions.setSubmitting(false);
                  toast({
                    title: "Invalid User Credentials",
                    description: `This user does not exist`,
                    status: "error",
                    variant: "left-accent",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                  });
                  actions.resetForm();
                } else if(response.error?.message === "Failed to fetch"){
                  actions.setSubmitting(false);
                  toast({
                    title: "Network Error",
                    description: `Check your internet connection`,
                    status: "error",
                    variant: "left-accent",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                  });
                  actions.resetForm();
                }else{
                  actions.setSubmitting(false);
                  toast({
                    title: "Error creating user",
                    description: `Oops, we've ran into an error. Try again later`,
                    status: "error",
                    variant: "left-accent",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                  });
                  actions.resetForm();
                }
              }}
              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              // }, 1000);
            >
              {(props) => (
                <Form>
                  <Field name="email">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel>Email Address</FormLabel>
                        <Input
                           {...field}
                           focusBorderColor="#53AF28"
                           placeholder="you@example.com"
                           type="email"
                           variant="outline"
                           border={"2px"}
                           borderColor={"#2B2C2D"}
                           bgColor={"#252525"}
                           mb={2}
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                        <Input
                          {...field}
                          focusBorderColor="#53AF28"
                          bgColor={"#252525"}

                          placeholder="••••••••"
                          type={show === false ? "password" : "text"}
                          variant="outline"
                          border={"2px"}
                          borderColor={"#2B2C2D"}
                        />
                        <InputRightElement>
                          <IconButton 
                            icon={show === false ? <IoEye color="white"/> : <IoEyeOff color="white"/>}
                            aria-label="show-hide password"
                            onClick={() => setShow(!show)}
                            size="sm"
                            bgColor={"#2B2C2D"}
                            _hover={{bgColor:"#252525"}}
                          />
                        </InputRightElement>
                      </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex align="center">
                    <Text
                      color="gray.500"
                      fontSize={12}
                      fontWeight={500}
                      mt={2}
                      mb={10}
                    >
                      Forgot password?{" "}
                      <NextLink href="#" passHref>
                        <Link color="#016706">
                          <strong>Reset it</strong>
                        </Link>
                      </NextLink>
                    </Text>
                  </Flex>

                  <Button
                    w="full"
                    bg="#016706"
                    color="white"
                    _hover={{ bg: "#008F06" }}
                    isLoading={props.isSubmitting}
                    isDisabled={!props.isValid || !props.dirty ? true : false}
                    type="submit"
                  >
                    Sign In
                  </Button>
                </Form>
              )}
            </Formik>
            <Flex gap={2} mt={{ base: 6, lg: 4}} align="center" mb={"30px"}>
              <Text fontSize={{ base: "12px"}}>Don't have an account?</Text>
              <Button
                display="inline"
                variant="link"
                color="#016706"
                fontSize={{ base: "12px"}}
                onClick={() =>
                  router.push("/signup")
                }
              >
              Create your account
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Image
        src="/lmglow.png"
        w="75%"
        pos="absolute"
        top="30%"
        left="40%"
        pointerEvents="none"
      /> 
    </Layout>
  );
}
