// Roles creados por defecto

import Rol from '../models/Rol'

export const createRoles = async () => {
    try {
        const count = await Rol.estimatedDocumentCount()

        if (count > 0) return;

        const values = await Promise.all([
            Rol.create({ name: "moderador" }),
            Rol.create({ name: "admin" }),
            Rol.create({ name: "user" })
        ])

        console.log(values)
    } catch (err) {
        console.log(err)
    }
}