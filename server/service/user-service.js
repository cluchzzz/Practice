import UserModel from '../models/user-model.js'
import MailService from "./mail-service.js";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import {generate} from "generate-password";
import ApiError from "../exceptions/api-error.js";
import WorkSchema from "../models/work-models.js";

class UserService {
    async getAllUsers (page = 1, limit = 10, query = '') {
        const users = await UserModel.find({ email: { $regex: query, $options: 'i' } }).limit(limit).skip((page - 1) * limit)
        const totalCount = await UserModel.count()

        return {users, totalCount}
    }

    async getUser (id) {
        const user = await UserModel.findOne({_id: id})
        const userWorks = await WorkSchema.find({authorId: id})

        if (!user) {
            throw ApiError.BadRequestError(400, "User not found")
        }

        return {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            isActivated: user.isActivated,
            userWorks: userWorks
        }
    }

    async editUser (id, username, email, restorePassword = false, role) {
        const user = await UserModel.findById({_id: id})

        if (!user) {
            throw ApiError.BadRequestError(400, 'User not found')
        }

        if (username) {
            const isUsernameFree = await UserModel.findOne({username})

            if (isUsernameFree){
                throw ApiError.BadRequestError(400, 'This username is already taken')
            }

            user.username = username
        }

        if (email){
            const activationLink = uuidv4()
            const isEmailFree = await UserModel.findOne({email})

            if (isEmailFree){
                throw ApiError.BadRequestError(400, 'This email is already taken')
            }

            user.email = email
            user.isActivated = false
            user.activationLink = activationLink

            await MailService.sendActivationMail(user.email, activationLink)
        }

        if (restorePassword) {
            const randomPassword = generate({
                length: 24
            })
            const hashPassword = await bcrypt.hash(randomPassword, 3)
            await MailService.sendRestoredPassword(user.email, randomPassword)
            user.password = hashPassword
        }

        if (role) {
            user.role = role
        }

        user.save()

        return user
    }

    async changePassword (id, currentPassword, newPassword) {
        const user = await UserModel.findById({_id: id})
        const checkPassword = await bcrypt.compare(currentPassword, user.password)
        const equalPasswords = await bcrypt.compare(newPassword, user.password)
        const newPasswordHash = await bcrypt.hash(newPassword, 3)

        if (!checkPassword) {
            throw ApiError.BadRequestError(400, 'Invalid current password')
        }

        if (equalPasswords) {
            throw ApiError.BadRequestError(400, 'The old password is the same as the new one')
        }

        user.password = newPasswordHash
        user.save()

        return id
    }

    async changeEmail (id, email) {
        const user = await UserModel.findById({_id: id})
        const isEmailFree = await UserModel.findOne({email})
        const activationLink = uuidv4()

        if(email === user.email){
            throw ApiError.BadRequestError(400, 'The old email is the same as the new one')
        }

        if (isEmailFree) {
            throw ApiError.BadRequestError(400, 'This email is already taken')
        }

        user.email = email
        user.isActivated = false
        user.activationLink = activationLink

        await MailService.sendActivationMail(user.email, activationLink)

        user.save()

        return user._id
    }

    async changeUsername (id, username) {
        const user = await UserModel.findById({_id: id})
        const isEmailUsername = await UserModel.findOne({username})

        if(username === user.username){
            throw ApiError.BadRequestError(400, 'The old username is the same as the new one')
        }

        if (isEmailUsername) {
            throw ApiError.BadRequestError(400, 'This username is already taken')
        }

        user.username = username
        user.save()

        return user._id
    }

    async deleteUser (id) {
        if (!id) {
            throw ApiError.BadRequestError(400,"You didn't specify id")
        }

        const user = await UserModel.findOneAndRemove({_id: id})

        if (!user) {
            throw ApiError.BadRequestError(400,"User removed")
        }

        return user
    }

}

export default new UserService()