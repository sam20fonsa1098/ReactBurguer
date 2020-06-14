import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContactData/ContactData'

class Ckeckout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        let summary = <Redirect to = "/"/>
        if (this.props.ings) {
            summary = <div>
                        <CheckoutSummary    
                            checkoutCancelled = {this.checkoutCancelledHandler} 
                            checkoutContinued = {this.checkoutContinuedHandler} 
                            ingredients       = {this.props.ings}/>
                        <Route 
                            path      = {this.props.match.url + '/contact-data'} 
                            component = {ContactData}/>
                    </div>
            summary = this.props.purchased ? <Redirect to = "/"/> : summary;
        }
        return (
            summary
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings : state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Ckeckout);