import * as actionsTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, actions) => {
    const newOrder = {
        ...actions.orderData,
        id: actions.orderId
    }
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}

const fetchOrdersSuccess = (state, actions) => {
    return updateObject(state, {
        orders: actions.orders,
        loading: false
    })
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionsTypes.PURCHASE_BURGER_SUCCESS):
            return purchaseBurgerSuccess(state, actions);
        case (actionsTypes.PURCHASE_BURGER_FAIL):
            return updateObject(state, {loading: false})
        case (actionsTypes.PURCHASE_BURGER_START):
            return updateObject(state, {loading: true})
        case (actionsTypes.PURCHASE_INIT):
            return updateObject(state, {purchased: false})
        case (actionsTypes.FETCH_ORDERS_START):
            return updateObject(state, {loading: true})
        case (actionsTypes.FETCH_ORDERS_SUCCESS):
            return fetchOrdersSuccess(state, actions);
        case (actionsTypes.FETCH_ORDERS_FAIL):
            return updateObject(state, {loading: false})
        default:
            return state
    }
}

export default reducer;