import React, {Component} from 'react'
import {connect} from 'react-redux'
import axiosOrders from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import * as actions from '../../store/actions/index'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render () {
        let orders = <Spinner/>
        if (!this.props.loading) {
            orders = <div>
                        {this.props.orders.map(order => {
                            return(
                                <Order 
                                    key         = {order.id}
                                    ingredients = {order.ingredients}
                                    price       = {order.price}/>
                            );
                        })}
                    </div>
        }
        return(
            orders
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosOrders));