import ApiError from "../exceptions/api-error.js";
import WorkSchema from "../models/work-models.js";
import {body} from "express-validator";
import FileSchema from "../models/file-model.js";

class WorkService {
    async getAllWorks (page = 1, limit = 10, query = '') {
        const works = await WorkSchema.find({ workName: { $regex: query, $options: 'i' } }).limit(limit).skip((page - 1) * limit)
        const totalCount = await WorkSchema.count()

        return {works, totalCount}
    }

    async addWork(id, name, faculty, chair, lab, position, positionStartDate, positionEndDate, workName, customer, customerAddress, submission, branch) {
        const candidate = await WorkSchema.findOne({workName: workName})

        if (!name) {
            throw ApiError.BadRequestError(400, "Work name not specified")
        }

        if (candidate) {
            throw ApiError.BadRequestError(400, "A work with this name already exists")
        }

        return await WorkSchema.create({
            authorId: id,
            name,
            faculty,
            chair,
            lab,
            position,
            positionStartDate,
            positionEndDate,
            workName,
            customer,
            customerAddress,
            submission,
            branch
        })
    }

    async editWork (userId, body, file) {
        const candidate = await WorkSchema.findById(body.id)

        if (candidate.authorId.toHexString() !== userId){
            throw ApiError.BadRequestError(400, "You cannot edit other people's work")
        }

        if (file) {
            const newFile = new FileSchema({
                filename: file.filename,
                path: file.path,
                originalName: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
            });

            await newFile.save();

            const fileId = newFile.id

            const work = await WorkSchema.findOneAndUpdate({_id: body.id}, {...body, fileId}, {
                new: true
            })

            return work
        }else {
            const work = await WorkSchema.findOneAndUpdate({_id: body.id}, body, {
                new: true
            })

            return work
        }
    }

    async getWork (id) {
        const work = await WorkSchema.findOne({_id: id})

        if (!work) {
            throw ApiError.BadRequestError(400, "Work not found")
        }

        return work
    }

    async deleteWork (id) {
        const product = await WorkSchema.findOneAndRemove({_id: id})

        if (!product) {
            throw ApiError.BadRequestError(400, "Work not found")
        }

        return {product}
    }
}

export default new WorkService()