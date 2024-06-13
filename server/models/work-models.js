import mongoose, {Schema, model} from "mongoose";
import {ObjectId} from "mongodb";

const WorkSchema = new Schema({
    authorId: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    faculty: {type: String, required: true},
    chair: {type: String, required: true},
    lab: {type: String, required: true},
    position: {type: String, required: true},
    positionStartDate: {type: Date, required: true},
    positionEndDate: {type: Date, required: true},
    workName: {type: String, required: true},
    customer: {type: String, required: true},
    customerAddress: {type: String, required: true},
    submission: {type: String, required: true},
    branch: {type: String, required: true},
    fileId: {type: mongoose.Schema.Types.ObjectId}
})

export default model('Work', WorkSchema)