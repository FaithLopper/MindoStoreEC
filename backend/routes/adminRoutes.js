import express from 'express'
import { adGetAllProfile, adDeleteUser, adGetUserById, adUpdateUser, adDeleProduct, adUpdateProduct, adCreProduct, getOrders, adUpdateProductSizes } from '../controllers/adminController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/users').get(protect, admin, adGetAllProfile)
router.route('/users/:id').delete(protect, admin, adDeleteUser)
    .get(protect, admin, adGetUserById)
    .put(protect, admin, adUpdateUser)

router.route('/products').post(protect, admin, adCreProduct)
router.route('/products/:id').delete(protect, admin, adDeleProduct).put(protect, admin, adUpdateProduct)
router.route('/products/:id/sizes').put(protect, admin, adUpdateProductSizes)

router.route('/orders').get(protect, admin, getOrders)
export default router