import React from 'react';
import { Navigate, useNavigate, Link } from "react-router-dom"; 
import { MDBBtn } from 'mdb-react-ui-kit';
import { useHistory,useLocation } from 'react-router-dom';
import {borrowYourCarContract, web3} from "../utils/contracts";

export default class BorrowButton extends React.Component{
  
  handleClick = async (carNumber, account) => {
    console.log(carNumber)
    console.log(account)
    await borrowYourCarContract.methods.borrowCar(carNumber, parseInt(2)*360000).send({
      from: account
    })
  };

  render(){
    const {carNumber, account} = this.props;
    return (
      <MDBBtn color='link' rounded size='sm' onClick={() => this.handleClick(carNumber, account)}>
         borrow
      </MDBBtn>
    );
  }
};