import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { useState } from "react";

const UserPost = ({ postImg, postTitle, likes, replies }) => {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={"/firas_lh/post/pid"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name="Firas LH" src="/profile.jpg" />
          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size="xs"
              name="firas lh"
              src="https://bit.ly/prosper-baba"
              position={"absolute"}
              top={"5px"}
              left="45px"
              padding={"2px"}
            />
            <Avatar
              size="xs"
              name="firas lh"
              src="https://bit.ly/code-beast"
              position={"absolute"}
              top={"5px"}
              left="30px"
              padding={"2px"}
            />
            <Avatar
              size="xs"
              name="firas lh"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={"5px"}
              left="15px"
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                Firas_LH
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text fontSize={"small"}>{postTitle}</Text>
          {postImg && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={postImg} w={"full"} />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize="sm">
              {replies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize="sm">
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
