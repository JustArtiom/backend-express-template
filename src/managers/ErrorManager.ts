export type APIErrorContext = {
    message: string;
    context?: { [key: string]: any };
};

export abstract class APIError extends Error {
    abstract readonly statusCode: number;
    readonly logging: boolean;
    readonly context: { [key: string]: any };

    constructor(
        message: string,
        {
            logging = false,
            context = {},
        }: {
            logging?: boolean;
            context?: { [key: string]: any };
        } = {}
    ) {
        super(message);

        this.logging = logging;
        this.context = context;

        Object.setPrototypeOf(this, APIError.prototype);
    }

    get error(): APIErrorContext {
        return { message: this.message, context: this.context };
    }
}

export class BadRequestError extends APIError {
    readonly statusCode = 400;

    constructor(
        message?: string,
        params?: {
            logging?: boolean;
            context?: { [key: string]: any };
        }
    ) {
        super(message || "Bad request", params);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class UnauthorizedError extends APIError {
    readonly statusCode = 401;

    constructor(
        message?: string,
        params?: {
            logging?: boolean;
            context?: { [key: string]: any };
        }
    ) {
        super(message || "Unauthorized", params);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class ForbiddenError extends APIError {
    readonly statusCode = 403;

    constructor(
        message?: string,
        params?: {
            logging?: boolean;
            context?: { [key: string]: any };
        }
    ) {
        super(message || "Forbidden", params);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}

export class NotFoundError extends APIError {
    readonly statusCode = 404;

    constructor(
        message?: string,
        params?: {
            logging?: boolean;
            context?: { [key: string]: any };
        }
    ) {
        super(message || "Resource not found", params);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class UnprocessableEntityError extends APIError {
    readonly statusCode = 422;

    constructor(
        message?: string,
        params?: {
            logging?: boolean;
            context?: { [key: string]: any };
        }
    ) {
        super(message || "Unprocessable Entity", params);
        Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
    }
}

export class TooManyRequestsError extends APIError {
    readonly statusCode = 429;

    constructor(
        message?: string,
        params?: {
            logging?: boolean;
            context?: { [key: string]: any };
        }
    ) {
        super(message || "Too Many Requests", params);
        Object.setPrototypeOf(this, TooManyRequestsError.prototype);
    }
}

export class InternalServerError extends APIError {
    readonly statusCode = 500;

    constructor(
        message?: string,
        params?: {
            logging?: boolean;
            context?: { [key: string]: any };
        }
    ) {
        super(message || "Internal server error", params);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}

export class ServiceUnavailableError extends APIError {
    readonly statusCode = 503;

    constructor(
        message?: string,
        params?: {
            logging?: boolean;
            context?: { [key: string]: any };
        }
    ) {
        super(message || "Service Unavailable", params);
        Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
    }
}

export class NotImplementedError extends APIError {
    readonly statusCode = 501;

    constructor(
        message?: string,
        params?: {
            logging?: boolean;
            context?: { [key: string]: any };
        }
    ) {
        super(message || "This feature is not implemented yet.", params);
        Object.setPrototypeOf(this, NotImplementedError.prototype);
    }
}
