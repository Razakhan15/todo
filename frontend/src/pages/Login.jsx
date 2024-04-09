import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import MainLayout from '../layouts/MainLayout'

const Login = () => {
  const { state } = useLocation();
  const redirectUrl = state?.redirectUrl || null;
  console.log(redirectUrl)

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <MainLayout>
        <LoginForm />
      </MainLayout>
    </>
  )
}

export default Login