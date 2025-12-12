import React from 'react'

import { useLocation } from 'react-router-dom'

function Success() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const restaurantId = queryParams.get('restaurantId');
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      Payment success
      Thank you for registering your restaurant! Your restaurant ID is: {restaurantId}
    </div>
  )
}

export default Success
