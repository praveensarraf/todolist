import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarImage } from "../ui/avatar"
import { LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';



const Navbar = () => {

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <div className='bg-[#f2f2f2] py-2'>
                <div className='flex sm:flex-row flex-col items-center sm:justify-between gap-3'>
                    <Link to='/'>
                        <h1 className='text-xl text-black font-bold sm:ml-5'>To-do-List</h1>
                    </Link>

                    <div className='flex items-center justify-end sm:w-fit w-full'>
                        {
                            !user ? (
                                <div className='flex items-center justify-center w-full gap-2 sm:mr-10'>
                                    <Link to='/login'><Button variant='outline' className='rounded-full p-5 bg-transparent border-2 border-black text-black font-bold hover:bg-white'>Login</Button></Link>
                                    <Link to='/register'><Button className='rounded-full p-5 border-2 border-black'>Sign Up</Button></Link>
                                </div>
                            ) : (
                                <div className='mr-10'>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Avatar className='cursor-pointer'>
                                                <AvatarImage src='https://picsum.photos/200' alt={`${user?.fullName}'s Photo`} />
                                            </Avatar>
                                        </PopoverTrigger>

                                        <PopoverContent className='w-80 bg-gray-800 text-white mr-2'>
                                            <div className='flex items-center gap-2'>
                                                <Avatar className='cursor-pointer'>
                                                    <AvatarImage src='https://picsum.photos/200' alt={`${user?.fullName}'s Photo`} />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user?.fullName}</h4>
                                                </div>
                                            </div>

                                            <div className='flex flex-col m-2'>
                                                <div className='flex w-fit items-center cursor-pointer'>
                                                    <LogOut />
                                                    <Button variant="link" onClick={logoutHandler} className='text-white'>Log Out</Button>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            )
                        }
                    </div>
                </div >
            </div >
        </>
    )
}

export default Navbar