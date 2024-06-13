import $api from "../axios";

export default class UserService {
    static async getUsers ({page = 1, limit = 10, query = ''}) {
        return $api.get('/users', {
            params: {
                page,
                limit,
                query
            }
        })
    }

    static async getUser (id) {
        return $api.get('/user', {
            params: {
                id
            }
        })
    }

    static async editUser ({id, username, email, restorePassword, role}) {
        return $api.patch('/user', {id, username, email, restorePassword, role})
    }

    static async changeUsername (username) {
        return $api.patch('/changeUsername', {username})
    }

    static async changeEmail (email) {
        return $api.patch('/changeEmail', {email})
    }

    static async changePassword (currentPassword, newPassword) {
        return $api.patch('/changePassword', {currentPassword, newPassword})
    }

    static async deleteUser (id) {
        return $api.delete('/user', {
            params: {
                id
            }
        })
    }
}