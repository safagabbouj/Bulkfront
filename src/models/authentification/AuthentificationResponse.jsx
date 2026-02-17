export class AuthenticationResponse {
    constructor(input = {}) {
        this.otpGenerationDto = input.otpGenerationDto || null;
        this.verifyLogin = input.verifyLogin || false;
    }
}
