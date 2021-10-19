import {Router} from 'express'
const router = Router()
import {authJwt} from '../middlewares'
import * as productsController from '../controllers/products.controller'

router.get('/', productsController.getProducts)
router.post('/', authJwt.verifyToken, productsController.createProduct)
router.get('/:productId', authJwt.verifyToken, productsController.getProductById)
router.put('/:productId', authJwt.verifyToken, productsController.updateProduct)
router.delete('/:productId', [authJwt.verifyToken, authJwt.isModerator], productsController.deleteProduct)

export default router