import  mongoose  from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {timestamps: true})


const sizeSchema = mongoose.Schema({
    size: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 0
    }
})

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    name: {
        type: String,
        require: true
    },

    image: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    category:{
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    reviews: [reviewSchema],

    rating: {
        type: Number,
        required: true,
        default: 0
    },

    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },

    allSize: [sizeSchema]

},{timestamps: true})

const Product  = mongoose.model('Product', productSchema)

export default Product