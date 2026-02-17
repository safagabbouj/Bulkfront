import { ApiCall } from "./ApiCall";

export const fetchAccountSubjects = async () => {
    const { data } = await ApiCall.get('/account/subjects');
    return data;
};