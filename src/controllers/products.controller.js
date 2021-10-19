import Product from '../models/Product'

export const getProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId)
    res.json(product)
}

export const createProduct = async (req, res) => {
    const {name, category, price, imgURL} = req.body
    
    const newProduct =await Product.create({name, category, price, imgURL})
    
    res.status(201).json(newProduct) // 201 creacion de nuevo recurso
}

export const updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {new:true})
    res.json(updatedProduct)
}

export const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.productId)
    res.status(204).json()

}