import { useRef, useState } from 'react'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { BACKEND_URL } from '../config'
import axios from 'axios' 
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../icons/Logo'
const Signup = () => {
    const [warning , setWarning]= useState(false);
    const usernameRef = useRef<any>("");
    const passwordRef = useRef<any>("");
    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value; 
        const password = passwordRef.current?.value;
        try{
            await axios.post(`${BACKEND_URL}/api/v1/signup`,{
                username,
                password
            })
            alert("You have signed up");
            navigate("/signin")
        }catch(err){
            setWarning(true);
        }
    }
  return (
    <div className='h-screen w-screen bg-gray-200 flex flex-row justify-center items-center transition-all'>
        <div className='bg-[#5046e4] h-screen flex justify-center items-center flex-col w-full '>
            <div className='text-white'><Logo si={20}/></div>
            <h1 className="font-bold text-6xl text-white">Brainly</h1>
            <p className='text-white text-2xl mt-1 '>Build With ❤️</p>
            <p className='text-white text-2xl '>By Mohit Parmar Soni</p>
        </div>
        <div className='bg-blue-100 h-screen flex items-center justify-center w-full '>
        <div className='bg-white rounded-sm border border-blue-300 shadow-2xl min-w-48 p-8'>
            <div className='p-6'>
            <h1 className='text-2xl items-center font-semibold text-center'>Create an Account</h1>
            <p className='text-gray-500 text-center font-extralight'>Sign up to continue Brainly</p>
            </div>
            <Input placeholder="Username" refrence={usernameRef}/>
            <Input placeholder="Password"refrence={passwordRef}/>
            {warning?<span className='text-red-500 font-extralight ml-1.5'>Username already exist</span>:""}
            <div className='flex justify-center pt-4'>
            <Button variant="primary" 
            text="Signup" size="md" fullWidth={true} onClick={signup} />
            </div>
            <div className='flex gap-1 p-2'>
                <p className='text-gray-400 '>Already have an account?</p>
                <Link to="/signin" className='text-purple-400 font-semibold'>Login</Link>
            </div>
        </div>
        </div>
    </div> 
  )
}

export default Signup
