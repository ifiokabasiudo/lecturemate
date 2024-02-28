import { Text, Flex, Image, Box } from "@chakra-ui/react";
import UserProfile from "./UserProfile";
import { useRouter } from "next/navigation";
// import LeftNav from "./LeftNav";

type User = {
  user3: any;
  handleClearChats: () => Promise<void>;
  selectedPdf: string | any;
  onGlobal: () => void;
  handlePdfClick: (pdf: string) => void;
  onReload: () => Promise<void>;
  pdfList: any[];
  // handleRemovePdf: (pdfId: any, pdfName: any, pdfListId: any) => Promise<void>;
  constantineOnReload: () => Promise<void>;
  constantinePdfList: any[];
  isUploaded: boolean;
  setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  newFile: boolean;
  setNewFile: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPdf: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  fileUpload: boolean
  setFileUpload: React.Dispatch<React.SetStateAction<boolean>>
  reader: string
  setReader: React.Dispatch<React.SetStateAction<string>>
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
};

export default function Layout({
  user3,
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
  setFileUpload,
  reader,
  setReader,
  url,
  setUrl,
}: User | any) {
  const router = useRouter();

  return (
    <Flex w="full" zIndex={5} pos="fixed" >
      <Flex
        zIndex="3"
        top="0"
        bgColor={"#14171D"} 
        color={"white"}
        h={{base: 24, lg: 12}}
        borderBottom={"1px"}
        borderColor={"#B8B9BB"}
        pl={{ base: 0, md: 12 }}
        pr={{ base: 0, md: 3 }}
        alignItems="center"
        justifyContent={{base: "center", lg: "space-between"}}
        w="full"
        overflow="hidden"
        boxShadow="md"
      >
        <Flex
          justify="flex-start"
          align="center"
          gap={2}
          onClick={() => router.push("/")}
          cursor="pointer"
        >
          <Image src="/logowhite.png" alt="grayaxis" w="30px" pointerEvents="none" display={{ base: "none", md: "block" }}/>
          <Text
            fontSize={18}
            fontWeight="700"
            display={{ base: "none", lg: "block" }}
          >
            Lecture Mate
          </Text>
        </Flex>

        <Flex w={{base:"full", lg:"auto"}} h={"full"} justify={{base:"center", lg:"flex-end"}}>
          <UserProfile
            user4={user3}
            handleClearChats={handleClearChats}
            selectedPdf={selectedPdf}
            onGlobal={onGlobal}
            handlePdfClick={handlePdfClick}
            onReload={onReload}
            pdfList={pdfList}
            handleRemovePdf={handleRemovePdf}
            constantinePdfList={constantinePdfList}
            constantineOnReload={constantineOnReload}
            isUploaded={isUploaded}
            setIsUploaded={setIsUploaded}
            newFile={newFile}
            setNewFile={setNewFile}
            setSelectedPdf={setSelectedPdf}
            fileUpload={fileUpload}
            setFileUpload={setFileUpload}
            reader={reader}
            setReader={setReader}
            url={url}
            setUrl={setUrl}
          />
        </Flex>
      </Flex>
      {/* <LeftNav /> */}
    </Flex>
  );
}

// import { Text, Flex, Image, Box } from "@chakra-ui/react";
// import UserProfile from "./UserProfile";
// import { useRouter } from "next/navigation";
// import LeftNav from "./LeftNav";

// type User = {
//   user3: any;
//   handleClearChats: () => Promise<void>;
//   selectedPdf: string | any;
//   onGlobal: () => void;
//   handlePdfClick: (pdf: string) => void;
//   onReload: () => Promise<void>;
//   pdfList: any[];
//   handleRemovePdf: (pdfId: any, pdfName: any, pdfListId: any) => Promise<void>;
//   constantineOnReload: () => Promise<void>;
//   constantinePdfList: any[];
//   isUploaded: boolean;
//   setIsUploaded: React.Dispatch<React.SetStateAction<boolean>>;
//   newFile: boolean;
//   setNewFile: React.Dispatch<React.SetStateAction<boolean>>;
//   setSelectedPdf: React.Dispatch<
//     React.SetStateAction<string | null | undefined>
//   >;
//   fileUpload: boolean
//   setFileUpload: React.Dispatch<React.SetStateAction<boolean>>
// };

// export default function Layout({
//   user3,
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
//   const router = useRouter();

//   return (
//     <Flex w="full" zIndex={5} pos="fixed">
//       <Flex
//         zIndex="3"
//         top="0"
//         bg="white"
//         h={14}
//         pl={{ base: 2, md: 12 }}
//         pr={{ base: 0, md: 3 }}
//         alignItems="center"
//         justifyContent="space-between"
//         w="full"
//         overflow="hidden"
//         boxShadow="md"
//       >
//         <Flex
//           justify="flex-start"
//           align="center"
//           gap={2}
//           onClick={() => router.push("/")}
//           cursor="pointer"
//         >
//           <Image src="/logo.png" alt="grayaxis" w="40px" pointerEvents="none" />
//           <Text
//             fontSize={18}
//             fontWeight="700"
//             display={{ base: "none", md: "block" }}
//             color="#202020"
//           >
//             Lecture Mate
//           </Text>
//         </Flex>

//         <Flex justify="flex-end">
//           <UserProfile
//             user4={user3}
//             handleClearChats={handleClearChats}
//             selectedPdf={selectedPdf}
//             onGlobal={onGlobal}
//             handlePdfClick={handlePdfClick}
//             onReload={onReload}
//             pdfList={pdfList}
//             handleRemovePdf={handleRemovePdf}
//             constantinePdfList={constantinePdfList}
//             constantineOnReload={constantineOnReload}
//             isUploaded={isUploaded}
//             setIsUploaded={setIsUploaded}
//             newFile={newFile}
//             setNewFile={setNewFile}
//             setSelectedPdf={setSelectedPdf}
//             fileUpload={fileUpload}
//             setFileUpload={setFileUpload}
//           />
//         </Flex>
//       </Flex>
//       <LeftNav />
//     </Flex>
//   );
// }