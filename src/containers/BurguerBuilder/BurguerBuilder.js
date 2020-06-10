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
        console.log(this.props);
        this.props.onInitiIngredients();
    }

    purchasingHandler = () => {
        this.setState({
            purchasing: true
        })
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
        error: state.burgerBuilder.error
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        onIngredientsAdded : (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientsRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitiIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchased: () => dispatch(actions.purchaseInit())
    }
}



export default connect(mapStateToProps, mapDistpatchToProps)(withErrorHandler(BurguerBuilder, axiosOrders));