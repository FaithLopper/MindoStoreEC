import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_RESET,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_DETAILS_RESET,
    GET_PAYMENT_REQUEST,
    GET_PAYMENT_SUCCESS,
    GET_PAYMENT_FAIL,
    GET_PAYMENT_RESET,
    ORDER_CREATE_RESET
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST: return { loading: true }
        case ORDER_CREATE_SUCCESS: return { loading: false, success: true, order: action.payload }
        case ORDER_CREATE_FAIL: return { loading: false, error: action.payload }
        case ORDER_CREATE_RESET: return {}
        default: return state
    }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST: return { ...state, loading: true }
        case ORDER_DETAILS_SUCCESS: return { loading: false, order: action.payload }
        case ORDER_DETAILS_FAIL: return { loading: false, error: action.payload }
        case ORDER_DETAILS_RESET: return { loading: true, orderItems: [], shippingAddress: {} }
        default: return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST: return { loading: true, }
        case ORDER_PAY_SUCCESS: return { loading: false, success: true, }
        case ORDER_PAY_FAIL: return { loading: false, error: action.payload, }
        case ORDER_PAY_RESET: return {}
        default:
            return state
    }
}

export const getPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PAYMENT_REQUEST: return { loading: true, }
        case GET_PAYMENT_SUCCESS: return { loading: false, res: action.payload, success: true }
        case GET_PAYMENT_FAIL: return { loading: false, res: action.payload, success: false }
        case GET_PAYMENT_RESET: return {}
        default:
            return state
    }
}


