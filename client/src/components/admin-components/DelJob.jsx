import React from 'react';
import Axios from 'axios';

const DelJob = () => {
  return (<div>
    <p>Name:</p>
    <input id="nameForm" />
    <button onClick={() => {
      Axios({
        method: 'delete',
        url: '/jobname',
        data: {
          name: document.getElementById('nameForm').value
        }
      })
      .then(() => {
        window.alert('Job Deleted');
      })
      .catch(() => {
        window.alert('Job Not Found');
      })
    }}>Delete</button>
  </div>)
}

export default DelJob;