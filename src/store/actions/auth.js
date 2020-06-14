import * as actionsTypes from './actionTypes';
import axios from 'axios';
import ENV from '../../env';

export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionsTypes.AUTH_SUCCESS,
        token,
        userId
    }
}

export const authFail = (error) => {
    return {
        type: actionsTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId');
    return {
        type: actionsTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ENV.firebaseKey}`;
        if (!isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ENV.firebaseKey}`;
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionsTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId))
                const time = expirationDate.getTime() - new Date().getTime();
                dispatch(checkAuthTimeout(time));
            } else {
                dispatch(logout())
            }
        }
    }
}
