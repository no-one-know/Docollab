import React from 'react';
import { useLocation } from 'react-router-dom';

export const User = () => {
  const location = useLocation(); 
  const userData = location.state; 
  console.log(userData)
  return (
    <div>
      <h1>User Page</h1>
      <ul>Email: {userData.userDetails.email}</ul>
      <ul>Name: {userData.userDetails.name}</ul>
      <ul><img src={userData.userDetails.picture}></img></ul>
    </div>
  );
};
