"use client";
import {
  ChakraProvider,
  ThemeProvider,
  Box,
  Center,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Head from "next/head";
import theme from "../../../themes";
import Router, { useRouter } from "next/router";
import TopBarProgress from "react-topbar-progress-indicator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to Lecture Mate",
  description: "Lecture is now your mate",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = React.useState(false);
  Router.events.on("routeChangeStart", () => {
    setProgress(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setProgress(false);
  });
  TopBarProgress.config({
    barColors: {
      "0": "#008F06",
      "1.0": "#00F0FF",
    },
  });
  const [showChild, setShowChild] = React.useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <ChakraProvider theme={theme}>
          {progress && <TopBarProgress />}
          <Center>
            <Box minH="100vh" minW="full" 
            // backgroundImage="url('../../../public/lmstar.png')"
            bgColor={'#14171D'}
            textColor={"white"}
            backgroundImage={'./lmstar.png'}
            backgroundSize="cover"
            backgroundPosition="center" 
            bgSize="cover">
              <Flex h={'100vh'} w={"full"} position={"relative"} overflow={"hidden"}>{children}</Flex>
            </Box>
          </Center>
        </ChakraProvider>
      </ThemeProvider>
    );
  }
}
