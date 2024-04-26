import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo, Spinner } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center mx-4 h-screen" >
            <div className={`mx-auto w-full max-w-lg dark:bg-slate-900 dark:text-stone-100 text-stone-800 border-[2px] border-stone-600 bg-stone-100  rounded-xl p-10 `}>
                <div className=" flex justify-center">
                    <h1 className="text-3xl font-bold mb-4 text-center"><Logo
                        text='chaiXblog'
                    /></h1>
                </div>
                <h2 className="text-center pb-4 text-2xl font-bold leading-tight dark:text-stone-100 text-stone-900">Sign up to create account</h2>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            disable={isSubmitting ? "true" : 'false'}
                            className='border-[2px] border-stone-600'
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            disable={isSubmitting ? "true" : 'false'}
                            className='border-[2px] border-stone-600'
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
                            disable={isSubmitting ? "true" : 'false'}
                            className='border-[2px] border-stone-600'
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full mt-8 flex items-center justify-center"
                        >{isSubmitting ? <Spinner /> : 'Register'}</Button>

                        <p className="mt-8 text-center text-base text-black/60 dark:text-cyan-100">
                             allready have a account?&nbsp;
                            <Link
                                to="/login"
                                className="font-medium text-primary transition-all duration-200 hover:underline dark:text-blue-400"
                            >
                                login
                            </Link>
                        </p>
                    </div>

                </form>
            </div>

        </div>


    )
}

export default Signup