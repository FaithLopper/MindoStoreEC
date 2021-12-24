import {
    ADMIN_CRE_PRODUCT_FAIL,
    ADMIN_CRE_PRODUCT_REQUEST,
    ADMIN_CRE_PRODUCT_SUCCESS,
    ADMIN_DELE_PRODUCT_FAIL,
    ADMIN_DELE_PRODUCT_REQUEST,
    ADMIN_DELE_PRODUCT_SUCCESS,
    ADMIN_DELE_USER_FAIL,
    ADMIN_DELE_USER_REQUEST,
    ADMIN_DELE_USER_SUCCESS,
    ADMIN_DELIVERED_FAIL,
    ADMIN_DELIVERED_REQUEST,
    ADMIN_DELIVERED_SUCCESS,
    ADMIN_LIST_ORDERS_FAIL,
    ADMIN_LIST_ORDERS_REQUEST,
    ADMIN_LIST_ORDERS_SUCCESS,
    ADMIN_LIST_USERS_FAIL,
    ADMIN_LIST_USERS_REQUEST,
    ADMIN_LIST_USERS_SUCCESS,
    ADMIN_NEW_SIZE_FAIL,
    ADMIN_NEW_SIZE_REQUEST,
    ADMIN_NEW_SIZE_SUCCESS,
    ADMIN_UPDATE_USER_FAIL,
    ADMIN_UPDATE_USER_REQUEST,
    ADMIN_UPDATE_USER_SUCCESS,
    ADMIN_UP_PRODUCT_FAIL,
    ADMIN_UP_PRODUCT_REQUEST,
    ADMIN_UP_PRODUCT_SUCCESS
} from "../constants/adminConstants"
import axios from "axios"
import { USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_FAIL } from "../constants/userConstants"

export const adListUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_LIST_USERS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/admin/users`, config)

        dispatch({
            type: ADMIN_LIST_USERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_LIST_USERS_FAIL,
            payload: error.response
        })
    }
}


export const adDeleUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_DELE_USER_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/admin/users/${id}`, config)

        dispatch({
            type: ADMIN_DELE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_DELE_USER_FAIL,
            payload: error.response
        })
    }
}

export const adGetUserById = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/admin/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response
        })
    }
}

export const adUpdateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_UPDATE_USER_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/admin/users/${user._id}`, user, config)

        dispatch({
            type: ADMIN_UPDATE_USER_SUCCESS,
            payload: data
        })

        dispatch({ type: USER_DETAILS_RESET })

    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_USER_FAIL,
            payload: error.response
        })
    }
}


///////////////PRODUCT//////////////////////

export const adDeleProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_DELE_PRODUCT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/admin/products/${id}`, config)

        dispatch({
            type: ADMIN_DELE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_DELE_PRODUCT_FAIL,
            payload: error.response
        })
    }
}

export const adCreProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CRE_PRODUCT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/admin/products/', {}, config)

        dispatch({
            type: ADMIN_CRE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CRE_PRODUCT_FAIL,
            payload: error.response
        })
    }
}

export const adUpdateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_UP_PRODUCT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/admin/products/${product._id}`, product, config)

        dispatch({
            type: ADMIN_UP_PRODUCT_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: ADMIN_UP_PRODUCT_FAIL,
            payload: error.response
        })
    }
}

export const adNewSize = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_NEW_SIZE_REQUEST,
        })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/admin/products/${product._id}/sizes`, product, config)

        dispatch({
            type: ADMIN_NEW_SIZE_SUCCESS,
            payload: data,
        })

    } catch (error) {

        dispatch({
            type: ADMIN_NEW_SIZE_FAIL,
            payload: error.response
        })
    }
}


export const adListOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_LIST_ORDERS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(`/api/admin/orders`, config)

        dispatch({
            type: ADMIN_LIST_ORDERS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_LIST_ORDERS_FAIL,
            payload: error.response
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_DELIVERED_REQUEST,
        })

        const { userLogin: { userInfo }, } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/orders/${order._id}/delivery`, {}, config)

        dispatch({
            type: ADMIN_DELIVERED_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_DELIVERED_FAIL,
            payload: error.response
        })
    }
}

