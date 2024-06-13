import UserService from "../service/user-service.js";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/api-error.js";

class UserController {
    async getUsers (req, res, next) {
        try {
            const {page, limit, query} = req.query
            const users = await UserService.getAllUsers(page, limit, query)

            res.set('Access-Control-Expose-Headers', 'x-total-count')
            res.set('x-total-count', users.totalCount);

            return res.json(users.users)
        } catch (e) {
            next(e)
        }
    }

    async getUser (req, res, next) {
        try {
            const id = req.query.id
            const user = await UserService.getUser(id)

            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async editUser (req, res, next) {
        try {
            const {id, username, email, restorePassword, role} = req.body
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                if (username && errors.errors.find(item => item.path === 'username')) throw ApiError.BadRequestError(400, "Invalid username")
                if (email && errors.errors.find(item => item.path === 'email')) throw ApiError.BadRequestError(400, "Invalid email")
            }

            const userData = await UserService.editUser(id, username, email, restorePassword, role)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async changePassword (req, res, next) {
        try {
            const {currentPassword, newPassword} = req.body
            const {id} = req.user
            const errors = validationResult(req)


            if (!errors.isEmpty()){
                if (errors.errors.find(item => item.path === 'newPassword')) throw ApiError.BadRequestError(400, "Invalid new password")
            }

            const userData = await UserService.changePassword(id, currentPassword, newPassword)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async changeEmail (req, res, next) {
        try {
            const {email} = req.body
            const {id} = req.user
            const errors = validationResult(req)


            if (!errors.isEmpty()){
                if (errors.errors.find(item => item.path === 'email')) throw ApiError.BadRequestError(400, "Invalid new email")
            }

            const userData = await UserService.changeEmail(id, email)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async changeUsername (req, res, next) {
        try {
            const {username} = req.body
            const {id} = req.user
            const errors = validationResult(req)


            if (!errors.isEmpty()){
                if (errors.errors.find(item => item.path === 'username')) throw ApiError.BadRequestError(400, "Invalid new username")
            }

            const userData = await UserService.changeUsername(id, username)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async deleteUser (req, res, next) {
        try {
            const {id} = req.query

            const userData = await UserService.deleteUser(id)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

}

export default new UserController()