import axios from 'axios'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { DataContext } from '../context/Context';

const AuthUser = () => {
    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken ? userToken.access_token : null;
    }

    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (user,token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
    }

    const http = axios.create({
        baseURL:"https://adminpanel.thewhitebd.com/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })

  return {
    http,
    setToken:saveToken,
    token,
    user,
    getToken
  }
}

export default AuthUser