import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
const CustomToast = ({ description }) => {
  return (
    <Box
      p={2}
      color="white"
      borderRadius="md"
      fontSize="l"
      bgColor="gray.light"
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxWidth="120px"
      marginX="auto"
    >
      <span style={{ margin: "2px" }}>{description}</span>
    </Box>
  );
};
const UserHeader = ({ user }) => {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );
  const [updating, setUpdating] = useState(false);
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        position: "top",
        render: () => <CustomToast description="Link copied" />,
        duration: 2000,
        isClosable: false,
      });
    });
  };

  const handleFollow = async () => {
    if (!currentUser) {
      showToast("Please login to follow", "error");
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast(data.error, "error");
        return;
      }
      if (following) {
        showToast(`Unfollowed ${user.name}`, "success");
        user.followers.pop();
      } else {
        showToast(`Followed ${user.name}`, "success");
        user.followers.push(currentUser?._id);
      }
      setFollowing(!following);
      console.log(data);
    } catch (error) {
      showToast(error, "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>@{user.username}</Text>
            <Text
              fontSize={{
                base: "xs",
                md: "sm",
                lg: "md",
              }}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"6px"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{ base: "md", md: "xl" }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.username}
              src="https://bit.ly/broken-link"
              size={{ base: "md", md: "xl" }}
            />
          )}
        </Box>
      </Flex>
      <Text>{user.bio}</Text>

      {user._id === currentUser?._id && (
        <Link as={RouterLink} to="/update">
          <Button size={"sm"}>update profile</Button>
        </Link>
      )}
      {user._id !== currentUser?._id && (
        <Button size={"sm"} onClick={handleFollow} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>

        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy link
                  </MenuItem>
                  <MenuItem bg={"gray.dark"}>Edit profile</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
