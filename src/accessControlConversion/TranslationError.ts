export class TranslationError extends Error {
    constructor(prefix: string, property: string, target: string, cause?: any) {
        super(`${prefix}:${property} cannot be translated to ${target}`)
        this.name = this.constructor.name
        this.cause = cause
    }
}
