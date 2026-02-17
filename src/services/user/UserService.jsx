import { API_ENDPOINT } from "../../utils/API_ENDPOINT";
import { ChangePasswordDto } from "../../models/user/ChangePasswordDto";
import { ApiCall } from "../ApiCall";

export const UserService = {
    changePassword: (changePasswordDto) => {
        return ApiCall.patch(
            API_ENDPOINT.CHANGE_PASSWORD,
            changePasswordDto
        );
    }
};
