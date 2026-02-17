export class VerificationRequest {
    constructor(input = {}) {
        this.email = input.email || "";
        this.otpCode = input.otpCode || "";
        this.otpCodeUser = input.otpCodeUser || "";
    }
}
