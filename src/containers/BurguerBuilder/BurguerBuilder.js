import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'

class BurguerBuilder extends Component{

    constructor (props) {
        super (props);
        this.state = {
            ingredients:{
                salad : 0,
                bacon : 0,
                cheese: 0,
                meat  : 0,
            }
        }
    }

    render() {
        return(
            <Aux>
                <div>
                    <Burguer ingredients = {this.state.ingredients}></Burguer>
                </div>
                <div>
                    <BuildControls></BuildControls>
                </div>
            </Aux>
        );
    };
};

export default BurguerBuilder;