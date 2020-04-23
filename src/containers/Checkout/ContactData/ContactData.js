import React, {Component} from 'react'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

import classes from './ContactData.css'

import axiosOrders from '../../../axios-orders'

class ContactData extends Component {
    
    state = {
        name : '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = () => {
        this.setState({
            loading: true
        })
        
        const order = {
            ingredients: this.props.ingredients,
            price      : this.props.price,
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
                    loading: false
                })
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({
                    loading: false
                })
            });
    }
    
    render () {
        let form = (
                <form >
                    <input className = {classes.Input}  type = "text" name = "name" placeholder = "Your name" />
                    <input className = {classes.Input}  type = "email" name = "email" placeholder = "Your email" />
                    <input className = {classes.Input}  type = "text" name = "street" placeholder = "Street" />
                    <input className = {classes.Input}  type = "text" name = "postal" placeholder = "Postal Code" />
                </form>
        );
        if(this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className = {classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
                <Button btnType = "Success" clicked = {this.orderHandler}>ORDER</Button>
            </div>

        );
    }
}

export default ContactData;