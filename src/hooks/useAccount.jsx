// useAccountSubjects.js
import { useQuery } from "@tanstack/react-query";
import { fetchAccountSubjects } from "../services/accountService";

export const useAccountSubjects = () => {
    return useQuery({
        queryKey: ["account-subjects"],
        queryFn: fetchAccountSubjects,
        staleTime: 5 * 60 * 1000,
    });
};
