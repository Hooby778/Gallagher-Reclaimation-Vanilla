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
        <p>Employee Name:</p>
        <input list="empNameList" name="empNames" id="nameForm"/>
        <datalist id="empNameList">
          {
            Object.keys(employeeList).map((item) => {
              return <option value={item}></option>
            })
          }
        </datalist>
      <button onClick={() => {
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