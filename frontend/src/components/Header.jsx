import {
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  useColorMode,
} from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { Link as RouterLink } from "react-router-dom";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <>
      <Flex justifyContent={"space-between"} mt={6} mb="12">
        {user && (
          <Link to="/">
            <AiFillHome size={20} />
          </Link>
        )}
        {!user && (
          <Link
            as={RouterLink}
            to={"/auth"}
            onClick={() => setAuthScreen("login")}
          >
            Login
          </Link>
        )}
        <Image
          cursor={"pointer"}
          alt="logo"
          w={8}
          h={6}
          src={colorMode === "dark" ? "/dark.png" : "/light.png"}
          onClick={toggleColorMode}
        />
        {user && (
          <Flex justifyContent={"space-between"}>
            <Flex justifyContent={"space-between"} mr={5}>
              <Link to="/chat">
                <BsFillChatQuoteFill size={22} />
              </Link>
            </Flex>
            <Flex ml={1} mr={5}>
              <Link to="/settings">
                <MdOutlineSettings size={22} />
              </Link>
            </Flex>
            <Menu>
              <MenuButton>
                <RxAvatar size={24} />
              </MenuButton>

              <Portal>
                <MenuList
                  bg="gray.dark" // Background color for MenuList
                  color="white" // Text color for MenuList items
                  boxShadow="md" // Box shadow for MenuList
                  // Border color for MenuList
                  borderRadius="md" // Border radius for MenuList
                  zIndex={10} // Ensure MenuList is above other elements
                  minWidth="120px"
                  pl={"18px"}
                >
                  <Link to={`/${user.username}`}>
                    <MenuItem bg={"gray.dark"}> Profile</MenuItem>
                  </Link>
                  <MenuItem bg={"gray.dark"}>
                    <LogoutButton />
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Flex>
        )}

        {!user && (
          <Link
            as={RouterLink}
            to={"/auth"}
            onClick={() => setAuthScreen("signup")}
          >
            Sign up
          </Link>
        )}
      </Flex>
    </>
  );
};

export default Header;
