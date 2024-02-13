"use client";

import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Icon,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image"
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { FaTelegramPlane } from "react-icons/fa";
import Logout from "../../../public/new_lm/Frame-1.png"
import {
  IoMenu,
  IoChevronForward,
  IoAdd,
  IoChatbubbleEllipsesOutline,
  IoGlobeOutline,
  IoRemoveCircleOutline,
} from "react-icons/io5";
import FileUpload from "./FileUpload";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type User = {
  user4: any;
  handleClearChats: () => Promise<void>;
  selectedPdf: string;
  onGlobal: () => void;
  handlePdfClick: (pdf: string) => void;
  onReload: () => Promise<void>;
  pdfList: any[];
  handleRemovePdf: (pdfId: any, pdfName: any, pdfListId: any) => Promise<void>
  constantineOnReload: () => Promise<void>;
  constantinePdfList: any[];
  isUploaded: boolean;
  setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  newFile: boolean;
  setNewFile: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedPdf: React.Dispatch<React.SetStateAction<string | null | undefined>>
  fileUpload: boolean
  setFileUpload: React.Dispatch<React.SetStateAction<boolean>>
};

export default function UserProfile({
  user4,
  handleClearChats,
  selectedPdf,
  handlePdfClick,
  onGlobal,
  onReload,
  pdfList,
  handleRemovePdf,
  constantinePdfList,
  constantineOnReload,
  isUploaded,
  setIsUploaded,
  newFile,
  setNewFile,
  setSelectedPdf,
  fileUpload,
  setFileUpload
}: User | any) {
  // const [pdfList, setPdfList] = useState<any[]>([]);
  // const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  let username:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined
    | any;
  const supabase = createClientComponentClient();
  const [loading, setLoading] = React.useState(false);

  if (user4) {
    username = user4.user_metadata.username;
  }

  const router = useRouter();
  const toast = useToast();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const fileName = localStorage.getItem("file");
  // const handleChat = () => {
  //   localStorage.removeItem("responses");
  //   localStorage.removeItem("requests");
  //   toast({
  //     title: "Chat Cleared",
  //     position: "top-right",
  //     description: "You have cleared the chat",
  //     status: "success",
  //     variant: "left-accent",
  //     duration: 5000,
  //     isClosable: true,
  //   });
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 1000);
  // };

  useEffect(() => {
    // const onReload = async () => {
    //   const listOfPdfs = async () => {
    //     const condition = { column_value: user4.id }; // Replace with your own condition
    //     const arr: any[] = []

    //     function delay(ms: number | undefined) {
    //       return new Promise(resolve => setTimeout(resolve, ms));
    //     }

    //     const data: any[] | any = await delay(5000).then(async () => {
    //       const { data, error } = await supabase
    //         .from('booklist')
    //         .select('*')
    //         .eq('user_id', condition.column_value);

    //       if (error) {
    //         console.log(error);
    //       } else {
    //         console.log("This is the list of books: " + JSON.stringify(data));
    //         return data;
    //       }
    //     });

    //     console.log(data)
    //     data.map((element: any) => (
    //       arr.push(element.book_name)
    //     ))
    //     return arr;
    //   }

    //   const pdfList: any = await listOfPdfs()

    //   const uniqueArrayPdfList = pdfList.filter(
    //     (value: any, index: any, self: any) => self.indexOf(value) === index
    //   );
    //   console.log(uniqueArrayPdfList);
    //   setPdfList(uniqueArrayPdfList)
    // }

    onReload();
  }, []);

  const handleLogout = () => {
    setLoading(true)
    fetch("/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setLoading(false);
          toast({
            title: "Signout Complete",
            description: `You have successfully Signed out`,
            status: "success",
            variant: "left-accent",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
          setTimeout(() => {
            router.push('/');
          }, 1000)
        } else {
          toast({
            title: "Could not signout",
            description: `Error completing signout process`,
            status: "error",
            variant: "left-accent",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    constantineOnReload()
  }, [])

  // Add this function to set the selected PDF when a Flex is clicked
  // const handlePdfClick = (pdf: string) => {
  //   localStorage.setItem("file", pdf)
  //   setSelectedPdf(pdf);
  // };

  return (
    <HStack gap={5} mr={5}>
      {/* <Flex
        _hover={{border: "1px solid", borderColor: "#DF2222", color: "#DF2222", bgColor: "transparent" }}
        borderRadius="0.2rem"
        color="white"
        bgColor="#DF2222"
        // bg={{ base: "none", md: "none" }}
        // minW={{ base: 20, md:  }}
        // h={{ base: 8, md: 12 }}
        py={"1"}
        px={"2"}
        cursor="pointer"
        justify="center"
        align="center"
        display={{ base: "none", lg: "flex" }}
        onClick={handleRemovePdf()}
      >
        <Text fontWeight={500} fontSize="0.9em">
          Delete Pdf
        </Text>
      </Flex>

      <Box w={"1px"} h={"60%"} bgColor={"white"} borderRadius={"xl"}/> */}

      <Flex
        _hover={{border: "1px solid", borderColor: "white", color: "white", bgColor: "transparent" }}
        borderRadius="0.2rem"
        color="#14171D"
        bgColor="white"
        // bg={{ base: "none", md: "none" }}
        // minW={{ base: 20, md:  }}
        // h={{ base: 8, md: 12 }}
        py={"1"}
        px={"2"}
        cursor="pointer"
        justify="center"
        align="center"
        display={{ base: "none", lg: "flex" }}
        onClick={onOpen}
      >
        <Text fontWeight={500} fontSize="0.9em">
          Upload
        </Text>
      </Flex>

      <Box w={"1.5px"} h={"60%"} bgColor={"white"} borderRadius={"xl"}/>

      {user4 && (
        <>
          <Flex zIndex={2} w={8} h={8} p={"1"} justify={"center"} alignItems={"center"} borderRadius={"full"} bgColor={"#FF6B00"} fontSize={"1rem"} fontWeight={500} mr={18}>
             <Text>{username !== null && username !== undefined && username[0]}</Text>
          </Flex>
        </>
      )}

        <Button 
          bgColor={"transparent"}
          _hover={{bg: "transparent"}}          
          css={{
            '&:hover path': {
              fill: '#BD1111', // Change to the desired hover color
            },
          }}
        >
          <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"          
          >
            <path d="M22.1426 6.20508L29.3379 13.4004C29.7598 13.8223 30 14.4023 30 15C30 15.5977 29.7598 16.1777 29.3379 16.5996L22.1426 23.7949C21.7676 24.1699 21.2637 24.375 20.7363 24.375C19.6406 24.375 18.75 23.4844 18.75 22.3887V18.75H11.25C10.2129 18.75 9.375 17.9121 9.375 16.875V13.125C9.375 12.0879 10.2129 11.25 11.25 11.25H18.75V7.61133C18.75 6.51562 19.6406 5.625 20.7363 5.625C21.2637 5.625 21.7676 5.83594 22.1426 6.20508ZM9.375 5.625H5.625C4.58789 5.625 3.75 6.46289 3.75 7.5V22.5C3.75 23.5371 4.58789 24.375 5.625 24.375H9.375C10.4121 24.375 11.25 25.2129 11.25 26.25C11.25 27.2871 10.4121 28.125 9.375 28.125H5.625C2.51953 28.125 0 25.6055 0 22.5V7.5C0 4.39453 2.51953 1.875 5.625 1.875H9.375C10.4121 1.875 11.25 2.71289 11.25 3.75C11.25 4.78711 10.4121 5.625 9.375 5.625Z" fill="#DF2222"/>
          </svg>

          {/* <Image 
            src={Logout}
            alt={"logout"}
            width={30}
          /> */}
        </Button>

      <Flex justify="end" display={{ base: "flex", lg: "none" }}>
        <IconButton
          variant="ghost"
          aria-label="menu"
          icon={<Icon as={IoMenu} w="5" h="5" />}
          onClick={onDrawerOpen}
        />
      </Flex>

      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            {/* <Flex direction="column" textAlign="start" align="start" gap={5}>
              {links.map((link) => (
                <Button variant="link" key={link.path} color="#008F06">
                  {link.text}
                </Button>
              ))}
            </Flex> */}
            {/* <Divider mt={10} /> */}
            <Flex mt="2" align="center" gap={3} direction="column" position={"relative"}>
            {user4 && (
                <Flex
                  _hover={{ bg: "red.500", color: "white" }}
                  borderRadius="full"
                  border="1px solid"
                  color="red.500"
                  borderColor="red.500"
                  bg={{ base: "none", md: "none" }}
                  w="full"
                  h={12}
                  cursor="pointer"
                  justify="center"
                  align="center"
                >
                  <form action="/auth/signout" method="post">
                    <button type="submit">
                      <Text fontWeight={600} fontSize="0.9em">
                        Logout
                      </Text>
                    </button>
                  </form>
                </Flex>
              )}              

              <Flex
                _hover={{ bg: "red.500", color: "white" }}
                borderRadius="full"
                border="1px solid"
                color="red.500"
                borderColor="red.500"
                bg={{ base: "none", md: "none" }}
                w="full"
                h={12}
                cursor="pointer"
                justify="center"
                align="center"
                onClick={() => {handleClearChats(localStorage.getItem("file"))}}
              >
                <Text fontWeight={600} fontSize="0.9em">
                  Clear Chat
                </Text>
              </Flex>

              <Flex
                w="full"
                h="20px"
                mt={2}
                align="center"
                justify="center"
                bg="#53AF28"
                color="white"
                border="1px solid #53AF28"
                _hover={{ color: "#005103", bg: "#90E768" }}
                py={5}
                pl={3}
                borderRadius="md"
                cursor="pointer"
                onClick={onOpen}
              >
                <Icon as={IoAdd} w="5" h="5" />
                Upload Note
              </Flex>

              <Flex
                w="full"
                h="20px"
                mt={2}
                mb={13}
                align="center"
                justify="start"
                bg={"none" === selectedPdf ? "#53AF28" : ""}
                color={"none" === selectedPdf ? "white" : "#53AF28"}
                border="1px solid #53AF28"
                _hover={
                  "none" === selectedPdf
                    ? { color: "white", bg: "#53AF28" }
                    : { color: "#005103", bg: "#90E768" }
                }
                _active={{ color: "white", bg: "#53AF28" }}
                py={5}
                pl={3}
                borderRadius="md"
                cursor="pointer"
                onClick={onGlobal}
              >
                <Icon as={IoGlobeOutline} w="5" h="5" mr={"1"} />
                Global
              </Flex>

              <Flex 
                direction={"column"}
                w={'full'} 
                overflowY={"auto"}
                display={"block"}
                h={"35vh"}
                >
              {pdfList.map(
                (
                  pdf:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | React.PromiseLikeOfReactNode
                    | null
                    | undefined
                    | any,
                  index: React.Key | null | undefined
                ) => (
                  <Flex
                  key={index}
                  position={"relative"}
                  h="50px"
                  mt={5}
                  gap={2}
                  justify="start"
                  align="center"
                  // Change the background color based on selectedPdf
                  bg={pdf.book_name === selectedPdf ? "#53AF28" : ""}
                  color={pdf.book_name === selectedPdf ? "white" : "#53AF28"}
                  w="full"
                  border={"1px solid #53AF28"}
                  _hover={pdf.book_name === selectedPdf ? {color: "white", bg: "#53AF28"} : { color: "#005103", bg: "#90E768" }}
                  _active={{ color: "white", bg: "#53AF28" }}
                  pl={3}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handlePdfClick(pdf.book_name)}
                  >
                    <Icon as={IoChatbubbleEllipsesOutline} w="5" h="5" />
                    <Text noOfLines={1} textOverflow="ellipsis" key={index} w={"70%"}>
                      {pdf.book_name}
                    </Text>
                    <Icon as={IoRemoveCircleOutline} onClick={(e) =>{e.stopPropagation(); handleRemovePdf(pdf.id, pdf.book_name, index)}} position={"absolute"} top={"50%"} right={3} transform={"translateY(-50%)"} _hover={pdf.book_name === selectedPdf ? {color: "white", bg: "#3C7C1C",  borderRadius: '100%'} : {color: "white", bg: "#53AF28",  borderRadius: '100%'}} w="5" h="5" />
                  </Flex>
                )
              )}

              {constantinePdfList.map((pdf: any, index: any)=> (
                <Flex
                key={index}
                h="50px"
                mt={5}
                gap={2}
                justify="start"
                align="center"
                // Change the background color based on selectedPdf
                // bg={pdf.book_name === selectedPdf ? "#53AF28" : ""}
                color={"#53AF28"}
                w="full"
                border={"1px solid #53AF28"}
                // _hover={pdf.book_name === selectedPdf ? {color: "white", bg: "#53AF28"} : { color: "#005103", bg: "#90E768" }}
                // _active={{ color: "white", bg: "#53AF28" }}
                pl={3}
                borderRadius="md"
                cursor="pointer"
                // onClick={() => handlePdfClick(pdf)}
              >
                <Icon as={IoChatbubbleEllipsesOutline} w="5" h="5" />
                <Text noOfLines={1} textOverflow="ellipsis" key={index}>
                  {pdf.book_name}
                </Text>
              </Flex>
              ))
                
              }
              </Flex>

              <Flex
                align="center"
                gap="1"
                cursor="pointer"
                color="#008F06"
                _hover={{ color: "#005103", fontWeight: 500 }}
                role="group"
                onClick={() => router.push("https://t.me/NEARCommunity")}
                pos="fixed"
                bottom={10}
              >
                <Icon
                  as={FaTelegramPlane}
                  bgColor="#008F06"
                  color="#FFF"
                  _groupHover={{ bg: "#005103" }}
                  p={1}
                  borderRadius="full"
                  w="7"
                  h="7"
                />
                <Text>Join our Community</Text>
              </Flex>
            </Flex>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Modal
        isCentered
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
        // size={{ base: "sm", md: "md", lg: "lg" }}
      >
        <ModalOverlay />
        <ModalContent
          minW={{ base: "12rem", md: "24rem", lg: "33rem" }}
          minH="20rem"
          borderColor="white"
          borderRadius="10px"
        >
          <ModalHeader
            borderRadius="10px 10px 0 0 "
            bgGradient="linear(to-l, #00F0FF, #53AF28)"
            color="white"
          >
            Lecture Mate - Upload File
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={7}>
            <FileUpload user3={user4}
            isUploaded = {isUploaded}
            setIsUploaded = {setIsUploaded}
            newFile = {newFile}
            setNewFile = {setNewFile}
            setSelectedPdf = {setSelectedPdf}
            fileUpload={fileUpload}
            setFileUpload={setFileUpload}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </HStack>
  );
}

// "use client";

// import {
//   IconButton,
//   Avatar,
//   Box,
//   Flex,
//   HStack,
//   Drawer,
//   DrawerBody,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Text,
//   Icon,
//   Button,
//   useDisclosure,
//   Image,
//   useToast,
// } from "@chakra-ui/react";
// import Link from "next/link";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { FaTelegramPlane } from "react-icons/fa";
// import {
//   IoMenu,
//   IoChevronForward,
//   IoAdd,
//   IoChatbubbleEllipsesOutline,
//   IoGlobeOutline,
//   IoRemoveCircleOutline,
// } from "react-icons/io5";
// import FileUpload from "./FileUpload";
// import { useEffect, useState } from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// type User = {
//   user4: any;
//   handleClearChats: () => Promise<void>;
//   selectedPdf: string;
//   onGlobal: () => void;
//   handlePdfClick: (pdf: string) => void;
//   onReload: () => Promise<void>;
//   pdfList: any[];
//   handleRemovePdf: (pdfId: any, pdfName: any, pdfListId: any) => Promise<void>
//   constantineOnReload: () => Promise<void>;
//   constantinePdfList: any[];
//   isUploaded: boolean;
//   setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>;
//   newFile: boolean;
//   setNewFile: React.Dispatch<React.SetStateAction<boolean>>
//   setSelectedPdf: React.Dispatch<React.SetStateAction<string | null | undefined>>
//   fileUpload: boolean
//   setFileUpload: React.Dispatch<React.SetStateAction<boolean>>
// };

// export default function UserProfile({
//   user4,
//   handleClearChats,
//   selectedPdf,
//   handlePdfClick,
//   onGlobal,
//   onReload,
//   pdfList,
//   handleRemovePdf,
//   constantinePdfList,
//   constantineOnReload,
//   isUploaded,
//   setIsUploaded,
//   newFile,
//   setNewFile,
//   setSelectedPdf,
//   fileUpload,
//   setFileUpload
// }: User | any) {
//   // const [pdfList, setPdfList] = useState<any[]>([]);
//   // const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
//   let username:
//     | string
//     | number
//     | boolean
//     | React.ReactElement<any, string | React.JSXElementConstructor<any>>
//     | Iterable<React.ReactNode>
//     | React.ReactPortal
//     | React.PromiseLikeOfReactNode
//     | null
//     | undefined;
//   const supabase = createClientComponentClient();

//   if (user4) {
//     username = user4.user_metadata.username;
//   }

//   const router = useRouter();
//   const toast = useToast();
//   const {
//     isOpen: isDrawerOpen,
//     onOpen: onDrawerOpen,
//     onClose: onDrawerClose,
//   } = useDisclosure();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   // const fileName = localStorage.getItem("file");
//   // const handleChat = () => {
//   //   localStorage.removeItem("responses");
//   //   localStorage.removeItem("requests");
//   //   toast({
//   //     title: "Chat Cleared",
//   //     position: "top-right",
//   //     description: "You have cleared the chat",
//   //     status: "success",
//   //     variant: "left-accent",
//   //     duration: 5000,
//   //     isClosable: true,
//   //   });
//   //   setTimeout(() => {
//   //     window.location.reload();
//   //   }, 1000);
//   // };

//   useEffect(() => {
//     // const onReload = async () => {
//     //   const listOfPdfs = async () => {
//     //     const condition = { column_value: user4.id }; // Replace with your own condition
//     //     const arr: any[] = []

//     //     function delay(ms: number | undefined) {
//     //       return new Promise(resolve => setTimeout(resolve, ms));
//     //     }

//     //     const data: any[] | any = await delay(5000).then(async () => {
//     //       const { data, error } = await supabase
//     //         .from('booklist')
//     //         .select('*')
//     //         .eq('user_id', condition.column_value);

//     //       if (error) {
//     //         console.log(error);
//     //       } else {
//     //         console.log("This is the list of books: " + JSON.stringify(data));
//     //         return data;
//     //       }
//     //     });

//     //     console.log(data)
//     //     data.map((element: any) => (
//     //       arr.push(element.book_name)
//     //     ))
//     //     return arr;
//     //   }

//     //   const pdfList: any = await listOfPdfs()

//     //   const uniqueArrayPdfList = pdfList.filter(
//     //     (value: any, index: any, self: any) => self.indexOf(value) === index
//     //   );
//     //   console.log(uniqueArrayPdfList);
//     //   setPdfList(uniqueArrayPdfList)
//     // }

//     onReload();
//   }, []);

//   useEffect(() => {
//     constantineOnReload()
//   }, [])

//   // Add this function to set the selected PDF when a Flex is clicked
//   // const handlePdfClick = (pdf: string) => {
//   //   localStorage.setItem("file", pdf)
//   //   setSelectedPdf(pdf);
//   // };

//   return (
//     <HStack ml={1}>
//       {user4 && (
//         <>
//           <Text zIndex={2} ml={5}>
//             Hi, {username}
//           </Text>
//         </>
//       )}
//       <Flex
//         _hover={{ bg: "red.500", color: "white" }}
//         borderRadius="full"
//         border="1px solid"
//         color="red.500"
//         borderColor="red.500"
//         bg={{ base: "none", md: "none" }}
//         minW={{ base: 20, md: 40 }}
//         h={{ base: 8, md: 12 }}
//         cursor="pointer"
//         justify="center"
//         align="center"
//         display={{ base: "none", lg: "flex" }}
//         onClick={() => handleClearChats(localStorage.getItem("file"))}
//       >
//         <Text fontWeight={600} fontSize="0.9em">
//           Clear Chat
//         </Text>
//       </Flex>
//       <Text zIndex={2} mr={{ base: -10, md: 0 }} ml={5}>
//         25
//       </Text>
//       <Flex mr={{ base: -7, md: 0 }} ml={{ base: 0, md: -10 }}>
//         <Image src="/star.gif" w="100px" zIndex={-1} />
//       </Flex>
//       <Flex justify="end" display={{ base: "flex", lg: "none" }}>
//         <IconButton
//           variant="ghost"
//           aria-label="menu"
//           icon={<Icon as={IoMenu} w="5" h="5" />}
//           onClick={onDrawerOpen}
//         />
//       </Flex>

//       <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerCloseButton />
//           <DrawerHeader>Menu</DrawerHeader>

//           <DrawerBody>
//             {/* <Flex direction="column" textAlign="start" align="start" gap={5}>
//               {links.map((link) => (
//                 <Button variant="link" key={link.path} color="#008F06">
//                   {link.text}
//                 </Button>
//               ))}
//             </Flex> */}
//             {/* <Divider mt={10} /> */}
//             <Flex mt="2" align="center" gap={3} direction="column" position={"relative"}>
//             {user4 && (
//                 <Flex
//                   _hover={{ bg: "red.500", color: "white" }}
//                   borderRadius="full"
//                   border="1px solid"
//                   color="red.500"
//                   borderColor="red.500"
//                   bg={{ base: "none", md: "none" }}
//                   w="full"
//                   h={12}
//                   cursor="pointer"
//                   justify="center"
//                   align="center"
//                 >
//                   <form action="/auth/signout" method="post">
//                     <button type="submit">
//                       <Text fontWeight={600} fontSize="0.9em">
//                         Logout
//                       </Text>
//                     </button>
//                   </form>
//                 </Flex>
//               )}              

//               <Flex
//                 _hover={{ bg: "red.500", color: "white" }}
//                 borderRadius="full"
//                 border="1px solid"
//                 color="red.500"
//                 borderColor="red.500"
//                 bg={{ base: "none", md: "none" }}
//                 w="full"
//                 h={12}
//                 cursor="pointer"
//                 justify="center"
//                 align="center"
//                 onClick={() => {handleClearChats(localStorage.getItem("file"))}}
//               >
//                 <Text fontWeight={600} fontSize="0.9em">
//                   Clear Chat
//                 </Text>
//               </Flex>

//               <Flex
//                 w="full"
//                 h="20px"
//                 mt={2}
//                 align="center"
//                 justify="center"
//                 bg="#53AF28"
//                 color="white"
//                 border="1px solid #53AF28"
//                 _hover={{ color: "#005103", bg: "#90E768" }}
//                 py={5}
//                 pl={3}
//                 borderRadius="md"
//                 cursor="pointer"
//                 onClick={onOpen}
//               >
//                 <Icon as={IoAdd} w="5" h="5" />
//                 Upload Note
//               </Flex>

//               <Flex
//                 w="full"
//                 h="20px"
//                 mt={2}
//                 mb={13}
//                 align="center"
//                 justify="start"
//                 bg={"none" === selectedPdf ? "#53AF28" : ""}
//                 color={"none" === selectedPdf ? "white" : "#53AF28"}
//                 border="1px solid #53AF28"
//                 _hover={
//                   "none" === selectedPdf
//                     ? { color: "white", bg: "#53AF28" }
//                     : { color: "#005103", bg: "#90E768" }
//                 }
//                 _active={{ color: "white", bg: "#53AF28" }}
//                 py={5}
//                 pl={3}
//                 borderRadius="md"
//                 cursor="pointer"
//                 onClick={onGlobal}
//               >
//                 <Icon as={IoGlobeOutline} w="5" h="5" mr={"1"} />
//                 Global
//               </Flex>

//               <Flex 
//                 direction={"column"}
//                 w={'full'} 
//                 overflowY={"auto"}
//                 display={"block"}
//                 h={"35vh"}
//                 >
//               {pdfList.map(
//                 (
//                   pdf:
//                     | string
//                     | number
//                     | boolean
//                     | React.ReactElement<
//                         any,
//                         string | React.JSXElementConstructor<any>
//                       >
//                     | Iterable<React.ReactNode>
//                     | React.ReactPortal
//                     | React.PromiseLikeOfReactNode
//                     | null
//                     | undefined
//                     | any,
//                   index: React.Key | null | undefined
//                 ) => (
//                   <Flex
//                   key={index}
//                   position={"relative"}
//                   h="50px"
//                   mt={5}
//                   gap={2}
//                   justify="start"
//                   align="center"
//                   // Change the background color based on selectedPdf
//                   bg={pdf.book_name === selectedPdf ? "#53AF28" : ""}
//                   color={pdf.book_name === selectedPdf ? "white" : "#53AF28"}
//                   w="full"
//                   border={"1px solid #53AF28"}
//                   _hover={pdf.book_name === selectedPdf ? {color: "white", bg: "#53AF28"} : { color: "#005103", bg: "#90E768" }}
//                   _active={{ color: "white", bg: "#53AF28" }}
//                   pl={3}
//                   borderRadius="md"
//                   cursor="pointer"
//                   onClick={() => handlePdfClick(pdf.book_name)}
//                   >
//                     <Icon as={IoChatbubbleEllipsesOutline} w="5" h="5" />
//                     <Text noOfLines={1} textOverflow="ellipsis" key={index} w={"70%"}>
//                       {pdf.book_name}
//                     </Text>
//                     <Icon as={IoRemoveCircleOutline} onClick={(e) =>{e.stopPropagation(); handleRemovePdf(pdf.id, pdf.book_name, index)}} position={"absolute"} top={"50%"} right={3} transform={"translateY(-50%)"} _hover={pdf.book_name === selectedPdf ? {color: "white", bg: "#3C7C1C",  borderRadius: '100%'} : {color: "white", bg: "#53AF28",  borderRadius: '100%'}} w="5" h="5" />
//                   </Flex>
//                 )
//               )}

//               {constantinePdfList.map((pdf: any, index: any)=> (
//                 <Flex
//                 key={index}
//                 h="50px"
//                 mt={5}
//                 gap={2}
//                 justify="start"
//                 align="center"
//                 // Change the background color based on selectedPdf
//                 // bg={pdf.book_name === selectedPdf ? "#53AF28" : ""}
//                 color={"#53AF28"}
//                 w="full"
//                 border={"1px solid #53AF28"}
//                 // _hover={pdf.book_name === selectedPdf ? {color: "white", bg: "#53AF28"} : { color: "#005103", bg: "#90E768" }}
//                 // _active={{ color: "white", bg: "#53AF28" }}
//                 pl={3}
//                 borderRadius="md"
//                 cursor="pointer"
//                 // onClick={() => handlePdfClick(pdf)}
//               >
//                 <Icon as={IoChatbubbleEllipsesOutline} w="5" h="5" />
//                 <Text noOfLines={1} textOverflow="ellipsis" key={index}>
//                   {pdf.book_name}
//                 </Text>
//               </Flex>
//               ))
                
//               }
//               </Flex>

//               <Flex
//                 align="center"
//                 gap="1"
//                 cursor="pointer"
//                 color="#008F06"
//                 _hover={{ color: "#005103", fontWeight: 500 }}
//                 role="group"
//                 onClick={() => router.push("https://t.me/NEARCommunity")}
//                 pos="fixed"
//                 bottom={10}
//               >
//                 <Icon
//                   as={FaTelegramPlane}
//                   bgColor="#008F06"
//                   color="#FFF"
//                   _groupHover={{ bg: "#005103" }}
//                   p={1}
//                   borderRadius="full"
//                   w="7"
//                   h="7"
//                 />
//                 <Text>Join our Community</Text>
//               </Flex>
//             </Flex>
//           </DrawerBody>

//           <DrawerFooter></DrawerFooter>
//         </DrawerContent>
//       </Drawer>

//       <Modal
//         isCentered
//         motionPreset="slideInBottom"
//         isOpen={isOpen}
//         onClose={onClose}
//         // size={{ base: "sm", md: "md", lg: "lg" }}
//       >
//         <ModalOverlay />
//         <ModalContent
//           minW={{ base: "12rem", md: "24rem", lg: "33rem" }}
//           minH="20rem"
//           borderColor="white"
//           borderRadius="10px"
//         >
//           <ModalHeader
//             borderRadius="10px 10px 0 0 "
//             bgGradient="linear(to-l, #00F0FF, #53AF28)"
//             color="white"
//           >
//             Lecture Mate - Upload File
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody mb={7}>
//             <FileUpload user3={user4}
//             isUploaded = {isUploaded}
//             setIsUploaded = {setIsUploaded}
//             newFile = {newFile}
//             setNewFile = {setNewFile}
//             setSelectedPdf = {setSelectedPdf}
//             fileUpload={fileUpload}
//             setFileUpload={setFileUpload}
//             />
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </HStack>
//   );
// }
