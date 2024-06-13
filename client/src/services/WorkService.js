import $api from "../axios";

export default class WorkService {
    static async getAllWorks (page, limit, query) {
        return $api.get('/works', {
            params: {page, limit, query}
        })
    }

    static async getWork (id) {
        return $api.get(`/work?id=${id}`)
    }

    static async addWork (data) {
        console.log(data)
        return $api.post('/work', {...data})
    }

    static async editWork (data) {
        return $api.patch('/work', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    static async deleteWork (id) {
        return $api.delete('/work', {
            params: {
                id
            }
        })
    }
}