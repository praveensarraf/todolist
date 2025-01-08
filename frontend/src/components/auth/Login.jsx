import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Footer from '../shared/Footer'


const Login = () => {

    const [input, setInput] = useState({
        username: "",
        password: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/")
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, []);


    return (
        <>
            <main className='flex flex-col min-h-screen'>
                <nav>
                    <Navbar />
                </nav>

                <section className='flex-1'>
                    <div className='flex items-center justify-center max-w-2xl mx-auto'>
                        <form onSubmit={submitHandler} onKeyDown={(e) => { if (e.key === 'Enter') { submitHandler(e); } }} className='bg-[#f2f2f2] w-full mx-2 border border-gray-400 rounded shadow shadow-white p-4 my-10'>
                            <h1 className='font-bold text-2xl text-center underline text-gray-600 mb-5'>Login</h1>

                            <div className='my-2'>
                                <Label>Username<span className='text-red-500'>*</span></Label>
                                <Input type="text" value={input.username} name="username" onChange={changeEventHandler} placeholder="Enter your registered username" className='mt-1 focus-visible:ring-2' />
                            </div>

                            <div className='my-2'>
                                <Label>Password<span className='text-red-500'>*</span></Label>
                                <div className='flex items-center mt-1'>
                                    <Input type={showPassword ? 'text' : 'password'} value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter your password" className='focus-visible:ring-2' />
                                    <span onClick={togglePassword} className='-ml-[30px] cursor-pointer'>{showPassword ? <EyeOff /> : <Eye />}</span>
                                </div>
                            </div>

                            {
                                loading ? (
                                    <Button type='button' className='w-full my-4 opacity-90 cursor-not-allowed'><Loader2 className='h-4 w-4 animate-spin' />Please wait</Button>
                                ) : (
                                    <Button type='submit' className='w-full my-4'>Login</Button>
                                )
                            }



                            <div className='flex justify-center'>
                                <p>Don't have an account?</p> &nbsp;
                                <Link to="/register" className='text-gray-600 font-bold hover:text-gray-800 hover:underline'>
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>
                </section>

                <footer>
                    <Footer/>
                </footer>
            </main>
        </>
    )
}

export default Login
