export class ResetPasswordDto {
    constructor(input) {
        this.userEmail = input.userEmail;
        this.otp = input.otp;
        this.newPassword = input.newPassword;
        this.confirmPassword = input.confirmPassword;
    }
}
