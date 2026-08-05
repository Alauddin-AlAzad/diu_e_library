import React, { useContext } from "react"
import logo from "../assets/Library_logo.png"
import { Menu, X, Bell, MessageCircle, Sun, User, Settings, LogOut } from "lucide-react"
import { Link } from "react-router"
import AuthContext from "../Context/AuthContext"

const Navbar = () => {
    const { user,  signOutUser } = useContext(AuthContext)

    const handleSignOut=()=>{
          signOutUser()
        .then(result=>{
            console.log('Sign out succesfully',result)
        })
        .catch(err=>{
            console.log(err.message)
        })
    }
    const links = <>
        <Link to='/' className="hover:text-primary cursor-pointer">Home</Link>
        <Link to='/allbook' className="hover:text-primary cursor-pointer">All Book</Link>
        <Link to='/addbook' className="hover:text-primary cursor-pointer"> Add Books</Link>
        <Link to='/browwedbook' className="hover:text-primary cursor-pointer">Borrowed Book</Link>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm px-4  sticky top-0 z-50">

            {/* ================= MOBILE DRAWER ================= */}
            <div className="drawer md:hidden">
                <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

                {/* Hamburger icon */}
                <div className="drawer-content">
                    <label htmlFor="mobile-drawer" className="btn btn-ghost btn-circle">
                        <Menu />
                    </label>
                </div>

                {/* Drawer sidebar */}
                <div className="drawer-side z-50">
                    <label htmlFor="mobile-drawer" className="drawer-overlay"></label>

                    {/* Sidebar content (80%) */}
                    <div className="w-[70%] min-h-full bg-white p-4">

                        {/* Top: Logo + Close */}
                        <div className="flex items-center justify-between mb-6">
                            <img src={logo} alt="logo" className="h-10 object-contain" />
                            <label htmlFor="mobile-drawer" className="btn btn-ghost btn-circle">
                                <X />
                            </label>
                        </div>

                        {/* Menu */}
                        <ul className="menu w-full text-base font-medium gap-1">
                            {links}
                        </ul>
                    </div>
                </div>
            </div>

            {/* DESKTOP LEFT */}
            <div className="hidden md:flex items-center gap-6 flex-1">
                <img src={logo} alt="logo" className="lg:w-40 lg:h-12 md:w-20 md:h-6 object-contain" />

                <ul className="flex md:text-[10px] lg:text-[14px] gap-4 font-medium">
                    {links}
                </ul>
            </div>

            {/*  RIGHT SECTION */}
            <div className="flex items-center gap-1">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-20 sm:w-30 md:w-48"
                />

                {/* Notification */}
                <Link className="btn btn-ghost btn-circle">
                    <Bell size={20} />
                </Link>

                {/* Chat */}
                <Link className="btn btn-ghost btn-circle">
                    <MessageCircle size={20} />
                </Link>

                {/* Profile */}
                <div className="dropdown dropdown-end gap-2  ">


                    {
                        user ? <>
                            <div className="dropdown dropdown-end gap-2  ">
                                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoUrl} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 w-52 bg-base-100 rounded-box shadow"
                                >
                                    <Link>
                                        <button className="flex items-center py-3 ">
                                            <User size={18} />
                                            Profile
                                        </button>
                                    </Link>

                                    <Link>
                                        <button className="flex items-center py-3 ">
                                            <Settings size={18} />
                                            Settings
                                        </button>
                                    </Link>

                                    <Link >
                                        <button onClick={handleSignOut} className="flex items-center  text-red-500">
                                            <LogOut size={18} />
                                            Logout
                                        </button>
                                    </Link>

                                </ul>
                            </div>

                        </> : <>
                            <div className="flex flex-row gap-2 ">
                                <Link className="btn bg-white border border-[#0051f9] text-[#0051f9]" to='/login'>Login</Link>
                                <Link to='/register' > <button className="btn hidden lg:block text-center bg-white border border-[#0051f9] text-[#0051f9] " to='/register'>
                                    Register
                                </button></Link>
                            </div>
                        </>
                    }


                </div>

                {/* Dark / Linkght */}
                <Link className="btn btn-ghost btn-circle">
                    <Sun size={20} />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
