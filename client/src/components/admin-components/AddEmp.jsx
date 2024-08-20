import React from 'react';
import Axios from 'axios';

const AddEmp = () => {
  return (<div>
    <p>Name:</p>
    <input id="nameForm" />
    <p>Base Pay:</p>
    <input id="payForm" />
    <button onClick={() => {
      Axios({
        method: 'post',
        url: '/employees',
        data: {
          name: document.getElementById('nameForm').value,
          pay: Number(document.getElementById('payForm').value)
        }
      })
      .then(() => {
        window.alert('Employee Added Successfully');
      })
      .catch(() => {
        window.alert('Error Adding Employee');
      })
    }}>Add Employee</button>
  </div>)
}

export default AddEmp;