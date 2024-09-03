import React from 'react';
import Axios from 'axios';

const Login = ( { handlePageChange } ) => {
  return (
    <div className="flex flex-col justify-center align-middle mx-auto h-screen w-1/2 min-w-[410px] text-center">
      <p className="font-bold text-xl">Enter Password:</p>
      <input className="mx-auto border-2 border-black rounded w-[200px] h-[33px] text-center" type="password" id="passform"></input>
      <button className="block w-[150px] mx-auto bg-primary rounded p-2 mt-4" onClick={() => {
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