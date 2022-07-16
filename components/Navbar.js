import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar = ({ setopenmodal, update, loggedIn, setloggedIn }) => {
    const [show, setshow] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (update.visible === true)
            setopenmodal(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update])

    const handleLogout = () => {
        localStorage.removeItem('user')
        setloggedIn(undefined)
        setshow(!show)
    }

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <Link href="/"><a className="text-white font-semibold text-lg mr-5 cursor-pointer">Inventory App</a></Link>
                        {loggedIn !== undefined && <button onClick={() => setopenmodal(true)} className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-white py-1 px-2 rounded">
                            Add Product
                        </button>}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="ml-3 relative">
                            {loggedIn === undefined && <button onClick={() => router.push("/login")} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                Login
                            </button>}
                            {loggedIn !== undefined && <div>
                                <button onClick={() => setshow(!show)} type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full" src="https://www.squareinfosoft.com/wp-content/uploads/2019/11/avatar-default.png" alt="" />
                                </button>
                            </div>}
                            {show && <div className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg py-1 bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-white hover:bg-gray-600" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar