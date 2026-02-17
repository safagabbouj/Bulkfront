
import { ApiCall } from "./ApiCall";

export const fetchAccountSubjects = async () => {
    const { data } = await ApiCall.get('/Account/subjects');
    return data;
};
