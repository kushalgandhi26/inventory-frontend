import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar = ({setopenmodal,update}) => {
    const [show, setshow] = useState(false)
    const router = useRouter()
    
    useEffect(() => {
      if(update.visible === true)
        setopenmodal(true)
    }, [update])
    

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <Link href="/"><a className="text-white font-semibold text-lg cursor-pointer">Inventory App</a></Link>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <button onClick={() => setopenmodal(true)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="ml-3 relative">
                            <button onClick={() => router.push("/login")} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                                Login
                            </button>
                            {/* <div>
                                <button onClick={() => setshow(!show)} type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                </button>
                            </div> */}
                            {show && <div className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar