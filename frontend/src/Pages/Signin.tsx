import React, { useRef } from 'react'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const usernameRef = useRef<any>("");
    const passwordRef = useRef<any>("");
    const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value; 
        const password = passwordRef.current?.value;
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
                username,
                password
        })
        const jwt = response.data.token;
        localStorage.setItem("token",jwt);
        navigate("/dashboard");  
    }
  return (
    <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
        <div className='bg-white rounded-xl border min-w-48 p-8'>
            <Input placeholder="Username" refrence={usernameRef} />
            <Input placeholder="Password" refrence={passwordRef}/>
            <div className='flex justify-center pt-4'>
            <Button variant="primary" 
            text="Signin" size="md" fullWidth={true} onClick={signin}/>
            </div>
        </div>
    </div> 
  )
}


export default Signin
