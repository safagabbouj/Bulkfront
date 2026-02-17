export class ChangePasswordDto {
    constructor(input = {}) {
        this.currentPassword = input.currentPassword || "";
        this.newPassword = input.newPassword || "";
        this.confirmPassword = input.confirmPassword || "";
    }
}
