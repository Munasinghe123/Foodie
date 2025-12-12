import React from 'react'
import type { RootState } from '../../store/store';
import { useSelector} from 'react-redux';

function AdminDashboard() {

  const{user} = useSelector((state:RootState)=>state.user);

  return (
    <div className='h-screen '>
   
      admin dashboard
      <h1>Welcome {user?.name}</h1>
    </div>
  )
}

export default AdminDashboard;
