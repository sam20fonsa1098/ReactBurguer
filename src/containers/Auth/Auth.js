import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


import {updateObject, checkValidity} from '../../shared/utility';
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.css';

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })
    const [isSignUp, setIsSignUp] = useState(true)

    const inputChangedHandler = (event, controlName) => {
        const udpatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        })
        setControls(udpatedControls)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    }

    const swithAuthModeHandler = () => {
        setIsSignUp(!isSignUp)
    }

    const {onSetRedirectPath} = props;

    useEffect(() => {
        if (!props.building && props.authRedirectPath !== '/') {
            onSetRedirectPath();
        }
    }, [onSetRedirectPath])

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }
    let form = formElementsArray.map(formElement => (
            <Input
                    key = {formElement.id}
                    elementType    = {formElement.config.elementType}
                    elementConfig  = {formElement.config.elementConfig}
                    value          = {formElement.config.value}
                    invalid        = {!formElement.config.valid}
                    shouldValidate = {formElement.config.validation}
                    touched        = {formElement.config.touched}
                    changed        = {(event) => inputChangedHandler(event, formElement.id)}/>
        )
    )
    if (props.loading) {
        form = <Spinner/>
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>
                {props.error.message}
            </p>
        );
    }
    if (props.isAuthenticated) {
        return <Redirect to = {props.authRedirectPath}/>
    }
    return (
        <div className = {classes.Auth}>
            {errorMessage}
            <form onSubmit = {submitHandler}>
                {form}
                <Button btnType = "Success">
                    SUBMIT
                </Button>
            </form>
            <Button btnType = "Danger" clicked = {swithAuthModeHandler}>
                SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}
            </Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);