import React from 'react';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import BorrowButton from './BorrowButton';
import {borrowYourCarContract, web3} from "../utils/contracts";
import {useEffect, useState} from 'react';
import internal from 'stream';

const InfoTable = ({nums, owners, borrowers, account})=> {
  
  return (
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>No.</th>
          <th scope='col'>Owner</th>
          <th scope='col'>Borrower</th>
          <th scope='col'>Status</th>
          <th scope='col'>Operation</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {nums.map((carNumber, index) => (
          
            <tr key={index}>
                  <td>
                    <p>{carNumber}</p>
                  </td>
                  <td>
                    <p>{owners[index]}</p>
                  </td>
                  <td>
                    <p>{borrowers[index] === "0x0000000000000000000000000000000000000000"? "none":borrowers[index]}</p>
                  </td>
                  <td>
                    <p>{borrowers[index] === "0x0000000000000000000000000000000000000000"?"free":"borrowed"}</p>
                  </td>
                  <td>
                    <BorrowButton carNumber={carNumber} account={account}/>
                  </td>
            </tr>
      ))}
      </MDBTableBody>
    </MDBTable>
  );
}

export default InfoTable