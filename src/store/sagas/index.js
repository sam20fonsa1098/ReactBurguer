import {takeEvery, all, takeLatest} from 'redux-saga/effects'

import * as actionsTypes from '../actions/actionTypes';
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';
import {initIngredientsSaga} from './burgerBuilder';
import {purchaseBurgerSaga, fetchOrdersSaga} from './orders'; 

export function* watchAuth() {
    yield all([
        takeEvery(actionsTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionsTypes.AUTH_CHECK_TIMETOUT, checkAuthTimeoutSaga),
        takeEvery(actionsTypes.AUTH_USER, authUserSaga),
        takeEvery(actionsTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ])
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionsTypes.BURGER_BUILDER_INIT, initIngredientsSaga);
}

export function* watchOrders() {
    yield all([
        takeLatest(actionsTypes.PURCHASE_BURGER_SAGA, purchaseBurgerSaga),
        takeEvery(actionsTypes.FETCH_ORDERS_SAGA, fetchOrdersSaga)
    ])
}