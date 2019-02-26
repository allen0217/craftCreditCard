import React from 'react';
import {shallow, mount} from 'enzyme';
import App from './App';
import {Input} from 'reactstrap'

it('should return number of input', () => {
    //check component exist
    const app = shallow(<App />);
    expect(app.find(Input)).toHaveLength(4);
});

describe('handleChange', () => {
    describe('month', ()=>{
        it('should return error when not satisfy', () => {
        const app = mount(<App />);
        //stimulate value 13 
        app.find('input').at(2).simulate('change',{ target: { name:"month",value: '13' }});
        expect(app.state().formErrors.month).toEqual('maximum 12');
        });
        it('no error', () => {
        const app = mount(<App />);
        app.find('input').at(2).simulate('change',{ target: { name:"month",value: '10' }});
        expect(app.state().formErrors.month).toEqual('');
        });
    })

    describe('cardNumber', ()=>{
        it('number required',()=>{
        const app = mount(<App />);
        const preventDefault = jest.fn();
        app.instance().handleChange({target: {name: "cardNumber", value: "eee"}, preventDefault});
        expect(app.state().formErrors.cardNumber).toEqual('Number required');
        })
        it('Master card',()=>{
        const app = mount(<App />);
        const preventDefault = jest.fn();
        app.instance().handleChange({target: {name: "cardNumber", value: "5523"}, preventDefault});
        expect(app.state().formErrors.cardNumber).toEqual('Master');
        })
    })


})

test('toggle', ()=>{
    const app = shallow(<App />);
    app.state().modal=false;

    app.instance().toggle();
    expect(app.state().modal).toEqual(true);
})

describe('submit', ()=>{
it('fail', ()=>{
const app = mount(<App />);
app.state().amount="12451";
app.state().cardNumber= "12314";
app.state().month= "22"
app.state().year= "22";

window.alert = jest.fn()
app.find('button').simulate('click');

expect(window.alert).toHaveBeenCalled();
})
it('success', ()=>{
const app = mount(<App />);
app.state().amount="12451";
app.state().cardNumber= "12314";
app.state().month= "12"
app.state().year= "2017";
app.instance().toggle=jest.fn();
// jest.mock('axios');
// axios.get.mockResolvedValue();

app.find('button').simulate('click');
// expect(axios).toHaveBeenCalled();//CRA use old version jest
expect(app.state().amount).toEqual("");
expect(app.state().cardNumber).toEqual("");
expect(app.state().month).toEqual("");
expect(app.state().year).toEqual(""); 
   })
 })