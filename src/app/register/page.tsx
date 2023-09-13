"use client"

import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import Loading from '../components/loading'



export default function Register() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter()
    interface Inputs {
        email: string
        password: string
    }
    const { signup, currentUser } = useAuth()

    if (currentUser != undefined) {
        router.push('/')
    }

    useEffect(()=>{
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      }, [])


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        criteriaMode: "all",
    })


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (data: Inputs) => {
        setError('')
        setLoading(true)
        const response = await signup(data.email, data.password)
        if (!response.user) {
            setError(JSON.parse(response).message)
            setLoading(false)
        }
    }

    return (
        <div>
            {!loading && (<main className="h-screen">
            <div className="w-full h-2/6 overflow-hidden">
                <Image
                    src="/assets/images/bg_liquid.png"
                    alt="Vercel Logo"
                    className="w-full"
                    width={1280}
                    height={120}
                />
            </div>

            <div className="flex justify-center -mt-36 -mt-lg-28 p-3 p-lg-0">
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 w-[552px] bg-white rounded-md shadow-md py-6">
                    <h2 className="text-center text-[32px] font-normal capitalize">create account</h2>
                    {(error && <p className="text-white text-sm p-2 bg-danger-800 capitalize rounded">{error}</p>)}

                    <div className="my-4">
                        <label htmlFor="email" className="font-normal">Email</label>
                        <input type="text" {...register("email", { required: "This is required.", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "This input should be email.", } })} className="w-full p-3 border border-light-gray rounded-md mt-3" id="email" placeholder="Enter your email" />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => <p className="text-danger-800 text-sm">{message}</p>}
                        />
                    </div>


                    <div className="my-4">
                        <label htmlFor="password" className="font-normal">Password</label>
                        <div className="relative">
                            <input type={showPassword ? 'text' : 'password'} {...register("password", { required: "Password field is required." })} className="w-full p-3 border border-light-gray rounded-md mt-3" id="password" placeholder="Enter your password" />
                            <div onClick={togglePasswordVisibility} className="absolute bottom-4 right-4 cursor-pointer">
                                {(!showPassword) && (<svg className="w-4 h-4" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5 6C10.5 6.66304 10.2366 7.29893 9.76777 7.76777C9.29893 8.23661 8.66304 8.5 8 8.5C7.33696 8.5 6.70107 8.23661 6.23223 7.76777C5.76339 7.29893 5.5 6.66304 5.5 6C5.5 5.33696 5.76339 4.70107 6.23223 4.23223C6.70107 3.76339 7.33696 3.5 8 3.5C8.66304 3.5 9.29893 3.76339 9.76777 4.23223C10.2366 4.70107 10.5 5.33696 10.5 6Z" fill="#E0E0E0" />
                                    <path d="M0 6C0 6 3 0.5 8 0.5C13 0.5 16 6 16 6C16 6 13 11.5 8 11.5C3 11.5 0 6 0 6ZM8 9.5C8.92826 9.5 9.8185 9.13125 10.4749 8.47487C11.1313 7.8185 11.5 6.92826 11.5 6C11.5 5.07174 11.1313 4.1815 10.4749 3.52513C9.8185 2.86875 8.92826 2.5 8 2.5C7.07174 2.5 6.1815 2.86875 5.52513 3.52513C4.86875 4.1815 4.5 5.07174 4.5 6C4.5 6.92826 4.86875 7.8185 5.52513 8.47487C6.1815 9.13125 7.07174 9.5 8 9.5Z" fill="#E0E0E0" />
                                </svg>)}

                                {(showPassword) && (<svg width="17" className="w-4 h-4" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.03342 1.25L15.5334 14.75L2.03342 1.25Z" fill="#E0E0E0" />
                                    <path d="M2.03342 1.25L15.5334 14.75" stroke="#E0E0E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.83341 3.6725C3.50341 3.92 3.20116 4.181 2.92591 4.4465C2.00653 5.33915 1.24546 6.38147 0.675155 7.529C0.603853 7.67564 0.566803 7.83657 0.566803 7.99963C0.566803 8.16268 0.603853 8.32361 0.675155 8.47025C1.24516 9.61799 2.00598 10.6606 2.92516 11.5535C4.23841 12.8172 6.17191 14 8.78341 14C10.4604 14 11.8584 13.5125 12.9909 12.8285L10.0329 9.87125C9.60009 10.1604 9.08043 10.2905 8.56244 10.2394C8.04446 10.1884 7.5602 9.9593 7.19215 9.59125C6.82411 9.22321 6.59505 8.73895 6.54399 8.22096C6.49294 7.70298 6.62305 7.18332 6.91216 6.7505L3.83416 3.67175L3.83341 3.6725ZM15.2829 10.8785C15.9202 10.1483 16.4609 9.3392 16.8917 8.471C16.963 8.32436 17 8.16343 17 8.00037C17 7.83732 16.963 7.67639 16.8917 7.52975C16.3217 6.382 15.5609 5.33942 14.6417 4.4465C13.3284 3.18275 11.3957 2 8.78341 2C8.07252 1.9982 7.36447 2.08973 6.67741 2.27225L15.2829 10.8785Z" fill="#E0E0E0" />
                                </svg>
                                )}
                            </div>
                        </div>
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <p className="text-danger-800 text-sm" key={type}>{message}</p>
                                ))
                            }
                        />
                    </div>

                    <div className="my-6">
                        <button type="submit" className="p-3 bg-primary text-white capitalize text-center rounded-md w-full">create account</button>
                    </div>
                    <p className="text-center">Already have an accont? <Link href='login' className="text-primary capitalize underline">login</Link></p>
                </form>
            </div>
        </main>)}
        {(loading) && <Loading/>}  
        </div>
    )
}
