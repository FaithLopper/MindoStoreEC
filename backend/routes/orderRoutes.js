import express from 'express'
import { addOrderItems, getOrderByID, updateOrderToPaid, getUserOrders } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import { updateOrderToDelivered } from '../controllers/adminController.js'
const router = express.Router()

// to /(api)/orders
router.route('/').post(protect, addOrderItems)
router.route('/userorders').get(protect, getUserOrders)
router.route('/:id').get(protect, getOrderByID)

router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/delivery').put(protect, admin, updateOrderToDelivered)
export default router