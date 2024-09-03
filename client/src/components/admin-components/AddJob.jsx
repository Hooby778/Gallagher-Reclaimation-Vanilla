import React from 'react';
import Axios from 'axios';

const AddJob = () => {
  return (<div>
    <p className="font-bold text-xl my-[10px]">Name:</p>
    <input className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="nameForm" />
    <p className="font-bold text-xl my-[10px]">Wage Decision A:</p>
    <input className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="wageAForm" />
    <p className="font-bold text-xl my-[10px]">Wage Decision B:</p>
    <input className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="wageBForm" />
    <p className="font-bold text-xl my-[10px]">Wage Decision C:</p>
    <input className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="wageCForm" />
    <p className="font-bold text-xl my-[10px]">Wage Decision D:</p>
    <input className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="wageDForm" />
    <p className="font-bold text-xl my-[10px]">Wage Decision E:</p>
    <input className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="wageEForm" />
    <p className="font-bold text-xl my-[10px]">Wage Decision F:</p>
    <input className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="wageFForm" />
    <button className="block w-[150px] mx-auto bg-primary rounded p-2 mt-4" onClick={() => {
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