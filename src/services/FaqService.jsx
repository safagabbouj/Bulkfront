import { API_ENDPOINT } from "../utils/API_ENDPOINT";
import { ApiCall } from "./ApiCall";

export const FaqService = {
    returnFaqs: () => {
        return ApiCall.post(
            API_ENDPOINT.RETURN_ALL_FAQ
        );
    },

    addFaq: (faqDto) => {
        return ApiCall.post(
            API_ENDPOINT.ADD_FAQ,
            faqDto
        );
    }
};
