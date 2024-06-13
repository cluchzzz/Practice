export default class ApiError extends Error{
    status;
    errors;
    constructor(status, message, errors = []) {
        super(message);
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError () {
        return new ApiError(401, 'User is not authorized')
    }

    static BadRequestError (status, message, errors = []) {
        return new ApiError(status, message, errors)
    }

    static ForbiddenError () {
        return new ApiError(403, 'The client does not have access rights to the content')
    }

    static InternalServerError () {
        return new ApiError(500, 'Internal server error')
    }
}