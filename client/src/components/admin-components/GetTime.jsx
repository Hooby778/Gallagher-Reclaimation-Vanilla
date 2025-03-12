import React from 'react';
import Axios from 'axios';
import Popup from 'reactjs-popup';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const GetTime = () => {
  const [classes, setClasses] = React.useState([]);
  var setClassList = (temp) => {
    setClasses(temp);
  }
  const [startDate, setStartDate] = React.useState(new Date());
  const [employeeList, setmployeeList] = React.useState(null);
  const [jobList, setJobList] = React.useState(null);
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
      window.alert('error fetching employees');
    })
  })
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
                <Popup trigger={<button className="block w-[100px] mx-auto bg-secondary rounded p-2 mt-2 text-white">Edit</button>}>
                  <ul className="mx-auto text-center bg-white w-[350px] border-2 border-black">
                    <li><div className="font-bold">Employee Name:</div><input className="border-2 border-black rounded w-[200px] h-[33px] text-center" list="empNameList" name="empNames" id="nameFormPopup"/>
                      <datalist id="empNameList">
                        {
                          Object.keys(employeeList).map((item) => {
                            return <option value={item}></option>
                          })
                        }
                      </datalist></li>
                    <li><div className="font-bold">Job Name:</div><select className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="jobs">
                      {
                        Object.keys(jobList).map((item) => {
                          return <option value={item}>{item}</option>
                        })
                      }
                    </select></li>
                    <li><div className="font-bold">Classification:</div><select className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="classes">
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
                    </select></li>
                    <li><div className="font-bold">Date:</div><DatePicker className="border-2 border-black !inline rounded w-[200px] h-[33px] text-center" id="date" selected={startDate} onChange={(date) => setStartDate(date)}/></li>
                    <li><div className="font-bold">Start Time:</div><TimePicker className="border-2 border-black rounded w-[200px]" id="startTime" value={startTime} onChange={setStartTime}/></li>
                    <li><div className="font-bold">End Time:</div><TimePicker className="border-2 border-black rounded w-[200px]" value={endTime} onChange={setEndTime}/></li>
                    <li className="mb-4"><button className="block w-[150px] mx-auto bg-primary rounded p-2 mt-4" onClick={() => {
                      var empName = document.getElementById('nameFormPopup').value;
                      console.log(empName);
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
                        'pay_earned': payEarned,
                        '_id': item._id
                      }
                        Axios({
                          method: "put",
                          url: "/timesheets",
                          data: {
                            'name': empName,
                            'job_name': jobName,
                            'classification': chosenClass,
                            'date': document.getElementById('date').value,
                            'start_time': startTime,
                            'end_time': endTime,
                            'hours': hoursWorked,
                            'pay_earned': payEarned,
                            '_id': item._id
                          }
                        })
                        .then((res) => {
                          var tempList = Array.from(classes);
                          for (var i = 0; i < tempList.length; i++) {
                            if (tempList[i]._id === outObj._id) {
                              tempList[i] = outObj;
                              break;
                            }
                          }
                          setClasses(tempList);
                        })
                        .catch((err) => {
                          console.log(err);
                        })
                      }
                    }>Submit Edit</button></li>
                  </ul>
                </Popup>
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