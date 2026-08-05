import React, { useContext } from 'react'
import bg from '../assets/library-bg.jpg'
import logo from '../assets/library_logo.png'
import { Link, useNavigate } from 'react-router'
import AuthContext from '../Context/AuthContext'
import toast from 'react-hot-toast'

const Register = () => {
    const { createUser, signInWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const ID = form.ID.value;
        const password = form.password.value;
        const firstName = form.first_name.value;
        const lastName = form.last_name.value;
        const photoUrl = form.photoUrl.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password must be at least 6 characters with uppercase and lowercase letters!");
            return;
        }

        console.log("Password is valid ✅");
        createUser(email, password)
            .then(result => {
                toast.success('Your Login successful!', {
                    className: 'bg-green-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg',
                });

                navigate('/')
            })
            .catch(err => {
                toast.error(err.message)
            })

        console.table([email, ID, password, firstName, lastName, photoUrl])


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
                console.log(err.message)
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
                            <div className="pt-10 flex flex-col items-center gap-4">

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
                                    Create a new account
                                </h2>
                            </div>

                        </div>

                        <form onSubmit={handleSubmit}>
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
                                            <label className="label">Student ID</label>
                                            <span className="text-red-500">*</span>
                                        </div>
                                        <input
                                            type="text"
                                            name='ID'
                                            className="input input-bordered"
                                            placeholder="Student ID"
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

                                        <p className="text-xs text-gray-500">
                                            The password must have at least 8 characters,
                                            1 digit, 1 lowercase, 1 uppercase &
                                            1 special character.
                                        </p>

                                        <div className='flex flex-row gap-2 items-center'>
                                            <label className="label">First name</label>
                                            <span className="text-red-500">*</span>
                                        </div>
                                        <input
                                            type="text"
                                            name='first_name'
                                            className="input input-bordered"
                                            placeholder="First name"
                                        />
                                        <div className='flex flex-row gap-2 items-center'>
                                            <label className="label">Last name</label>
                                            <span className="text-red-500">*</span>
                                        </div>
                                        <input
                                            type="text"
                                            name='last_name'
                                            className="input input-bordered"
                                            placeholder="Last name"
                                        />

                                        <label className="label">Photo URL</label>
                                        <input
                                            type="text"
                                            name='photoUrl'
                                            className="input input-bordered"
                                            placeholder="Photo URL"
                                        />

                                        <div>
                                            <a className="link link-hover">Forgot password?</a>
                                        </div>

                                        {/* BUTTONS */}
                                        <div className="flex flex-row gap-2 justify-between mt-4">
                                            <button className="btn text-white bg-[#0051f9] ">
                                                Create my account
                                            </button>

                                            <Link
                                                to="/"
                                                className="btn bg-white border-2 border-[#0051f9] text-[#0051f9] "
                                            >
                                                Cancel
                                            </Link>
                                        </div>

                                        <p className='text-[16px] text-right mt-6' > <span className='text-red-500 text-center'>*</span><span className='pl-4'>Required</span></p>


                                    </fieldset>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register
