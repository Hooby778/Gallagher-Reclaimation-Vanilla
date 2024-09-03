import React from 'react';
import Axios from 'axios';
import AdminContainer from './admin-components/AdminContainer.jsx'

const Admin = ( { handlePageChange } ) => {
  const [activeForm, setActiveForm] = React.useState('');

  return (
    <div className="mx-auto w-1/2 min-w-[410px] text-center">
      <button className="mb-[20px] block w-[150px] mx-auto bg-secondary rounded p-2 mt-4 text-white" onClick={() => {
        handlePageChange('home');
      }}>Home</button>
      <fieldset id="adminRadio" onChange={() => {
        var eleList = document.getElementsByName('admin');
        for (var i = 0; i < eleList.length; i++) {
          if (eleList[i].checked) {
            setActiveForm(eleList[i].value);
            break;
          }
        }
      }}>
        <div>
          <input type="radio" name="admin" id="addEmp" value="addEmp" />
          <label className="text-xl ml-[5px]" for="addEmp">Add Employee</label>
        </div>
        <div>
          <input type="radio" name="admin" id="delEmp" value="delEmp" />
          <label className="text-xl ml-[5px]" for="delEmp">Remove Employee</label>
        </div>
        <div>
          <input type="radio" name="admin" id="addJob" value="addJob" />
          <label className="text-xl ml-[5px]" for="JobEmp">Add Job</label>
        </div>
        <div>
          <input type="radio" name="admin" id="delJob" value="delJob" />
          <label className="text-xl ml-[5px]" for="delJob">Remove Job</label>
        </div>
        <div>
          <input type="radio" name="admin" id="getTime" value="getTime" />
          <label className="text-xl ml-[5px]" for="getTime">Retrieve Timesheet</label>
        </div>
      </fieldset>
      <AdminContainer page={activeForm}/>
    </div>
  )
}

export default Admin;