import tokenService from "../service/token-service.js";
import ApiError from "../exceptions/api-error.js";

export default async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization

        if(!authorizationHeader){
            next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1]

        if(!accessToken){
            next(ApiError.UnauthorizedError());
        }

        const userData = await tokenService.validateAccessToken(accessToken)

        if(!userData){
            next(ApiError.UnauthorizedError());
        }

        req.user = userData
        return next()
    } catch (e) {
        next(ApiError.UnauthorizedError());
    }
}