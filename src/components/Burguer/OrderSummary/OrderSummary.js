import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const OrderSummary = props => {

    let ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
    return <li key = {igKey}>
            <span style = {{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li> 
    });


    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: {props.price.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <Button btnType = "Danger" clicked  = {props.purchasingClosed}>CANCEL</Button>
            <Button btnType = "Success" clicked = {props.purchasingContinue}>CONTINUE</Button>
        </Aux>
    );
};

export default OrderSummary;