import FileSchema from "../models/file-model.js";
import ApiError from "../exceptions/api-error.js";

class FileService {
    async Download (id) {
        const fileInfo = await FileSchema.findOne({_id: id})

        if (!fileInfo) {
            throw ApiError.BadRequestError(404, "A file not found")
        }

        console.log(fileInfo)

        return fileInfo
    }
}

export default new FileService()