import React, { useContext } from 'react';
import logo from '../assets/library_logo.png'
import bg from '../assets/library-bg.jpg'
import { Link, useNavigate } from 'react-router';
import AuthContext from '../Context/AuthContext';
import toast from 'react-hot-toast';
const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext)
    const navigate=useNavigate()
    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        signInUser(email, password)
            .then(result => {
                 toast.success('Your Login successful!', {
                    className: 'bg-green-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg',
                });
                navigate('/')
            })
            .catch(err => {
              toast.error(err.message)
            })
    }
    const handleSignWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                toast.success('Your Login successful!', {
                    className: 'bg-green-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg',
                });
                navigate('/')

            })
            .catch(err => {
            toast.error(err.message)
            })
    }
    return (

        <div>
            {/* BACKGROUND WRAPPER */}
            <div
                className="
          min-h-screen bg-center bg-no-repeat bg-cover px-5 py-8  md:px-0 md:py-0 flex md:justify-end  "
                style={{ backgroundImage: `url(${bg})` }}
            >
                <div className="  w-full bg-white md:w-[20%] min-h-screen lg:w-[20%]" >
                    <div className="flex flex-col">

                        <div className="flex flex-col pt-10 pl-6">
                            <img className="h-6 w-16" src={logo} alt="logo" />
                            <div className="pt-10">
                                <h2 className="text-[24px] text-[#2f3847] font-bold text-center">

                                    Hi, Welcome to DIU Library Management Portal
                                </h2>
                                <div className="py-10 flex flex-col items-center gap-4">

                                    {/* Google Button */}
                                    <button onClick={handleSignWithGoogle} className="flex items-center gap-3 border border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-50 transition">
                                        <img
                                            src="https://developers.google.com/identity/images/g-logo.png"
                                            alt="Google"
                                            className="w-5 h-5"
                                        />
                                        <span className="font-medium text-gray-700">
                                            Continue with Google
                                        </span>
                                    </button>

                                    {/* OR Divider */}
                                    <div className="flex items-center w-full max-w-xs gap-3">
                                        <div className="flex-grow h-px bg-gray-300"></div>
                                        <span className="text-sm text-gray-500">or</span>
                                        <div className="flex-grow h-px bg-gray-300"></div>
                                    </div>

                                    {/* Create Account Text */}
                                    <h2 className="text-[22px] font-bold text-center">
                                        Enter your details to log in your account
                                    </h2>
                                </div>

                            </div>
                        </div>


                        <form onSubmit={handleSignIn}>
                            <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-2xl">
                                <div className="card-body">
                                    <fieldset className="fieldset">

                                        <div className='flex flex-row gap-2 items-center'>
                                            <label className="label">Email</label>
                                            <span className="text-red-500">*</span>
                                        </div>
                                        <input
                                            type="email"
                                            name='email'
                                            className="input input-bordered"
                                            placeholder="Email"
                                        />


                                        <div className='flex flex-row gap-2 items-center'>
                                            <label className="label">Password</label>
                                            <span className="text-red-500">*</span>
                                        </div>
                                        <input
                                            type="password"
                                            name='password'
                                            className="input input-bordered"
                                            placeholder="Password"
                                        />

                                        <div className='justify-end w-full flex mt-4'>
                                            <a className="link text-[#0051f9]  link-hover">Forgot password?</a>
                                        </div>
                                        {/* BUTTONS */}
                                        <div className="flex mt-4">
                                            <button className="btn w-full text-white bg-[#0051f9] ">
                                                Login
                                            </button>
                                        </div>
                                        <div className='flex flex-col mt-6 w-full'>
                                            <p className='text-[14px] text-[#4c5a73]'>First time using this site</p>
                                            <h3 className='text-[16px] text-[#4c5a73] mt-2 mb-1'>For full access to this site, you first need to create an account.</h3>
                                            <div className='' >
                                                <button className='btn w-full bg-white border border-[#0051f9] text-[#0051f9]'><Link to='/register'>Create new Account</Link></button>
                                            </div>
                                        </div>

                                    </fieldset>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;