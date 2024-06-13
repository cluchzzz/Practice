import $api from "../axios";

export default class PagesService {
    static async getPage (page) {
        return $api.get('/pages', {
            params:{
                page
            }
        })
    }

    static async editPage (page, content = '') {
        return $api.patch('/pages', {page, content})
    }
}