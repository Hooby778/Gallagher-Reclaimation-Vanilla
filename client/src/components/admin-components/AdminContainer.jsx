import React from 'react';
import AddEmp from './AddEmp.jsx';
import DelEmp from './DelEmp.jsx';
import AddJob from './AddJob.jsx';
import DelJob from './DelJob.jsx';
import GetTime from './GetTime.jsx';

const AdminContainer = ( { page } ) => {
  if (page === 'addEmp') {
    return (<div>
      <AddEmp />
    </div>)
  } else if (page === 'delEmp') {
    return (<div>
      <DelEmp />
    </div>)
  } else if (page === 'addJob') {
    return (<div>
      <AddJob />
    </div>)
  } else if (page === 'delJob') {
    return (<div>
      <DelJob />
    </div>)
  } else if (page === 'getTime') {
    return (<div>
      <GetTime />
    </div>)
  }
}

export default AdminContainer;