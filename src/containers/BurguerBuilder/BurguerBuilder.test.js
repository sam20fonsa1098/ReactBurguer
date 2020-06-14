import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; 

import {BurguerBuilder} from './BurguerBuilder';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';

configure({adapter: new Adapter()})

describe('', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurguerBuilder onInitiIngredients = {() => {}}/>)
    })

    it ('should render <BuildControls/> when receiving igredients',() => {
        wrapper.setProps({ings: {salad: 0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})