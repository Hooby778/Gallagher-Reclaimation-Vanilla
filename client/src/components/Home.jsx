import React from 'react';

const Home = () => {
  var employeeList = [
    {
      'first_name': 'John',
      'last_name': 'Smith',
      'pay': 20
    },
    {
      'first_name': 'Jane',
      'last_name': 'Doe',
      'pay': 20.50
    }
  ];
  return (
  <div className="">
    <p>Name:</p>
    <input list="empNameList" name="empNames" />
    <datalist id="empNameList">
      {
        employeeList.map((item) => {
          return <option value={item.first_name + ' ' + item.last_name}></option>
        })
      }
    </datalist>
    <p>Date:</p>
    <p>Job Name:</p>
    <select>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
    </select>
    <p>Classification:</p>
    <select>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
    </select>
    <button>Submit</button>
    <button>Admin</button>
  </div>
  )
}

export default Home;