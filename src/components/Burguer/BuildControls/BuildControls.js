import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const control = [
    {label:  'Salad', type: 'salad' },
    {label:  'Bacon', type: 'bacon' },
    {label: 'Cheese', type: 'cheese'},
    {label:   'Meat', type: 'meat'  },
];

const buildControls = (props) => {
    return(
        <div className = {classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {control.map((elemento, index) => {
                return(
                    <BuildControl 
                        key      = {elemento.label} 
                        label    = {elemento.label}
                        adding   = {() => props.adding(elemento.type)}
                        remove   = {() => props.remove(elemento.type)}
                        disabled = {props.disabled[elemento.type]}>
                    </BuildControl>
                );
            })}
            <button onClick = {props.purchasing} 
                    className = {classes.OrderButton} 
                    disabled = {!props.purchasable}>
                    {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
            </button>
        </div>
    );
};

export default buildControls;