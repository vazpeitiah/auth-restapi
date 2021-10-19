import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

import {createRoles} from './libs/initialSetup'

import productRoutes from './routes/products.route'
import authRoutes from './routes/auth.route'

const app = express()

createRoles() // Crear roles la primera vez que se ejectute la aplicacion, en caso de que aun no existan en la bd

app.set('pkg', pkg)

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)

export default app