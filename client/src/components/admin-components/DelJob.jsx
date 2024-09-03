import React from 'react';
import Axios from 'axios';

const DelJob = () => {
  const [jobList, setJobList] = React.useState(null);
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
    .catch((err) => {
      window.alert('error fetching jobs');
    })
  }, [])
  if (jobList) {
  return (<div>
      <p className="font-bold text-xl my-[10px]">Name:</p>
      <input className="border-2 border-black rounded w-[200px] h-[33px] text-center" list="jobNameList" name="jobNames" id="nameForm"/>
        <datalist id="jobNameList">
          {
            Object.keys(jobList).map((item) => {
              return <option value={item}></option>
            })
          }
        </datalist>
      <button className="block w-[150px] mx-auto bg-primary rounded p-2 mt-4" onClick={() => {
        Axios({
          method: 'delete',
          url: '/jobname',
          data: {
            name: document.getElementById('nameForm').value
          }
        })
        .then(() => {
          window.alert('Job Deleted');
        })
        .catch(() => {
          window.alert('Job Not Found');
        })
      }}>Delete</button>
    </div>)
  }
}

export default DelJob;