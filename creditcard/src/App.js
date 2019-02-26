import React, { Component } from 'react';
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
//reactsrap
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input,Label} from 'reactstrap';
import "./style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      cardNumber: "",
      month: "",
      year: "",
      modal: false,
      formErrors: {
        amount: "",
        cardNumber: "",
        month: "",
        year: ""
      }
    };

  }
  toggle=()=> {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

   handleChange = e => {
    //e.preventDefault(); 
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "amount":
        formErrors.amount = isNaN(value)  ? "Number required" : "";
        break;
      case "cardNumber":
        if(isNaN(value)){
          formErrors.cardNumber = "Number required"
        }
        else{
        
        if (/^5/.test(value))
        {
          formErrors.cardNumber ="Master";
        }
        //then check for Visa
        else if (/^4/.test(value))
        {
          formErrors.cardNumber ="Visa";
        }
        //then check for AmEx
        else if (/^3[47]/.test(value))
        {
          formErrors.cardNumber ="Amex";
        }
        else if (/^6011/.test(value))
        {
          formErrors.cardNumber ="Discover";
        }
        else  {
          formErrors.cardNumber ="";
        }
        }
        break;
      case "month":
        if(isNaN(value)){
          formErrors.month = "Number required"
        }
        else{
          if( Number(value) > 12)
            formErrors.month =  "maximum 12" ;
          else{
            formErrors.month = "";
          }
        }
        break;
      case "year":
      if(isNaN(value)){
        formErrors.year = "Number required"
      }
      else{
        if( value.length < 4)
          formErrors.year =  "minimum 4 characaters required" ;
        else{
          formErrors.year = "";
        }
      }
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  }; 


  handleSubmit = e => {
    e.preventDefault();
    let info = {
      amount: this.state.amount,
      cardNumber: this.state.cardNumber,
      month: this.state.month,
      year: this.state.year
    };
    
    if(info.amount===''||info.cardNumber===''||info.month===''||info.year===''){
      alert('Information missing');
    }
    else if(Number(info.month)>12){
      alert('wrong month');
    }
    else if(info.year.length<4){
      alert('wrong year');
    }
    else{
      axios
        .post("http://jsonplaceholder.typicode.com/posts", info)
        //.post('/api/new',data)
        .then(response => {
          this.setState(prevState => ({
            modal: !prevState.modal
          }));
        })
        .catch(err => {
          alert(err);
        });
      console.log(info);
      this.setState({
        amount: "",
        cardNumber: "",
        month: "",
        year: "",
        formErrors: {
          amount: "",
          cardNumber: "",
          month: "",
          year: ""
        }
      });
    }
  }
  
  render() {
  
   const { formErrors } = this.state;
    return (
      <div>
        <Header />
        <div className="login-page">
          <h2>Information </h2>
          <form>
          <div className="amount">
            <Label> Amount: </Label>
            <Input
              className={formErrors.amount.length > 0 ? "error" : null}
              type="text"
              placeholder="amount"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
              required
            />
            {formErrors.amount.length > 0 && (
                <span className="errorMessage">{formErrors.amount}</span>
              )}
             </div>
            
            <div className="cardNumber">
            <Label>Card Number: </Label>
            <Input
              className={formErrors.cardNumber.length > 0 ? "error" : null}
              type="text"
              placeholder="Card Number"
              name="cardNumber"
              value={this.state.cardNumber}
              onChange={this.handleChange}
              required
            />
            {formErrors.cardNumber.length > 0 && (
                <span className="typeMessage">{formErrors.cardNumber}</span>
              )}
            </div>
          
            <div className="month">
            <Label> Expiration Month: </Label>
            <Input
              type="text"
              placeholder="Expiration Month"
              name="month"
              value={this.state.month}
              onChange={this.handleChange}
              maxLength="2"
              required
            />
              {formErrors.month.length > 0 && (
                <span className="errorMessage">{formErrors.month}</span>
              )}
            </div>
          
            <div className="year">
            <Label> Expiration Year: </Label>
            <Input
              className={formErrors.year.length > 0 ? "error" : null}
              type="text"
              placeholder="Expiration Year"
              name="year"
              value={this.state.year}
              onChange={this.handleChange}
              maxLength="4"
              required
            />
             {formErrors.year.length > 0 && (
                <span className="errorMessage">{formErrors.year}</span>
              )}
            </div>

           
            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>

            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Processing</ModalHeader>
              <ModalBody>
                Transaction Success
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={this.toggle}>OK</Button>
              </ModalFooter>
            </Modal>

          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;