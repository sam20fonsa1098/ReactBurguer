import * as actionsType from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'

const initialState = {
    ingredients : null,
    totalPrice  : 4.0,
    error       : false,
    building    : false
}

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese: 0.4,
    meat  : 1.3,
    bacon : 0.6
}

const addIngredient = (state, actions) => {
    const updatedIngredient  = {[actions.ingredientName]: state.ingredients[actions.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[actions.ingredientName],
        building: true
    }
    return updateObject(state, updatedState)
}

const removeIngredient = (state, actions) => {
    const updatedIng  = {[actions.ingredientName]: state.ingredients[actions.ingredientName] - 1}
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt   = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[actions.ingredientName],
        building: true
    }
    return updateObject(state, updatedSt)
}

const setIngredients = (state, actions) => {
    return updateObject(state, {
        ingredients: {
            salad: actions.ingredients.salad,
            bacon: actions.ingredients.bacon,
            cheese: actions.ingredients.cheese,
            meat: actions.ingredients.meat,
        },
        error: false,
        totalPrice: 4.0,
        building: false
    })
}
const reducer = (state = initialState, actions) => {
    switch(actions.type) {
        case(actionsType.ADD_INGREDIENTS):
            return addIngredient(state, actions);
        case(actionsType.REMOVE_INGREDIENTS):
            return removeIngredient(state, actions);
        case (actionsType.SET_INGREDIENTS):
            return setIngredients(state, actions);
        case (actionsType.FETCH_INGREDIENTS_FAILED):
            return updateObject(state, {error: true})
        default:
            return state;
    }
}

export default reducer;