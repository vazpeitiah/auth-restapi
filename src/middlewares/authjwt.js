import jwt, { decode } from 'jsonwebtoken'
import User from '../models/User'
import Rol from '../models/Rol'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        if (!token) return res.status(403).json({ message: "No token provided" })

        const decoded = jwt.verify(token, 'top_secret')

        req.userId = decoded.id

        const user = await User.findById(req.userId, { password: 0 })

        if (!user) return res.json({ message: 'User not found' })

        next()
    } catch (err) {
        return res.json({message: 'Unauthorized'})
    }
}

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Rol.find({_id: {$in: user.roles}})

    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === "moderador"){
            next()
            return;
        }
    }
    return res.json({message: 'Require moderator role'})
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Rol.find({_id: {$in: user.roles}})

    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === "admin"){
            next()
            return;
        }
    }
    return res.json({message: 'Require admin role'})
}