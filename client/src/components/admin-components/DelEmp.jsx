import React from 'react';
import Axios from 'axios';

const DelEmp = () => {
  const [employeeList, setmployeeList] = React.useState(null);
  React.useState(() => {
    Axios({
      method: 'get',
      url: '/employees'
    })
    .then((result) => {
      var empObj = {};
      for (var i = 0; i < result.data.length; i++) {
        empObj[result.data[i].name] = result.data[i].pay;
      }
      setmployeeList(empObj);
    })
    .catch((err) => {
      window.alert('error fetching employees');
    })
  })
  if (employeeList) {
    return (<div>
        <p className="font-bold text-xl my-[10px]">Employee Name:</p>
        <input className="border-2 border-black rounded w-[200px] h-[33px] text-center" list="empNameList" name="empNames" id="nameForm"/>
        <datalist id="empNameList">
          {
            Object.keys(employeeList).map((item) => {
              return <option value={item}></option>
            })
          }
        </datalist>
      <button className="block w-[150px] mx-auto bg-primary rounded p-2 mt-4" onClick={() => {
        Axios({
          method: 'delete',
          url: '/employees',
          data: {
            name: document.getElementById('nameForm').value
          }
        })
        .then(() => {
          window.alert('Employee Deleted');
        })
        .catch(() => {
          window.alert('Employee Not Found');
        })
      }}>Delete</button>
    </div>)
  }
}

export default DelEmp;