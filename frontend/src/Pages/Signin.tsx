import  { useRef, useState } from 'react'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../icons/Logo';
import Loader from '../components/Loader';
import LogOutIcon from '../icons/LogOutIcon';

const Signin = () => {
    const [loading , setLoading] = useState(false);
    const [error, setError] = useState("");
   const usernameRef = useRef<any>("");
    const passwordRef = useRef<any>("");
    const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value; 
        const password = passwordRef.current?.value;
        try{
            setLoading(true);  
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
                username,
                password
            })
            const jwt = response.data.token;
            localStorage.setItem("token",jwt);
            navigate("/dashboard");
        }catch(err:any){
            setError(err.response?.data?.message || "Invalid credentials");
        }finally{
            setLoading(false);
        }
    }
  return (
    <div className='min-h-screen bg-gray-200 flex flex-row justify-center items-center'>
            <div className='bg-[#5046e4] h-screen hidden md:flex justify-center items-center flex-col w-full '>
                <div className='text-white'><Logo size="20" /></div>
                <h1 className="font-bold text-6xl text-white">Brainly</h1>
                <p className='text-white text-2xl mt-1 '>Build With ❤️</p>
                <p className='text-white text-2xl '>By Mohit Parmar Soni</p>
            </div>
            <div className='bg-blue-100 h-screen flex flex-col gap-2 items-center justify-center w-full '>
            <div className='bg-white rounded-sm border border-blue-300 shadow-2xl min-w-48 p-8'>
                <div className='md:hidden flex flex-row gap-2 items-center justify-center'>
                    <div className='text-blue-700'><Logo size={6}/></div>
                    <div className='text-2xl font-bold '>Brainly</div>
                </div>
                <div className='p-6'>
                <h1 className='text-2xl items-center font-semibold text-center'>Login Account</h1>
                <p className='text-gray-500 text-center font-extralight'>Sign in to continue Brainly</p>
                </div>
                <Input placeholder="Username" refrence={usernameRef}/>
                <Input placeholder="Password"refrence={passwordRef}/>
                {error && <span className='text-red-500 font-extralight ml-1.5'>{error}</span>}
                <div className='flex justify-center pt-4'>
                    {loading?<Loader/>:<Button variant="primary" 
                    text="Signin" size="md" fullWidth={true} onClick={signin} />}
                </div>
                <div className='flex gap-1 p-2'>
                    <p className='text-gray-400 '>Create a new account </p>
                    <Link to="/signup" className='text-purple-400 font-semibold'>Signup</Link>
                </div>
            </div>
            </div>
        </div> 
  )
}


export default Signin
