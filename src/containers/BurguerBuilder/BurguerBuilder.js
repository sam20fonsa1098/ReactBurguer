import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../../store/actions/index'

import Aux from '../../hoc/Aux/Aux'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary'
import axiosOrders from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


class BurguerBuilder extends Component{

    constructor (props) {
        super (props);
        this.state = {
            purchasing  : false
        }
    }
    componentDidMount () {
        this.props.onInitiIngredients();
    }

    purchasingHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                purchasing: true
            })
        } else {
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth')
        }
        
    }

    purchasingCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchasingContinueHandler = () => {
        this.props.onInitPurchased();
        this.props.history.push({pathname: '/checkout'});
    }

    updatePurchaseState = (ingredients) => {
        const sum         = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0
    }

    render() {
        const disabledInfo = {...this.props.ings}

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

       

        let burguer = this.props.error ? <p style ={{alignItems: 'center'}}>Ingredients can't be laoded</p> :<Spinner></Spinner>
       
        
        if(this.props.ings) {
            burguer = <Aux>
                        <Burguer ingredients = {this.props.ings}></Burguer>
                        <BuildControls 
                            isAuth      = {this.props.isAuthenticated}
                            adding      = {this.props.onIngredientsAdded} 
                            remove      = {this.props.onIngredientsRemoved}
                            disabled    = {disabledInfo}
                            price       = {this.props.price}
                            purchasable = {this.updatePurchaseState(this.props.ings)}
                            purchasing  = {this.purchasingHandler}>
                        </BuildControls>
                    </Aux>

            orderSummary = <OrderSummary    ingredients        = {this.props.ings}
                                            purchasingClosed   = {this.purchasingCancelHandler}
                                            purchasingContinue = {this.purchasingContinueHandler}
                                            price              = {this.props.price}>
                            </OrderSummary>
        }

    
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchasingCancelHandler}>
                    {orderSummary}
                </Modal>
                {burguer}
            </Aux>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        ings : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        onIngredientsAdded : (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientsRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitiIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchased: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}



export default connect(mapStateToProps, mapDistpatchToProps)(withErrorHandler(BurguerBuilder, axiosOrders));