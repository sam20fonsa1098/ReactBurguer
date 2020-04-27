import React from 'react'

import classes from './Input.css'

const input = (props) => {

    let inputElement     = null;
    const inputClasses   = [classes.InputElement];
    /**
     * A good way to validation form with dynamics style
     */
    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType) {
        case ('input'):
            inputElement = <input onChange = {props.changed} {...props.elementConfig} className = {inputClasses.join(' ')} value = {props.value}></input>
            break;
        case ('textarea'):
            inputElement = <textarea onChange = {props.changed} {...props.elementConfig} className = {inputClasses.join(' ')} value = {props.value}></textarea>
            break;
        case ('select'):
            inputElement = <select 
                                    className = {inputClasses.join(' ')} 
                                    value = {props.value}
                                    onChange = {props.changed}>
                                    {props.elementConfig.options.map(option => {
                                        return (
                                            <option key = {option.value} value = {option.value}>
                                                {option.displayValue}
                                            </option>
                                        );
                                    })}
                            </select>
            break;
        default:
            inputElement = <input onChange = {props.changed} {...props.elementConfig} className = {inputClasses.join(' ')} value = {props.value}></input>
    }

    return(
        <div className = {classes.Input}>
            <label className = {classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;
