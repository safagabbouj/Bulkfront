export class OtpGenerationDto {
    constructor(input = {}) {
        this.publicKey = input.publicKey || "";
        this.code = input.code || "";
        this.counter = input.counter || 0;
        this.sessionTime = input.sessionTime || "";
        this.operationStatus = input.operationStatus || "";
        this.comment = input.comment || "";
        this.generationDate = input.generationDate || 0;
    }
}
