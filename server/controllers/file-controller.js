import FileService from "../service/file-service.js";
import {__dirname} from "../index.js";
import path from "path";
import * as fs from "fs";


class FileController {
    async Download (req, res, next) {
        try {
            const id = req.query.id

            const file = await FileService.Download(id)

            const filePath = path.resolve(__dirname, file.path);

            return res.download(filePath, (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                    if (!res.headersSent) {
                        res.status(500).send({
                            message: "Could not download the file. " + err.message,
                        });
                    }
                }
            });
        } catch (e) {
            next(e)
        }
    }
}

export default new FileController()