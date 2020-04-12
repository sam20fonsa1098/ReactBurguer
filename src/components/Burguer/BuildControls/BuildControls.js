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
            {control.map((elemento, index) => {
                return(
                    <BuildControl key = {elemento.label} label = {elemento.label}></BuildControl>
                );
            })}
        </div>
    );
};

export default buildControls;