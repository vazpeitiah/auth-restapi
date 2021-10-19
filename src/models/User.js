import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        require:true
    },
    email: {
        type: String,
        unique: true
    },
    roles: [{
        ref: "Rol", 
        type: Schema.Types.ObjectId
    }]
})

UserSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
})

UserSchema.methods.matchPassword = function(password) {
    return bcrypt.compare(password, this.password)
}

export default model('User', UserSchema)