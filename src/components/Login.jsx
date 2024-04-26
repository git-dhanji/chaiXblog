import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo,Spinner } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: {  isSubmitting}} = useForm();
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        /*  <div
         className='flex items-center justify-center w-full my-4'
         >
             <div className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/10`}>
             <div className="mb-2 flex justify-center">
                         <span className="inline-block w-full max-w-[100px]">
                             <Logo width="100%" />
                         </span>
             </div>
             <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
             <p className="mt-2 text-center text-base text-black/60">
                         Don&apos;t have any account?&nbsp;
                         <Link
                             to="/signup"
                             className="font-medium text-primary transition-all duration-200 hover:underline"
                         >
                             Sign Up
                         </Link>
             </p>
             {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
             <form onSubmit={handleSubmit(login)} className='mt-8'>
                 <div className='space-y-5'>
                     <Input
                     label="Email: "
                     placeholder="Enter your email"
                     type="email"
                     {...register("email", {
                         required: true,
                         validate: {
                             matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                             "Email address must be a valid address",
                         }
                     })}
                     />
                     <Input
                     label="Password: "
                     type="password"
                     placeholder="Enter your password"
                     {...register("password", {
                         required: true,
                     })}
                     />
                     <Button
                     type="submit"
                     className="w-full"
                     >Sign in</Button>
                 </div>
             </form>
             </div>
         </div> */



        <div className="bg-cover bg-center bg-fixed relative" style={{ backgroundImage: `url('https://picsum.photos/1920/1080')` }}>
            <div className="h-screen flex justify-center items-center">
                <div className="dark:bg-slate-900 dark:text-stone-100 text-stone-800 border-[2px] border-stone-600 bg-stone-100 mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
                    <h1 className="text-3xl font-bold mb-8 text-center"><Logo
                        text='chaiXblog'
                    /></h1>
                    {error && <p className="dark:text-red-400 text-red-700 mt-4 text-center py-4">{error}</p>}
                    <form onSubmit={handleSubmit(login)} className='mt-8'>
                        <div className='space-y-5'>
                            <Input
                                label="Email "
                                placeholder="Enter your email"
                                type="email"
                                className='border-[2px] border-stone-600'
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                            />
                            <Input
                                label="Password "
                                type="password"
                                placeholder="Enter your password"
                                className='border-[2px] border-stone-600'
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            <Button
                                type="submit"
                                className="w-full mt-8 flex items-center justify-center"
                            >{isSubmitting ? <Spinner/> : 'Login'}</Button>
                            <p className="mt-2 text-center text-base text-black/60 dark:text-cyan-100">
                                Don&apos;t have any account?&nbsp;
                                <Link
                                    to="/signup"
                                    className="font-medium text-primary transition-all duration-200 hover:underline dark:text-blue-400"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login