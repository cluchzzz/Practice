import mongoose, {Schema, model} from "mongoose";

const PagesSchema = new Schema({
    name: {type: String, required: true, unique: true},
    header: {type: String, required: true, unique: true},
    content: {type: String, default: ''}

}, {timestamps: true})

export default model('pages', PagesSchema)