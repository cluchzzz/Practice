import AuthService from "../service/auth-service.js";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/api-error.js";

class AuthController {
    async registration (req, res, next) {
        try {
            console.log(validationResult(req), req.body)
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                if (errors.errors.find(item => item.path === 'username')) throw ApiError.BadRequestError(400, "Invalid username")
                if (errors.errors.find(item => item.path === 'email')) throw ApiError.BadRequestError(400, "Invalid email")
                if (errors.errors.find(item => item.path === 'password')) throw ApiError.BadRequestError(400, "Invalid password")
            }

            const {username, email, password} = req.body
            const userData = await AuthService.registration(username, email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login (req, res, next) {
        try {
            const {username, password} = req.body
            const userData = await AuthService.login(username, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await AuthService.logout(refreshToken)

            res.clearCookie('refreshToken')
            res.json({token, message: 'You logout'})
        } catch (e) {
            next(e)
        }
    }

    async activate (req, res, next) {
        try {
            const activationLink = req.params.link

            await AuthService.activate(activationLink)
            res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await AuthService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async forgotPassword (req, res, next) {
        try {
            const {email} = req.body
            const userData = await AuthService.forgotPassword(email)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async recoveryPassword (req, res, next) {
        try {
            const errors = validationResult(req)
            const {link} = req.params
            const {password} = req.body

            if (!errors.isEmpty()){
                if (errors.errors.find(item => item.path === 'password')) throw ApiError.BadRequestError(400, "Invalid password")
            }

            const userData = await AuthService.recoveryPassword(link, password)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()