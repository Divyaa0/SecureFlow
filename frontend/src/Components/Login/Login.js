import React, { useRef } from 'react';
import './stylelogin.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import { Toast } from 'primereact/toast';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const urll = 'http://localhost:8000'
var display_name;

const Login = () => {

  localStorage.clear()
  const toast = useRef(null);
  const [InputVal, setInputVal] = useState({
    username: "",
    password: "",
    rememberme: "",
  });
  const [errors, setErrors] = useState({});
  const inputEvent = (event) => {
    setInputVal({ ...InputVal, [event.target.name]: event.target.value });
  };
  const Navigation = useNavigate();
 
//  check url access

  const loginbtn = async (e) => {
    console.log("submit event");
    console.log(InputVal)
    setErrors(formValidate(InputVal));
    console.log("errors are : ", errors)

    if (formValidate(InputVal)) {
      console.log('Form submitted with data:', InputVal);
      await axios.post(`${urll}/login`, InputVal).then((response) => {
        console.log("response of login : ", response);
        if (response.status == 200) {
          // stores the cache of ui urls
          localStorage.setItem('UIroles', JSON.stringify(response.data.role_url_uii))
          // set token
          localStorage.setItem('jwtToken', response.data.tokenVal)
          // set userid
          localStorage.setItem('role_id', response.data.role_id)

          const name = response.data.message.split(" ")
          display_name = name[1];
          toast.current.show({ severity: 'success', summary: 'Login Successful', detail: `Welcome ${display_name}`, life: 8000 });
          localStorage.setItem('display_name', display_name)

          if (response.data.message.includes("Admin")) {

            setTimeout(async () => {
              const token = localStorage.getItem('jwtToken')
              await axios.get(`${urll}/admin-dashboard`, { headers: { 'Authorization': token } }).then(response => {
                console.log("response recieved from token AdminDashboard verification", response);
                if (response.status == 200) {
                  const reqRoleid=response.data.reqRole_id;
                  const reqURL='/Admin/admin-dashboard';
                  console.log("role id to request : ",reqRoleid , "requested url : " ,reqURL)
                  Navigation("/Admin/admin-dashboard");
                   
                }
              })
                .catch(error => {
                  console.error('Error fetching dashboard data:', error);
                });

            }, 1000);
          }
          else {
            setTimeout(async () => {
              console.log("data from user dashboard")
              const token = localStorage.getItem('jwtToken')
              await axios.get(`${urll}/dashboard`, { headers: { 'Authorization': token } }).then(response => {
                console.log("response recieved from user  Dashboard verification", response);
                if (response.status == 200) {
                  Navigation("/dashboard");
                }
              })
                .catch(error => {
                  console.error('Error fetching dashboard data:', error);
                });
            }, 1000);
          }


        }
        else {

          toast.current.show({ severity: 'error', summary: 'Not Found', detail: response.data.message, life: 8000 });
        }
      }).catch((error) => {
        if (error.response) {
          toast.current.show({ severity: 'error', summary: 'User Not Found', detail: '', life: 8000 });
        }
      })


    }
    else {
      console.log('Form has validation errors');
    }

  }
  const formValidate = (inputs) => {
    console.log("form recieved ", inputs)
    let bugs = {};
    if (!inputs.username || inputs.username.length > 25) {
      bugs.username = "Username is Required"
    }
    if (!inputs.password || inputs.password.length < 3) {
      bugs.password = "Password is Required"
    }
    if (inputs.password.length < 3) {
      bugs.password = "Password Length must be greater than 3"
    }
    setErrors(bugs);
    console.log("bugs are ", bugs);
    return Object.keys(bugs).length === 0

    if (Object.keys(bugs).length > 0) 
    {
      // Show toast notifications for each error
      console.log("ahahhaha", Object.keys(bugs).length, "keys", Object.keys(bugs))
      Object.keys(bugs).forEach((key) => {
        console.log("loop keys", key)
        // toast.error(bugs[key]);
      });
      return;
    }
  }

  return (
    <div className='container'>
      <Toast ref={toast} />
      <div className='heading-data'>

        <h2>CRM App</h2>
      </div>
      <div className='form-data'>
        <div className='form-databox'>
          <div className='form-databox-heading'>
            <h2>Welcome Back</h2>
            <h5>Sign in To Continue CRM</h5>
          </div>
          <div className='form-databox-input'>
            <label for="uname">Username</label>
            <input type="text" placeholder="Enter Username" name="username" required
              onChange={inputEvent} value={InputVal.username} />
            {errors.username ? <p className="error-class">{errors.username}</p> : ""}

            <label for="psw">Password</label>
            <input type="password" placeholder="Enter Password" name="password" required
              onChange={inputEvent} value={InputVal.password} />
            {errors.password ? <p className="error-class">{errors.password}</p> : ""}
            <label>
              <input type="checkbox" name="remember" onChange={inputEvent} value={InputVal.rememberme} /> Remember me
            </label>
            <button className="loginbtn" type="submit" onClick={loginbtn}>Login</button>
      

          </div>

        </div>
      </div>
    </div>
  )
}

export default Login;
