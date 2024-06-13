import ApiError from "../exceptions/api-error.js";
import UserModel from "../models/user-model.js";

export default async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id)
        const userRole = user.role
        const moders = ["admin", "moderator"]

        if (!moders. find(item => item === userRole)) {
            next(ApiError.ForbiddenError())
        }

        next()
    } catch (e) {
        next(ApiError.InternalServerError())
    }
}