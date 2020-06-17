import {put, delay, call} from 'redux-saga/effects';
import axios from 'axios';

import ENV from '../../env';
import * as actions from '../actions'

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], "token")
    yield call([localStorage, 'removeItem'], "expirationDate")
    yield call([localStorage, 'removeItem'], "userId")
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ENV.firebaseKey}`;
    if (!action.isSignUp) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ENV.firebaseKey}`;
    }

    try {
        const response = yield axios.post(url, authData)
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn * 1000));
    } catch(error) {
        yield put(actions.authFail(error.response.data.error));
    }   
}

export function* authCheckStateSaga(action) {
    const token = localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout())
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate > new Date()) {
            const userId = localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId))
            const time = expirationDate.getTime() - new Date().getTime();
            yield put(actions.checkAuthTimeout(time));
        } else {
            yield put(actions.logout())
        }
    }
}