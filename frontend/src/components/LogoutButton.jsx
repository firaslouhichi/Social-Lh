import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        showToast(data.error, "error");
        return;
      }
      localStorage.removeItem("user-threads");
      setUser(null);
      navigate("/auth");
    } catch (error) {
      showToast(error, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      <Text onClick={handleLogout} _loading={loading}>
        {" "}
        Logout{" "}
      </Text>
    </>
  );
};

export default LogoutButton;
