import User from '../models/User'
import jwt from 'jsonwebtoken'
import Rol from '../models/Rol'

export const signin = async (req, res) => {
    const {username, password, email, roles} = req.body
    
    const userFound = await User.findOne({username})
    
    if(!username || !password) return res.json({message: "Provide an username and password"})

    if(!userFound) return res.json({message: "User not found"})

    const match = await userFound.matchPassword(password)

    if(match == false) return res.json({message: "Invalid password"})

    const token = jwt.sign({id:userFound._id}, 'top_secret', {
        expiresIn: 60 * 60 * 24 // 24 horas
    })

    res.json({token})
}

export const signup = async (req, res) => {
    const {username, password, email, roles} = req.body

    const newUser ={
        username, password, email
    }

    if(roles) {
        const foundRoles = await Rol.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Rol.findOne({name: "user"})
        newUser.roles = [role._id]
    }

    const savedUser = await User.create(newUser)

    const token = jwt.sign({id: savedUser._id}, 'top_secret', {
        expiresIn: 60 * 60 * 24 // 1 dia
    })

    res.json({token})
}