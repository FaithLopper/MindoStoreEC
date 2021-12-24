import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, productReviewReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
import { userDetailsReducer, userListOrdersReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers.js'
import { getPaymentReducer, orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers.js'
import { adminCreProductReducer, adminDeleProductReducer, adminDeleUserReducer, adminDeliveredReducer, adminListAllOrdersReducer, adminListAllUsersReducer, adminNewSizeReducer, adminUpdateUserReducer, adminUpProductReducer } from './reducers/adminReducers.js'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    userListOrders: userListOrdersReducer,
    adminListAllUsers: adminListAllUsersReducer,
    adminDeleUser: adminDeleUserReducer,
    adminUpdateUser: adminUpdateUserReducer,
    adminDeleProduct: adminDeleProductReducer,
    adminCreProduct: adminCreProductReducer,
    adminUpProduct: adminUpProductReducer,
    adminListAllOrders: adminListAllOrdersReducer,
    adminDelivered: adminDeliveredReducer,
    productReview: productReviewReducer,
    adminNewSize: adminNewSizeReducer,
    getPayment: getPaymentReducer,

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}
const middleware = [thunk]
const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store




