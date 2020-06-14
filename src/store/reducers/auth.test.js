import reducer from './auth';
import * as actionsTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

describe('auth renducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should store the token upon login', () => {
        expect(reducer(
                        initialState, 
                        {type: actionsTypes.AUTH_SUCCESS, 
                         token: 'some-id', 
                         userId: "some-id"})).toEqual(updateObject(initialState, {token: 'some-id', userId: 'some-id'}))
    })
})