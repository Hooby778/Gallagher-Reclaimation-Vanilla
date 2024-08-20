import React from 'react';
import Axios from 'axios';
import DatePicker from 'react-datepicker';

const GetTime = () => {
  const [classes, setClasses] = React.useState([]);
  const [startDate, setStartDate] = React.useState(new Date());
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
      <p>Date:</p>
      <DatePicker id="date" selected={startDate} onChange={(date) => setStartDate(date)}/>
      <button onClick={() => {
        Axios({
          method: 'get',
          url: '/timesheets',
          params: {
            name: document.getElementById('nameForm').value,
            date: document.getElementById('date').value
          }
        })
        .then((result) => {
          if (result.data.length > 0) {
            setClasses(result.data);
          } else {
            setClasses(['No Timesheet Found'])
          }
        })
        .catch((err) => {
          window.alert('error retrieving timesheet');
        })
      }}>Get Timesheet</button>
      {
        classes.map((item, index) => {
          if (typeof item !== 'string') {
            return(
              <div>
                <h3>Classification {index + 1}:</h3>
                <ul>
                  <li>Employee Name: {item.name}</li>
                  <li>Job Name: {item.job_name}</li>
                  <li>Classification: {item.classification}</li>
                  <li>Date: {item.date}</li>
                  <li>Start Time: {item.start_time}</li>
                  <li>End Time: {item.end_time}</li>
                  <li>Hours: {item.hours}</li>
                  <li>Pay Earned: {item.pay_earned}</li>
                </ul>
              </div>
            )
          } else {
            return <p>No Timesheets Found</p>
          }
        })
      }
    </div>)
  }
}

export default GetTime;