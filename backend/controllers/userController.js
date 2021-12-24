import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'

//@desc auth user and get token
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})


//@desc REGISTER new user 
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


//@desc get user profile
//@route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else {
        res.status(404)
        throw new Error('user not found')
    }
})


//@desc update user profile
//@route PUT /api/users/profile
//@access private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    const reqEmail = await User.findOne({ "email": req.body.email })
    const checkPassword = await user.matchPassword(req.body.password)

    if (checkPassword === false) { //validate password
        throw new Error('Wrong password')
    }
    else if (reqEmail && reqEmail.email !== user.email) {   //check used email
        throw new Error('Email has been used')
    }
    else if (user.email === reqEmail.email || user) {//execute
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.newPassword) {
            user.password = req.body.newPassword
        }

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            //token: generateToken(updatedUser._id)
        })

    }
    else {
        res.status(404)
        throw new Error('user not found')
    }
})



export { authUser, getUserProfile, registerUser, updateUserProfile }