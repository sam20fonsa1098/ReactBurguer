import React, {useState, useEffect, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import * as actions from '../../store/actions/index'

import Aux from '../../hoc/Aux/Aux'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary'
import axiosOrders from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


export const BurguerBuilder = props =>{
    const [purchasing, setPurchasing] = useState(false);

    const ings = useSelector(state => state.burgerBuilder.ingredients)
    const price = useSelector(state => state.burgerBuilder.totalPrice)
    const error = useSelector(state => state.burgerBuilder.error)
    const isAuthenticated = useSelector(state => state.auth.token !== null)

    const dispatch             = useDispatch()
    const onIngredientsAdded   = (ingredientName) => dispatch(actions.addIngredient(ingredientName))
    const onIngredientsRemoved = (ingredientName) => dispatch(actions.removeIngredient(ingredientName))
    const onInitiIngredients   = useCallback(() => dispatch(actions.initIngredients()), [])
    const onInitPurchased      = () => dispatch(actions.purchaseInit())
    const onSetRedirectPath    = (path) => dispatch(actions.setAuthRedirectPath(path))

    useEffect(() => {
        onInitiIngredients();
    }, [onInitiIngredients])

    const purchasingHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetRedirectPath('/checkout');
            props.history.push('/auth')
        }
        
    }

    const purchasingCancelHandler = () => {
        setPurchasing(false);
    }

    const purchasingContinueHandler = () => {
        onInitPurchased();
        props.history.push({pathname: '/checkout'});
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0
    }

    const disabledInfo = {...ings}

    for(let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burguer = error ? <p style ={{alignItems: 'center'}}>Ingredients can't be laoded</p> :<Spinner></Spinner>
    
    if(ings) {
        burguer = <Aux>
                    <Burguer ingredients = {ings}></Burguer>
                    <BuildControls 
                        isAuth      = {isAuthenticated}
                        adding      = {onIngredientsAdded} 
                        remove      = {onIngredientsRemoved}
                        disabled    = {disabledInfo}
                        price       = {price}
                        purchasable = {updatePurchaseState(ings)}
                        purchasing  = {purchasingHandler}>
                    </BuildControls>
                </Aux>

        orderSummary = <OrderSummary    ingredients        = {ings}
                                        purchasingClosed   = {purchasingCancelHandler}
                                        purchasingContinue = {purchasingContinueHandler}
                                        price              = {price}>
                        </OrderSummary>
    }


    return(
        <Aux>
            <Modal show = {purchasing} modalClosed = {purchasingCancelHandler}>
                {orderSummary}
            </Modal>
            {burguer}
        </Aux>
    );
};

export default withErrorHandler(BurguerBuilder, axiosOrders);