import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../store/user';

interface Props{
    // canNavigate: boolean
}
const ProtectedRoute: React.FC<Props> = () => {
  const user = localStorage.getItem("user");

  if(user === null){
    return <Navigate to="/login"/>
  }
  return <Outlet></Outlet>
};

export default ProtectedRoute