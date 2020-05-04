import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actionsType from '../../store/actions/action'

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
            purchasing  : false,
            loading     : false,
            error       : false
        }
    }
    componentDidMount () {
        // axiosOrders.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //             ingredients : response.data
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({
        //             error : true
        //         })
        //     });
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

       

        let burguer = this.state.error ? <p style ={{alignItems: 'center'}}>Ingredients can't be laoded</p> :<Spinner></Spinner>
       
        
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

        if(this.state.loading) {
            orderSummary = <Spinner></Spinner>
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
        ings : state.ingredients,
        price: state.totalPrice
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        onIngredientsAdded : (ingredientName) => dispatch({
            type: actionsType.ADD_INGREDIENTS,
            ingredientName: ingredientName
        }),
        onIngredientsRemoved: (ingredientName) => dispatch({
            type: actionsType.REMOVE_INGREDIENTS,
            ingredientName: ingredientName
        })
    }
}



export default connect(mapStateToProps, mapDistpatchToProps)(withErrorHandler(BurguerBuilder, axiosOrders));