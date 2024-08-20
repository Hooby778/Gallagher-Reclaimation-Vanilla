import React from 'react';
import Axios from 'axios';
import AdminContainer from './admin-components/AdminContainer.jsx'

const Admin = ( { handlePageChange } ) => {
  const [activeForm, setActiveForm] = React.useState('');

  return (
    <div>
      <button onClick={() => {
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
          <label for="addEmp">Add Employee</label>
        </div>
        <div>
          <input type="radio" name="admin" id="delEmp" value="delEmp" />
          <label for="delEmp">Remove Employee</label>
        </div>
        <div>
          <input type="radio" name="admin" id="addJob" value="addJob" />
          <label for="JobEmp">Add Job</label>
        </div>
        <div>
          <input type="radio" name="admin" id="delJob" value="delJob" />
          <label for="delJob">Remove Job</label>
        </div>
        <div>
          <input type="radio" name="admin" id="getTime" value="getTime" />
          <label for="getTime">Retrieve Timesheet</label>
        </div>
      </fieldset>
      <AdminContainer page={activeForm}/>
    </div>
  )
}

export default Admin;