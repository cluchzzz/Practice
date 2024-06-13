import UserModel from '../models/user-model.js'
import MailService from "./mail-service.js";
import TokenService from "./token-service.js";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import tokenService from "./token-service.js";
import ApiError from "../exceptions/api-error.js";
import RecoveryModel from "../models/recovery-model.js";

class AuthService {
    async registration (username, email, password) {
        const candidate = await UserModel.findOne({$or: [{username}, {email}]})

        if (candidate) {
            throw ApiError.BadRequestError(400, 'User with this name or email exists')
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuidv4()
        const user = await UserModel.create({username, email, password: hashPassword, activationLink})
        await MailService.sendActivationMail(email, activationLink)

        const tokens = TokenService.generateTokens({id: user._id})
        await TokenService.saveToken(user._id, tokens.refreshToken)

        return {id: user._id, ...tokens}
    }

    async login (username, password) {
        const user = await UserModel.findOne({username})

        if (!user) {
            throw ApiError.BadRequestError(400, 'User with this username not found')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)

        if (!isPassEquals) {
            throw ApiError.BadRequestError(400, 'Invalid password')
        }

        const tokens = TokenService.generateTokens({id: user._id})
        await TokenService.saveToken(user._id, tokens.refreshToken)

        return {id: user._id, role: user.role, username: user.username, ...tokens}

    }

    async logout (refreshToken) {
        const token = TokenService.removeToken(refreshToken)

        return token
    }

    async refresh (refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = await tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDB){
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)
        const tokens = TokenService.generateTokens({id: user._id})
        await TokenService.saveToken(user._id, tokens.refreshToken)

        return {id: user._id, role: user.role, username: user.username, ...tokens}
    }

    async activate (activationLink) {
        const user = await UserModel.findOne({activationLink})

        if (!user){
            throw ApiError.BadRequestError(400, "Invalid activation link")
        }

        user.isActivated = true
        await user.save()
    }

    async forgotPassword (email) {
        const user = await UserModel.findOne({email})
        let recoveryToken = await RecoveryModel.findOne({user: user._id})

        if (!user){
            throw ApiError.BadRequestError(400, "User with this email not found")
        }

        if (!recoveryToken){
            const link = uuidv4()

            recoveryToken = await RecoveryModel.create({user: user._id, token: link})
            await MailService.sendRecoveryLink(user.email, link)
        }else {
            await MailService.sendRecoveryLink(user.email, recoveryToken.token)
        }

        return {recoveryToken}
    }

    async recoveryPassword (link, password) {
        const recovery = await RecoveryModel.findOne({token: link})

        if (!recovery) {
            throw ApiError.BadRequestError(400, "Invalid recovery link")
        }

        const user = await UserModel.findOne({_id: recovery.user})
        const equalsPasswords = await bcrypt.compare(password, user.password)

        if (equalsPasswords) {
            throw ApiError.BadRequestError(400, 'The old password is the same as the new one')
        }

        const hashPassword = await bcrypt.hash(password, 3)

        user.password = hashPassword
        await user.save()
        await RecoveryModel.deleteOne({token: link})

        return {recovery: recovery.user, user: user, password}
    }
}

export default new AuthService()