import React from 'react';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const Home = ( { handlePageChange } ) => {
  const [employeeList, setmployeeList] = React.useState(null);
  const [jobList, setJobList] = React.useState(null);
  const [startDate, setStartDate] = React.useState(new Date());
  const [filledJobList, setFilledJobList] = React.useState([]);
  const [startTime, setStartTime] = React.useState('8:00');
  const [endTime, setEndTime] = React.useState('17:00');
  const [pay, setPay] = React.useState([])
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
    <div className="mx-auto w-1/2 min-w-[410px] text-center">
      <img className="mx-auto w-[400px] pr-[20px]" src="./images/gallreclaim.png"/>
      <p className="font-bold text-xl mb-[10px]">Name:</p>
      <input className="border-2 border-black rounded w-[200px] h-[33px] text-center" list="empNameList" name="empNames" id="empList" onChange={() => {
        if (employeeList[document.getElementById('empList').value]) {
          setPay(['Base Pay: ' + employeeList[document.getElementById('empList').value]]);
        } else {
          setPay([]);
        }
      }}/>
      {
        pay.map((item) => {
          return <p className="mt-[10px]">{item}</p>
        })
      }
      <datalist id="empNameList">
        {
          Object.keys(employeeList).map((item) => {
            return <option value={item}></option>
          })
        }
      </datalist>
      <p className="font-bold text-xl my-[10px]">Date:</p>
      <DatePicker className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="date" selected={startDate} onChange={(date) => setStartDate(date)}/>
      <p className="font-bold text-xl my-[10px]">Job Name:</p>
      <select className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="jobs">
        {
          Object.keys(jobList).map((item) => {
            return <option value={item}>{item}</option>
          })
        }
      </select>
      <p className="font-bold text-xl my-[10px]">Classification:</p>
      <select className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="classes">
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
      <p className="font-bold text-xl my-[10px]">Start Time:</p>
      <TimePicker className="border-2 border-black rounded w-[200px]" id="startTime" value={startTime} onChange={setStartTime}/>
      <p className="font-bold text-xl my-[10px]">End Time:</p>
      <TimePicker className="border-2 border-black rounded w-[200px]" value={endTime} onChange={setEndTime}/>
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
      }} className="block w-[150px] mx-auto bg-primary rounded p-2 mt-4">Add Classification</button>
      {
        filledJobList.map((item, index) => {
          return <ul>
            <li className="font-bold text-xl my-[10px]">Job {index + 1}:</li>
            <li className="text-xl">classification: {item.classification}</li>
            <li className="text-xl">hours worked: {item.hours}</li>
            <li className="text-xl">pay earned: {item.pay_earned}</li>
          </ul>
        })
      }
      <button className="block w-[150px] mx-auto bg-primary rounded p-2 mt-4" onClick={() => {
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
      <button className="block w-[150px] mx-auto bg-secondary rounded p-2 mt-4 text-white" onClick={() => {
        handlePageChange('login');
      }}>Admin</button>
    </div>
    )
  }
}

export default Home;