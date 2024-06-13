import {Schema, model} from "mongoose";

const RecoverySchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    token: {type: 'String', required: true},
    createdAt: { type: Date, default: Date.now, expires: 1},
})

export default model('Recovery', RecoverySchema)