// hooks/useFetchDataPlans.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPackages = async (url) => {
 let accessToken

 if (typeof window !== "undefined") {
  accessToken = sessionStorage.getItem("accessToken");
}
  if (!accessToken) {
    throw new Error("Access token is not available");
  }

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data.data;
};

export const useFetchDataPlans = (apiUrl) => {


  return useQuery({
    queryKey: ["packages"],
    queryFn: () => fetchPackages(apiUrl),
  });
};