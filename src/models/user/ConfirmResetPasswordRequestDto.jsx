export class ConfirmResetPasswordRequestDto {
    constructor(input = {}) {
        this.email = input.email || "";
        this.otp = input.otp || "";
        this.newPassword = input.newPassword || "";
        this.confirmPassword = input.confirmPassword || "";
        this.otpUser = input.otpUser || "";
    }
}
