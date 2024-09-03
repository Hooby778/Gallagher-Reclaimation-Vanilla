import React from 'react';
import Axios from 'axios';

const AddEmp = () => {
  return (<div>
    <p className="font-bold text-xl my-[10px]">Name:</p>
    <input className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="nameForm" />
    <p className="font-bold text-xl my-[10px]">Base Pay:</p>
    <input className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="payForm" />
    <button className="block w-[150px] mx-auto bg-primary rounded p-2 mt-4" onClick={() => {
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