import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'member'},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String}
})

export default model('User', UserSchema);