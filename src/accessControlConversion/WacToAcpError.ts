import { TranslationError } from "./TranslationError.js"

export class WacToAcpError extends TranslationError {
    constructor(property: string, cause?: any) {
        super("acl", property, "ACP", cause)
    }
}
