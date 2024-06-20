import { useRecoilValue } from "recoil";
import LoginCard from "../components/LoginCard";
import authScreenAtom from "../atoms/authAtom.js";
import SignupCard from "../components/SignupCard.jsx";
import { Flex, Text } from "@chakra-ui/react";
const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);

  return (
    <>
      {authScreenState === "login" ? <LoginCard /> : <SignupCard />}
      <Flex
        pos={"relative"}
        align={"center"}
        justifyContent={"center"}
        bottom={"0px"}
        mt={8}
      >
        {" "}
        <Text alignItems={"center"} fontWeight={100} size={12}>
          This platform is developed by Firas Louhichi !
        </Text>
      </Flex>
    </>
  );
};

export default AuthPage;
