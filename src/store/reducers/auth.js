import * as actionsTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case (actionsTypes.AUTH_START):
            return updateObject(state, {error: null, loading: true})
        case (actionsTypes.AUTH_SUCCESS):
            return updateObject(state, {token: actions.token, userId: actions.userId, error: null, loading: false})
        case (actionsTypes.AUTH_FAIL):
            return updateObject(state, {error: actions.error, loading: false})
        case (actionsTypes.AUTH_LOGOUT):
            return updateObject(state, {token: null, userId: null})
        case (actionsTypes.SET_AUTH_REDIRECT_PATH):
            return updateObject(state, {authRedirectPath: actions.path})
        default: 
            return state;
    }
}

export default reducer;