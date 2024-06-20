import { Button, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast.js";
import useLogout from "../hooks/useLogout.js";

export const SettingsPage = () => {
  const showToast = useShowToast();
  const logout = useLogout();

  const freezeAccount = async () => {
    if (!window.confirm("Are you sure you want to freeze your account?"))
      return;

    try {
      const res = await fetch("/api/users/freeze", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        return showToast(data.error, "error");
      }
      if (data.success) {
        await logout();
        showToast("Your account has been frozen", "success");
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <>
      <Text my={1} fontWeight={"bold"}>
        Freeze Your Account
      </Text>
      <Text my={1}>You can unfreeze your account anytime by logging in.</Text>
      <Button size={"sm"} colorScheme="red" onClick={freezeAccount}>
        Freeze
      </Button>
    </>
  );
};
export default SettingsPage;