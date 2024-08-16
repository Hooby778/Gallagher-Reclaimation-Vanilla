import React from 'react';
import Axios from 'axios';

const Login = ( { handlePageChange } ) => {
  return (
    <div>
      <p>Enter Password:</p>
      <input type="password" id="passform"></input>
      <button onClick={() => {
        Axios({
          method: 'post',
          url: '/pass',
          data: {
            pass: document.getElementById("passform").value
          }
        })
        .then((result) => {
          handlePageChange('admin');
        })
        .catch((err) => {
          window.alert('Incorrect Password');
        })
      }}>Enter</button>
    </div>
  )
}

export default Login