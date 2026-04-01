import { useRef } from 'react'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { BACKEND_URL } from '../config'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom'
import { Logo } from '../icons/Logo'
const Signup = () => {
    const usernameRef = useRef<any>("");
    const passwordRef = useRef<any>("");
    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value; 
        const password = passwordRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
                username,
                password
        })
        alert("You have signed up");
        navigate("/signin")
    }
  return (
    <div className='h-screen w-screen bg-gray-200 flex flex-row justify-center items-center'>
        <div className='bg-purple-400 h-screen flex justify-center items-center flex-col w-full '>
            <div className='text-purple-600'><Logo size={10}/></div>
            <h1 className="font-bold text-3xl text-white">Brainly</h1>
            <p className='text-white text-xl mt-1 font-semibold'>Build With ❤️</p>
            <p className='text-white text-xl font-semibold'>By Mohit Parmar Soni</p>
        </div>
        <div className='bg-purple-100 h-screen flex items-center justify-center w-full '>
        <div className='bg-white rounded-xl border min-w-48 p-8'>
            <Input placeholder="Username" refrence={usernameRef}/>
            <Input placeholder="Password"refrence={passwordRef}/>
            <div className='flex justify-center pt-4'>
            <Button variant="primary" 
            text="Signup" size="md" fullWidth={true} onClick={signup} />
            </div>
        </div>
        </div>
    </div> 
  )
}

export default Signup
