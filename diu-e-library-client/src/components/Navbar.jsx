import React, { useContext, useState } from "react"
import logo from "../assets/Library_logo.png"
import { Menu, X, Sun, User, Settings, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import AuthContext from "../Context/AuthContext"

const Navbar = () => {
    const { user, signOutUser, logOut } = useContext(AuthContext)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const logoutAction = signOutUser || logOut

    const handleSignOut = () => {
        logoutAction()
            .then(result => {
                console.log('Sign out successfully', result)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const closeDrawer = () => setIsDrawerOpen(false)

    const links = (
        <>
            <li><Link to='/' onClick={closeDrawer} className="hover:text-primary">Home</Link></li>
            <li><Link to='/allbook' onClick={closeDrawer} className="hover:text-primary">All Books</Link></li>
            <li><Link to='/addbook' onClick={closeDrawer} className="hover:text-primary">Add Book</Link></li>
            <li><Link to='/browwedbook' onClick={closeDrawer} className="hover:text-primary">Borrowed Books</Link></li>
        </>
    )

    return (
        <header className="sticky top-0 z-50 bg-base-100 shadow-sm">
            <div className="navbar max-w-7xl mx-auto px-3 sm:px-6 flex justify-between items-center">
                
                {/* LEFT: Mobile Hamburger + Brand Logo */}
                <div className="flex items-center gap-2">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="btn btn-ghost btn-circle md:hidden text-gray-700"
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img 
                            src={logo} 
                            alt="Library Logo" 
                            className="h-8 sm:h-10 w-auto object-contain" 
                        />
                    </Link>
                </div>

                {/* CENTER: Desktop Menu Links */}
                <nav className="hidden md:flex items-center">
                    <ul className="menu menu-horizontal px-1 gap-1 lg:gap-2 text-sm lg:text-base font-medium text-gray-700">
                        {links}
                    </ul>
                </nav>

                {/* RIGHT: User Profile & Actions */}
                <div className="flex items-center gap-2">
                    {/* Dark/Light Toggle */}
                    <button className="btn btn-ghost btn-circle btn-sm sm:btn-md text-gray-600">
                        <Sun size={20} />
                    </button>

                    {/* Profile / Auth Buttons */}
                    <div className="dropdown dropdown-end">
                        {user ? (
                            <>
                                <div 
                                    tabIndex={0} 
                                    role="button" 
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-9 sm:w-10 rounded-full ring-2 ring-primary/20">
                                        <img 
                                            src={user?.photoURL || "https://i.ibb.co/mJR45V6/user.png"} 
                                            alt={user?.displayName || "User avatar"} 
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-gray-100"
                                >
                                    <li className="px-4 py-2 font-medium text-xs text-gray-500 border-b border-gray-100 truncate">
                                        {user?.displayName || user?.email}
                                    </li>
                                    <li>
                                        <Link to="/profile" className="flex items-center gap-2 py-2">
                                            <User size={16} /> Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/settings" className="flex items-center gap-2 py-2">
                                            <Settings size={16} /> Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleSignOut} className="flex items-center gap-2 py-2 text-red-500">
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <div className="flex items-center gap-1 sm:gap-2">
                                <Link 
                                    to="/login" 
                                    className="btn btn-sm bg-white border border-[#0051f9] text-[#0051f9] hover:bg-[#0051f9] hover:text-white transition"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="btn btn-sm hidden sm:inline-flex bg-[#0051f9] text-white hover:bg-[#003ec4]"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ================= MOBILE SIDEBAR DRAWER ================= */}
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
                    isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={closeDrawer}
            />

            {/* Drawer Panel */}
            <aside 
                className={`fixed top-0 left-0 h-full w-64 sm:w-72 bg-white z-50 shadow-2xl p-5 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
                    isDrawerOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div>
                    {/* Top: Drawer Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                        <img src={logo} alt="Logo" className="h-8 object-contain" />
                        <button 
                            onClick={closeDrawer}
                            className="btn btn-ghost btn-circle btn-sm text-gray-500"
                            aria-label="Close menu"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <ul className="menu menu-vertical px-0 py-4 gap-2 text-base font-medium text-gray-700">
                        {links}
                    </ul>
                </div>

                {/* Mobile Drawer Bottom: Login / Logout status */}
                <div className="pt-4 border-t border-gray-100">
                    {user ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <img 
                                    src={user?.photoURL || "https://i.ibb.co/mJR45V6/user.png"} 
                                    alt="User" 
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="truncate">
                                    <p className="text-sm font-semibold text-gray-800 truncate">{user?.displayName || "User"}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    handleSignOut();
                                    closeDrawer();
                                }} 
                                className="btn btn-sm btn-outline btn-error w-full gap-2"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Link 
                                to="/login" 
                                onClick={closeDrawer}
                                className="btn btn-sm bg-[#0051f9] text-white w-full"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                onClick={closeDrawer}
                                className="btn btn-sm btn-outline border-[#0051f9] text-[#0051f9] w-full"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </aside>
        </header>
    )
}

export default Navbar