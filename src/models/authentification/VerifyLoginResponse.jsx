export class VerifyLoginResponse {
    constructor(input = {}) {
        this.accessToken = input.accessToken || "";
        this.user = input.user || null;
    }
}
