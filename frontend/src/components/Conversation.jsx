import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { selectedConversationAtom } from "../atoms/messagesAtom";

const Conversation = ({ conversation, isOnline }) => {
  const user = conversation.participants[0];
  const currentUser = useRecoilValue(userAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const colorMode = useColorMode();
  console.log({ selectedConversation });
  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={"1"}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      onClick={() =>
        setSelectedConversation({
          _id: conversation._id,
          userId: user._id,
          userProfilePic: user.profilePic,
          username: user.username,
          mock: conversation.mock,
        })
      }
      bg={
        selectedConversation?._id === conversation._id
          ? colorMode === "light"
            ? "gray.400"
            : "gray.dark"
          : ""
      }
      textColor={
        selectedConversation?._id === conversation._id
          ? colorMode === "light"
            ? "black"
            : "white"
          : ""
      }
      borderRadius={"md"}
    >
      <WrapItem ml={2}>
        <Avatar
          size={{
            base: "sm",
            sm: "sm",
            md: "sm",
          }}
          src={user?.profilePic}
        >
          {isOnline ? <AvatarBadge boxSize={"1em"} bg="green.500" /> : ""}
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"} gap={0.5}>
        <Text fontWeight="700" display={"flex"} alignItems={"center"}>
          {user?.username}
          <Image src="/verified.png" w={3.5} h={3.5} ml={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser._id === conversation.lastMessage.sender ? (
            <Box color={conversation.lastMessage.seen ? "blue.400" : ""}>
              <BsCheck2All size={16} />
            </Box>
          ) : (
            ""
          )}
          {conversation.lastMessage.text.length > 18
            ? conversation.lastMessage.text.substring(0, 18) + "..."
            : conversation.lastMessage.text || (
                <Flex gap={1.5}>
                  <Flex pt={0.5}>
                    <BsFillImageFill size={14} />
                  </Flex>
                  <Text> Picture</Text>
                </Flex>
              )}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
