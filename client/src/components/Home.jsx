import React from 'react';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const Home = () => {
  const [employeeList, setmployeeList] = React.useState(null);
  const [jobList, setJobList] = React.useState(null);
  const [startDate, setStartDate] = React.useState(new Date());
  const [filledJobList, setFilledJobList] = React.useState([]);
  const [startTime, setStartTime] = React.useState('8:00');
  const [endTime, setEndTime] = React.useState('17:00');
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

    })
  }, [])
  React.useState(() => {
    Axios({
      method: 'get',
      url: '/jobname'
    })
    .then((result) => {
      var jobObj = {};
      for (var i = 0; i < result.data.length; i++) {
        jobObj[result.data[i].name] = result.data[i].wage_decisions;
      }
      setJobList(jobObj);
    })
  }, [])
  if (employeeList && jobList) {
  return (
    <div className="">
      <p>Name:</p>
      <input list="empNameList" name="empNames" id="empList"/>
      <datalist id="empNameList">
        {
          Object.keys(employeeList).map((item) => {
            return <option value={item}></option>
          })
        }
      </datalist>
      <p>Date:</p>
      <DatePicker id="date" selected={startDate} onChange={(date) => setStartDate(date)}/>
      <p>Job Name:</p>
      <select id="jobs">
        {
          Object.keys(jobList).map((item) => {
            return <option value={item}>{item}</option>
          })
        }
      </select>
      <p>Classification:</p>
      <select id="classes">
        <option value="Clean Up">Clean Up</option>
        <option value="Equipment Operator">Equipment Operator</option>
        <option value="General Labor">General Labor</option>
        <option value="Maintenance">Maintenance</option>
        <option value="Material/Equipemnt Pickup/Dropoff">Material/Equipemnt Pickup/Dropoff</option>
        <option value="Miscellaneous Landscape">Miscellaneous Landscape</option>
        <option value="Office">Office</option>
        <option value="Seeding">Seeding</option>
        <option value="Travel/Drive Time">Travel/Drive Time</option>
        <option value="Wattles">Wattles</option>
        <option value="A">A = Operator: Power Equipment/Hydrographic Seeder </option>
        <option value="B">B = Truck Driver: Water Truck {'<'} 2500 gallons</option>
        <option value="C">C = Laborer: General Laborer</option>
        <option value="D">D = Operator: Power Equipment/Skip Loader {'<'} 3 CY</option>
        <option value="E">E = Laborer: Erosion Control Laborer</option>
        <option value="F">F = Operator: Power Equipment/Tractor</option>
      </select>
      <p>Start Time:</p>
      <TimePicker id="startTime" value={startTime} onChange={setStartTime}/>
      <p>End Time:</p>
      <TimePicker value={endTime} onChange={setEndTime}/>
      <button onClick={() => {
        var empName = document.getElementById('empList').value;
        var jobName = document.getElementById('jobs').value;
        var chosenClass = document.getElementById('classes').value;
        var numberS = Number(startTime.substr(0, startTime.length - 3)) + Number(startTime.substr(startTime.length - 2)) / 60.0;
        var numberE = Number(endTime.substr(0, endTime.length - 3)) + Number(endTime.substr(endTime.length - 2)) / 60.0;
        var hoursWorked = numberE - numberS;
        var payEarned;
        if (chosenClass.length > 1 || employeeList[empName] > jobList[jobName][chosenClass]) {
          payEarned = employeeList[empName] * hoursWorked;
        } else {
          payEarned = jobList[jobName][chosenClass] * hoursWorked;
        }
        var outObj = {
          'name': empName,
          'job_name': jobName,
          'classification': chosenClass,
          'date': document.getElementById('date').value,
          'start_time': startTime,
          'end_time': endTime,
          'hours': hoursWorked,
          'pay_earned': payEarned
        }
        var newArray = filledJobList.slice(0);
        newArray.push(outObj);
        setFilledJobList(newArray);
      }}>Add Job</button>
      {
        filledJobList.map((item, index) => {
          return <ul>
            <li>Job {index + 1}:</li>
            <li>classification: {item.classification}</li>
            <li>hours worked: {item.hours}</li>
            <li>pay earned: {item.pay_earned}</li>
          </ul>
        })
      }
      <button onClick={() => {
        for (var i = 0; i < filledJobList.length; i++) {
          Axios({
            method: 'post',
            url: '/timesheets',
            data: filledJobList[i]
          })
        }
        window.alert("Timesheet Submitted!")
        setFilledJobList([]);
      }}>Submit</button>
      <button>Admin</button>
    </div>
    )
  }
}

export default Home;