import {Schema, model} from 'mongoose'

const RolSchema = new Schema({
    name: String,
}, { versionKey: false})

export default model ("Rol", RolSchema)