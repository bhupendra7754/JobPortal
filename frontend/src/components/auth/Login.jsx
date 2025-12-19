import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) navigate("/");
    }, [])

    return (
        <div>
            <Navbar />

            <div className='flex items-center justify-center max-w-7xl mx-auto px-4'>
                <form
                    onSubmit={submitHandler}
                    className='w-full sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] border border-gray-200 rounded-md p-4 sm:p-6 my-10'
                >
                    <h1 className='font-bold text-lg sm:text-xl mb-5'>Login</h1>

                    <div className='my-3'>
                        <Label className='text-sm sm:text-base'>Email</Label>
                        <Input
                            className='h-10 sm:h-11'
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                        />
                    </div>

                    <div className='my-3'>
                        <Label className='text-sm sm:text-base'>Password</Label>
                        <Input
                            className='h-10 sm:h-11'
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4 my-5'>
                        <RadioGroup className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                />
                                <Label>Student</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                />
                                <Label>Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {loading ? (
                        <Button className="w-full h-11 sm:h-12 my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full h-11 sm:h-12 my-4">Login</Button>
                    )}

                    <span className='text-sm'>
                        Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login
