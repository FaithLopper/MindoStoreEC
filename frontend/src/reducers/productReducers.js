import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_RESET,
    PRODUCT_DETAILS_RESET
} from '../constants/productConstants.js'


export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST: return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS: return {
            loading: false,
            products: action.payload.products,
            page: action.payload.page,
            pages: action.payload.pages
        }
        case PRODUCT_LIST_FAIL: return { loading: false, error: action.payload }
        default: return state
    }
}

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST: return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS: return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL: return { loading: false, error: action.payload }
        case PRODUCT_DETAILS_RESET: return { product: { reviews: [] } }
        default: return state
    }
}

export const productReviewReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_REQUEST: return { loading: true }
        case PRODUCT_REVIEW_SUCCESS: return { loading: false, success: true }
        case PRODUCT_REVIEW_FAIL: return { loading: false, error: action.payload }
        case PRODUCT_REVIEW_RESET: return {}
        default: return state
    }
}