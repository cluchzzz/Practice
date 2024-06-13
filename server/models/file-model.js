import mongoose, {model} from "mongoose";

const FileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    originalname: String,
    mimetype: String,
    size: Number,
    uploadDate: { type: Date, default: Date.now },
});

export default model('file', FileSchema)