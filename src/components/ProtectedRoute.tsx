import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props{
    canNavigate: boolean
}
const ProtectedRoute: React.FC<Props> = ({canNavigate}) => {
  if(!canNavigate){
    return <Navigate to="/login"/>
  }
  return <Outlet></Outlet>
};

export default ProtectedRoute