import * as actionsType from '../actions/action'

const initialState = {
    ingredients : {
        salad : 0,
        bacon : 0,
        cheese: 0,
        meat  : 0
    },
    totalPrice  : 4.0,
}

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese: 0.4,
    meat  : 1.3,
    bacon : 0.6
}

const reducer = (state = initialState, actions) => {
    switch(actions.type) {
        case(actionsType.ADD_INGREDIENTS):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [actions.ingredientName] : state.ingredients[actions.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[actions.ingredientName]
            }
        case(actionsType.REMOVE_INGREDIENTS):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [actions.ingredientName] : state.ingredients[actions.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[actions.ingredientName]
            }
        default:
            return state;
    }
}

export default reducer;