import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContactData/ContactData'

class Ckeckout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        for(let param of query.entries()) {
            if(param[0] === 'price') {
                this.setState({
                    price: param[1]
                })
            }
            else{
                ingredients[param[0]] = +param[1]
            }
                
        }
        this.setState({
            ingredients: ingredients
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        return(
            <div style = {{width: '100%'}}>
                <CheckoutSummary    
                                checkoutCancelled = {this.checkoutCancelledHandler} 
                                checkoutContinued = {this.checkoutContinuedHandler} 
                                ingredients       = {this.state.ingredients}/>
                <Route 
                    path = {this.props.match.url + '/contact-data'} 
                    render = {(props) => (<ContactData ingredients = {this.state.ingredients} price = {this.state.price} {...props}/>)}/>
            </div>
        );
    }
}

export default Ckeckout;