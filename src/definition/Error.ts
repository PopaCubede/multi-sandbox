import { Failure } from 'superstruct';

enum CommonError {
    INVALID_INPUT = 400,
    NOT_FOUND = 404,
    ALREADY_EXISTS = 409,
    INTERNAL_ERROR = 500,
}

class ErrorResponse {
    code: number;

    message: string;

    error: string;

    struct_failures?: Failure[];

    constructor(code: CommonError, message: string, error: string, struct_failures?: Failure[]) {
        this.code = code;
        this.message = message;
        this.error = error;
        this.struct_failures = struct_failures;
    }
}

export { CommonError, ErrorResponse };
