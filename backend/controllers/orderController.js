import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc create new order
//@route POST /api/orders
//@access private

const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order Items')
    }
    else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }

})


//@desc get order by ID
//@route get /api/orders/:id
//@access private

const getOrderByID = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order)
    }
    else {
        res.status(404)
        throw new Error('Order not Found')
    }
})


// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    const listItems = order.orderItems
    for (const item of listItems) {
        const product = await Product.findById(item.product)
        const newAllSize = product.allSize
        const index = newAllSize.findIndex(x => x.size === Number(item.size))
        newAllSize[index].qty = newAllSize[index].qty - Number(item.qty)
        product.allSize = newAllSize
        await product.save()
    }

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.transactionLogId,
            status: req.body.status,
            update_time: req.body.createAt,
            email_address: req.body.customerName,
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


// @desc    get user orders
// @route   GET /api/orders/myorders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })

    res.json(orders)
})


export { addOrderItems, getOrderByID, updateOrderToPaid, getUserOrders }
