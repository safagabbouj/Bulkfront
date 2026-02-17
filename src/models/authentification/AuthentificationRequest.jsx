export class AuthenticationRequest {
    constructor(input = {}) {
        this.email = input.email || "";
        this.password = input.password || "";
    }
}
