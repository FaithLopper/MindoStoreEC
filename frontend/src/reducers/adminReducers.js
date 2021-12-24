import {
    ADMIN_CRE_PRODUCT_FAIL,
    ADMIN_CRE_PRODUCT_REQUEST,
    ADMIN_CRE_PRODUCT_RESET,
    ADMIN_CRE_PRODUCT_SUCCESS,
    ADMIN_DELE_PRODUCT_FAIL,
    ADMIN_DELE_PRODUCT_REQUEST,
    ADMIN_DELE_PRODUCT_SUCCESS,
    ADMIN_DELE_USER_FAIL,
    ADMIN_DELE_USER_REQUEST,
    ADMIN_DELE_USER_SUCCESS,
    ADMIN_DELIVERED_FAIL,
    ADMIN_DELIVERED_REQUEST,
    ADMIN_DELIVERED_RESET,
    ADMIN_DELIVERED_SUCCESS,
    ADMIN_LIST_ORDERS_FAIL,
    ADMIN_LIST_ORDERS_REQUEST,
    ADMIN_LIST_ORDERS_RESET,
    ADMIN_LIST_ORDERS_SUCCESS,
    ADMIN_LIST_USERS_FAIL,
    ADMIN_LIST_USERS_REQUEST,
    ADMIN_LIST_USERS_RESET,
    ADMIN_LIST_USERS_SUCCESS,
    ADMIN_NEW_SIZE_FAIL,
    ADMIN_NEW_SIZE_REQUEST,
    ADMIN_NEW_SIZE_SUCCESS,
    ADMIN_UPDATE_USER_FAIL,
    ADMIN_UPDATE_USER_REQUEST,
    ADMIN_UPDATE_USER_RESET,
    ADMIN_UPDATE_USER_SUCCESS,
    ADMIN_UP_PRODUCT_FAIL,
    ADMIN_UP_PRODUCT_REQUEST,
    ADMIN_UP_PRODUCT_RESET,
    ADMIN_UP_PRODUCT_SUCCESS,
} from "../constants/adminConstants"


export const adminListAllUsersReducer = (state = { usersList: [] }, action) => {
    switch (action.type) {
        case ADMIN_LIST_USERS_REQUEST: return { loading: true }
        case ADMIN_LIST_USERS_SUCCESS: return { loading: false, usersList: action.payload }
        case ADMIN_LIST_USERS_FAIL: return { loading: false, error: action.payload }
        case ADMIN_LIST_USERS_RESET: return { usersList: [] }
        default: return state
    }
}

export const adminDeleUserReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_DELE_USER_REQUEST: return { loading: true }
        case ADMIN_DELE_USER_SUCCESS: return { loading: false, success: action.payload }
        case ADMIN_DELE_USER_FAIL: return { loading: false, error: action.payload }
        default: return state
    }
}

export const adminUpdateUserReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case ADMIN_UPDATE_USER_REQUEST: return { loading: true }
        case ADMIN_UPDATE_USER_SUCCESS: return { loading: false, success: action.payload }
        case ADMIN_UPDATE_USER_FAIL: return { loading: false, error: action.payload }
        case ADMIN_UPDATE_USER_RESET: return { user: {} }
        default: return state
    }
}


export const adminDeleProductReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_DELE_PRODUCT_REQUEST: return { loading: true }
        case ADMIN_DELE_PRODUCT_SUCCESS: return { loading: false, success: true }
        case ADMIN_DELE_PRODUCT_FAIL: return { loading: false, error: action.payload }
        default: return state
    }
}

export const adminCreProductReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CRE_PRODUCT_REQUEST: return { loading: true }
        case ADMIN_CRE_PRODUCT_SUCCESS: return { loading: false, success: true, product: action.payload }
        case ADMIN_CRE_PRODUCT_FAIL: return { loading: false, error: action.payload }
        case ADMIN_CRE_PRODUCT_RESET: return { }
        default: return state
    }
}

export const adminNewSizeReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_NEW_SIZE_REQUEST: return { loadingNewSize: true }
        case ADMIN_NEW_SIZE_SUCCESS: return { loadingNewSize: false, successNewSize: true }
        case ADMIN_NEW_SIZE_FAIL: return { loadingNewSize: false, errorNewSize: action.payload }
        default: return state
    }
}


export const adminUpProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case ADMIN_UP_PRODUCT_REQUEST: return { loading: true }
      case ADMIN_UP_PRODUCT_SUCCESS: return { loading: false, success: true, product: action.payload }
      case ADMIN_UP_PRODUCT_FAIL: return { loading: false, error: action.payload }
      case ADMIN_UP_PRODUCT_RESET: return { product: {} }
      default:
        return state
    }
  }

  export const adminListAllOrdersReducer = (state = { ordersList: [] }, action) => {
    switch (action.type) {
        case ADMIN_LIST_ORDERS_REQUEST: return { loading: true }
        case ADMIN_LIST_ORDERS_SUCCESS: return { loading: false, ordersList: action.payload }
        case ADMIN_LIST_ORDERS_FAIL: return { loading: false, error: action.payload }
        case ADMIN_LIST_ORDERS_RESET: return { usersList: [] }
        default: return state
    }
}

  export const adminDeliveredReducer = (state = { }, action) => {
    switch (action.type) {
        case ADMIN_DELIVERED_REQUEST: return { loading: true }
        case ADMIN_DELIVERED_SUCCESS: return { loading: false, success: true }
        case ADMIN_DELIVERED_FAIL: return { loading: false, error: action.payload }
        case ADMIN_DELIVERED_RESET: return {} 
        default: return state
    }
}