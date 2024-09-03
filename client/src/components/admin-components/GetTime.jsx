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
      <p className="font-bold text-xl my-[10px]">Employee Name:</p>
      <input className="border-2 border-black rounded w-[200px] h-[33px] text-center" list="empNameList" name="empNames" id="nameForm"/>
      <datalist id="empNameList">
        {
          Object.keys(employeeList).map((item) => {
            return <option value={item}></option>
          })
        }
      </datalist>
      <p className="font-bold text-xl my-[10px]">Date:</p>
      <DatePicker className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="date" selected={startDate} onChange={(date) => setStartDate(date)}/>
      <button className="block w-[150px] mx-auto bg-primary rounded p-2 mt-4" onClick={() => {
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
                <h3 className="font-bold text-xl my-[10px]">Classification {index + 1}:</h3>
                <ul>
                  <li><div className="font-bold inline">Employee Name:</div> {item.name}</li>
                  <li><div className="font-bold inline">Job Name:</div> {item.job_name}</li>
                  <li><div className="font-bold inline">Classification:</div> {item.classification}</li>
                  <li><div className="font-bold inline">Date:</div> {item.date}</li>
                  <li><div className="font-bold inline">Start Time:</div> {item.start_time}</li>
                  <li><div className="font-bold inline">End Time:</div> {item.end_time}</li>
                  <li><div className="font-bold inline">Hours:</div> {item.hours}</li>
                  <li><div className="font-bold inline">Pay Earned:</div> {item.pay_earned}</li>
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