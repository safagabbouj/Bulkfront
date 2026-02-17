export class UserDto {
    constructor(input) {
        this.firstName = input.firstName;
        this.lastName = input.lastName;
        this.email = input.email;
        this.phone = input.phone;
        this.role = input.role || "ROLE_USER";
    }
}
