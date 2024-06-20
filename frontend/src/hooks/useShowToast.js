import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
  const toast = useToast();
  const showToast = useCallback(
    (description, status) => {
      toast({
        description,
        status,
        duration: 2000,
        isClosable: false,
        position: "top",
      });
    },
    [toast]
  );
  return showToast;
};
export default useShowToast;
