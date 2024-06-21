/* eslint-disable react-hooks/rules-of-hooks */

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const usePostRequest = () => {
  return (url, onSuccess, onError) => {
    const mutation = useMutation({
      mutationFn: async (data) => {
        const accessToken = sessionStorage.getItem("access_token");

        const headers = {
          "Content-Type": "application/json",
        };
        
        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }
    
        return await axios.post(url, data, { headers });
      },
      onSuccess,
      onError,
    });

    const { mutate, isPending, isSuccess, isError } = mutation;

    return {
      mutate,
      isPending,
      isSuccess,
      isError,
    };
  };
};

export default usePostRequest;
