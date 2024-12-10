import React from 'react';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const GetTS = () => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [sheets, setSheets] = React.useState([]);
  const [employeeList, setmployeeList] = React.useState(null);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
  return (
    <div>
      <p className="font-bold text-xl my-[10px]">Select Monday of Week:</p>
      <DatePicker className="border-2 border-black rounded w-[200px] h-[33px] text-center" id="date" selected={startDate} filterDate={(date) => {return date.getDay()===1}}
      onChange={(date) => {
        setStartDate(date);
      }}/>
      <button className="block w-[150px] mx-auto bg-primary rounded p-2 mt-4" onClick={() => {
        Axios({
          method: 'get',
          url: 'multiTimesheets',
          params: {
            date: [
              moment(startDate, 'MM-DD-YYYY').add(0, 'days').format('MM/DD/YYYY'),
              moment(startDate, 'MM-DD-YYYY').add(1, 'days').format('MM/DD/YYYY'),
              moment(startDate, 'MM-DD-YYYY').add(2, 'days').format('MM/DD/YYYY'),
              moment(startDate, 'MM-DD-YYYY').add(3, 'days').format('MM/DD/YYYY'),
              moment(startDate, 'MM-DD-YYYY').add(4, 'days').format('MM/DD/YYYY'),
              moment(startDate, 'MM-DD-YYYY').add(5, 'days').format('MM/DD/YYYY'),
              moment(startDate, 'MM-DD-YYYY').add(6, 'days').format('MM/DD/YYYY'),
            ]
          }
        })
        .then((result) => {
          var sheetToDisplay = {};
          var monday = Date.parse(result.data[0][0].date);
          var empNames = Object.keys(employeeList);
          for (var i = 0; i < empNames.length; i++) {
            sheetToDisplay[empNames[i]] = {};
            sheetToDisplay[empNames[i]].wage = employeeList[empNames[i]];
            var total = 0;
            for (var j = 0; j < result.data.length; j++) {
              sheetToDisplay[empNames[i]][days[j]] = 0;
              for (var k = 0; k < result.data[j].length; k++) {
                if (result.data[j][k].name === empNames[i]) {
                  sheetToDisplay[empNames[i]][days[j]] += result.data[j][k].hours;
                  total += result.data[j][k].hours;
                }
              }
            }
            sheetToDisplay[empNames[i]].hours = total;
            sheetToDisplay[empNames[i]].weekPay = total * employeeList[empNames[i]];
          }
          setSheets(sheetToDisplay);
        })
      }}>Get Timesheet</button>
      <table className="table-fixed w-full my-5">
        <tr>
          <th className="border-2 border-black w-[150px]">Name</th>
          <th className="border-2 border-black w-[60px]">Mon</th>
          <th className="border-2 border-black w-[60px]">Tue</th>
          <th className="border-2 border-black w-[60px]">Wed</th>
          <th className="border-2 border-black w-[60px]">Thu</th>
          <th className="border-2 border-black w-[60px]">Fri</th>
          <th className="border-2 border-black w-[60px]">Sat</th>
          <th className="border-2 border-black w-[60px]">Sun</th>
          <th className="border-2 border-black w-[150px]">Total Hours</th>
          <th className="border-2 border-black w-[90px]">Pay Rate</th>
          <th className="border-2 border-black w-[90px]">Total</th>
        </tr>
      {
        Object.keys(sheets).map((item) => {
          return (<tr>
            <td className="border-2 border-black">{item}</td>
            <td className="border-2 border-black">{sheets[item].Mon}</td>
            <td className="border-2 border-black">{sheets[item].Tue}</td>
            <td className="border-2 border-black">{sheets[item].Wed}</td>
            <td className="border-2 border-black">{sheets[item].Thu}</td>
            <td className="border-2 border-black">{sheets[item].Fri}</td>
            <td className="border-2 border-black">{sheets[item].Sat}</td>
            <td className="border-2 border-black">{sheets[item].Sun}</td>
            <td className="border-2 border-black">{sheets[item].hours}</td>
            <td className="border-2 border-black">{sheets[item].wage}</td>
            <td className="border-2 border-black">{sheets[item].weekPay}</td>
          </tr>)
        })
      }
      </table>
    </div>
  )
}

export default GetTS;