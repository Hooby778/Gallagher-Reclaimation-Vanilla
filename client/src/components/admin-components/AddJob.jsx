import React from 'react';
import Axios from 'axios';

const AddJob = () => {
  return (<div>
    <p>Name:</p>
    <input id="nameForm" />
    <p>Wage Decision A:</p>
    <input id="wageAForm" />
    <p>Wage Decision B:</p>
    <input id="wageBForm" />
    <p>Wage Decision C:</p>
    <input id="wageCForm" />
    <p>Wage Decision D:</p>
    <input id="wageDForm" />
    <p>Wage Decision E:</p>
    <input id="wageEForm" />
    <p>Wage Decision F:</p>
    <input id="wageFForm" />
    <button onClick={() => {
      Axios({
        method: 'post',
        url: '/jobname',
        data: {
          name: document.getElementById('nameForm').value,
          wage_decisions: {
            A: Number(document.getElementById('wageAForm').value),
            B: Number(document.getElementById('wageBForm').value),
            C: Number(document.getElementById('wageCForm').value),
            D: Number(document.getElementById('wageDForm').value),
            E: Number(document.getElementById('wageEForm').value),
            F: Number(document.getElementById('wageFForm').value)
          }
        }
      })
      .then(() => {
        window.alert('Job Added Successfully');
      })
      .catch(() => {
        window.alert('Error Adding Job');
      })
    }}>Add Job</button>
  </div>)
}

export default AddJob;