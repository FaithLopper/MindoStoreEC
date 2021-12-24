import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'
//////////////////////////////////ADMIN////////////////////////////

//@desc get all user profile
//@route GET /api/admin/users/
//@access private (admin)
const adGetAllProfile = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access private (admin)
const adDeleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access private (admin)
const adGetUserById = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access private (admin)
const adUpdateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin || user.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc single product
//@route Delete /api/admin/products
//@access private admin
const adDeleProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/admin/products
// @access  private admin
const adCreProduct = asyncHandler(async (req, res) => {

  const product = new Product({
    name: 'name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'brand',
    category: 'category',
    allSize: [{ size: 0, qty: 0 }],
    numReviews: 0,
    description: 'description',
  })

  const newProduct = await product.save()
  res.status(201).json(newProduct)
})

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Private admin
const adUpdateProduct = asyncHandler(async (req, res) => {

  const { name, price, description, image, brand, category, allSize } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.allSize = allSize
    product.updatedAt = Date.now()

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Update a product sizes
// @route   PUT /api/admin/products/:id/sizes
// @access  Private admin
const adUpdateProductSizes = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {

    const newSize = { size: 0, qty: 0 }
    const newList = product.allSize
    newList.push(newSize)
    product.allSize = newList
    product.updatedAt = Date.now()

    const updatedProduct = await product.save()
    console.log(updatedProduct)
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})


export {
  adGetAllProfile,
  adDeleteUser,
  adGetUserById,
  adUpdateUser,
  adDeleProduct,
  adCreProduct,
  adUpdateProduct,
  updateOrderToDelivered,
  getOrders,
  adUpdateProductSizes
}