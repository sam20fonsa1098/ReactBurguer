import React from 'react'
import BurguerIngredient from './BurguerIngredient/BurguerIngredient'
import classes from './Burguer.css'

const burguer = (props) => {
    /**
     * Transform a object in a array e depois transforamndo 
     * em BurguerIngredient
     */
    let transformIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((elemento, index) => {
            return (
                <BurguerIngredient key = {igKey +1} type = {igKey}></BurguerIngredient>
            );
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);


    if(transformIngredients.length == 0){
        transformIngredients = <p>Please starting adding ingredients</p>
    }
    return(
        <div className = {classes.Burguer}>
            <BurguerIngredient type = "bread-top"></BurguerIngredient>
            {transformIngredients}
            <BurguerIngredient type = "bread-bottom"></BurguerIngredient>
        </div>
    );
};

export default burguer;