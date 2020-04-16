import React, {Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary'
import axiosOrders from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


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
            ingredients : null,
            totalPrice  : 5.3,
            purchasable : true,
            purchasing  : false,
            loading     : false,
            error       : false
        }
    }

    componentDidMount () {
        axiosOrders.get('/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients : response.data
                })
            })
            .catch(error => {
                this.setState({
                    error : true
                })
            });
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
        // alert('Congrats you continue');
        this.setState({
            loading: true
        })
        
        const order = {
            ingredients: this.state.ingredients,
            price      : this.state.totalPrice,
            customer   : {
                name: 'Samuel Cristo',
                address: {
                    street: 'Maria de médice, 231',
                    country: 'Brasil'
                },
                email: 'test@test.com'
            },
            deliveryMethod : 'fastest'
        }
        /**
         * Sending a element to the firebase
         */
        axiosOrders.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            });
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

        let orderSummary = null

       

        let burguer = this.state.error ? <p style ={{alignItems: 'center'}}>Ingredients can't be laoded</p> :<Spinner></Spinner>
       
        
        if(this.state.ingredients) {
            burguer = <Aux>
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

            orderSummary = <OrderSummary    ingredients        = {this.state.ingredients}
                                            purchasingClosed   = {this.purchasingCancelHandler}
                                            purchasingContinue = {this.purchasingContinueHandler}
                                            price              = {this.state.totalPrice}>
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

export default withErrorHandler(BurguerBuilder, axiosOrders);