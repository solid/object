import { TranslationError } from "./TranslationError.js"

export class AcpToWacError extends TranslationError {
    constructor(property: string, cause?: any) {
        super("acp", property, "WAC", cause)
    }
}
