import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, GET_PAYMENT_REQUEST, GET_PAYMENT_SUCCESS, GET_PAYMENT_FAIL, ORDER_CREATE_RESET } from "../constants/orderConstants"
import axios from "axios"

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: ORDER_CREATE_RESET
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const processPayment = (paymentKey, payInfo, orderId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_PAYMENT_REQUEST
        })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        let body = {}
        if (payInfo.type === 'international') {
            body = {
                apiKey: paymentKey.intKey,
                cardNumber: payInfo.cardNumber,
                CVV: payInfo.cvvNumber,
                expiredDate: payInfo.expiredDate,
                amount: payInfo.amount,
                currency: payInfo.currency
            }
        }
        else {
            body = {
                apiKey: paymentKey.domKey,
                cardNumber: payInfo.cardNumber,
                PIN: payInfo.pinNumber,
                expiredDate: payInfo.expiredDate,
                amount: payInfo.amount,
                currency: payInfo.currency
            }
        }

        const { data } = await axios.post(`${paymentKey.host}/v1/payment/${payInfo.type}`, body, config)

        dispatch({
            type: GET_PAYMENT_SUCCESS,
            payload: data
        })
        if (!data.message) {
            dispatch(payOrder(orderId, data))
        }

    } catch (error) {
        dispatch({
            type: GET_PAYMENT_FAIL,
            payload: error.response.data
        })
    }
}