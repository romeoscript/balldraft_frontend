/* eslint-disable react-hooks/rules-of-hooks */

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const usePostRequest = () => {
  return (url, onSuccess, onError) => {
    const mutation = useMutation({
      mutationFn: async (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
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

    return {
      mutate: mutation.mutate,
      isLoading: mutation.isLoading,
    };
  };
};

export default usePostRequest;
