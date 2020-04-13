import React, {Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary'


const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese: 0.4,
    meat  : 1.3,
    bacon : 0.6
}

class BurguerBuilder extends Component{

    constructor (props) {
        super (props);
        this.state = {
            ingredients:{
                salad : 0,
                bacon : 0,
                cheese: 0,
                meat  : 0,
            },
            totalPrice  : 4,
            purchasable : false,
            purchasing  : false,
        }
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
        alert('Congrats you continue');
    }

    updatePurchaseState = (ingredients) => {
        const sum         = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldCount       = this.state.ingredients[type];
        let Ingredients   = {...this.state.ingredients};
        Ingredients[type] = oldCount +1;
        let price      = this.state.totalPrice;
        price          = price + INGREDIENT_PRICES[type]
        this.setState({
            ingredients: Ingredients,
            totalPrice: price
        })
        this.updatePurchaseState(Ingredients);
    }
    removeIngredientHandler =(type) => {
        const oldCount       = this.state.ingredients[type];
       
        let Ingredients   = {...this.state.ingredients};
        Ingredients[type] = oldCount - 1;
        let price      = this.state.totalPrice;
        price          = price - INGREDIENT_PRICES[type]
        this.setState({
            ingredients: Ingredients,
            totalPrice: price
        })
        this.updatePurchaseState(Ingredients);
    }

    render() {
        const disabledInfo = {...this.state.ingredients}

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
    
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchasingCancelHandler}>
                    <OrderSummary ingredients        = {this.state.ingredients}
                                  purchasingClosed   = {this.purchasingCancelHandler}
                                  purchasingContinue = {this.purchasingContinueHandler}
                                  price              = {this.state.totalPrice}>
                    </OrderSummary>
                </Modal>
                <Burguer ingredients = {this.state.ingredients}></Burguer>
                <BuildControls 
                    adding      = {this.addIngredientHandler} 
                    remove      = {this.removeIngredientHandler}
                    disabled    = {disabledInfo}
                    price       = {this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    purchasing  = {this.purchasingHandler}>
                </BuildControls>
            </Aux>
        );
    };
};

export default BurguerBuilder;