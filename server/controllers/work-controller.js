import WorkService from "../service/work-service.js";

class WorkController {
    async getAllWorks (req, res, next) {
        try {
            const {page, limit, query} = req.query
            const data = await WorkService.getAllWorks(page, limit, query)

            res.set('Access-Control-Expose-Headers', 'x-total-count')
            res.set('x-total-count', data.totalCount);

            return res.json(data.works)
        } catch (e) {
            next(e)
        }
    }

    async addWork (req, res, next) {
        try {
            const {id} = req.user
            const {name, faculty, chair, lab, position, positionStartDate, positionEndDate, workName, customer, customerAddress, submission, branch} = req.body

            const data = await WorkService.addWork(id, name, faculty, chair, lab, position, positionStartDate, positionEndDate, workName, customer, customerAddress, submission, branch)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async editWork (req, res, next) {
        try {
            const file = req.file
            const body = req.body
            const userId = req.user.id

            const work = await WorkService.editWork(userId, body, file)

            return res.json(work)
        } catch (e) {
            next(e)
        }
    }

    async getWork (req, res, next) {
        try {
            const id = req.query.id
            const work = await WorkService.getWork(id)

            return res.json(work)
        } catch (e) {
            next(e)
        }
    }

    async deleteWork (req, res, next) {
        try {
            const {id} = req.query
            const data = await WorkService.deleteWork(id)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }
}

export default new WorkController()