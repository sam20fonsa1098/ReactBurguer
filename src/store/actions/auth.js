import * as actionsTypes from './actionTypes';

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
    return {
        type: actionsTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionsTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionsTypes.AUTH_CHECK_TIMETOUT,
        expirationTime
    };
}

export const auth = (email, password, isSignUp) => {
    return {
        type: actionsTypes.AUTH_USER,
        email,
        password,
        isSignUp
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionsTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return {
        type: actionsTypes.AUTH_CHECK_STATE
    }
}
