import React, {Component} from 'react'
import {Route} from 'react-router-dom'
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
        return(
            <div style = {{width: '100%'}}>
                <CheckoutSummary    
                                checkoutCancelled = {this.checkoutCancelledHandler} 
                                checkoutContinued = {this.checkoutContinuedHandler} 
                                ingredients       = {this.props.ings}/>
                <Route 
                    path      = {this.props.match.url + '/contact-data'} 
                    component = {ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings : state.ingredients
    }
}

export default connect(mapStateToProps)(Ckeckout);