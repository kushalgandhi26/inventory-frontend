import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head';

const Login = ({ setloggedIn }) => {
  const router = useRouter()
  const [userDetails, setuserDetails] = useState({ username: "", phonenumber: "" })
  const [show, setshow] = useState(false)
  const [validpass, setvalidpass] = useState(false)
  var pass = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/

  const handleChange = (e) => {
    const { name, value } = e.target
    setuserDetails({ ...userDetails, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userDetails.username !== "" && userDetails.phonenumber !== "") {
      if(pass.test(userDetails.phonenumber)){
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
          })
          const res = response.json().then(result => {
            localStorage.setItem('user', JSON.stringify(result))
            setuserDetails({ username: "", phonenumber: "" })
            setloggedIn(result)
            router.push("/")
          })
        } catch (error) {
          console.log(error)
        }
      }else{
        setvalidpass(true)
      }
    }else{
      setshow(true)
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Login</title>
        <link rel="icon" href="https://www.starkode.com/assets/Starkode.Business.Inventory.png" />
      </Head>
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Enter Name</label>
              <input onChange={(e) => { handleChange(e); setshow(false)}} id="username" name="username" type="text" autoComplete="username" className="appearance-none rounded-none relative block w-full px-3 py-2 bg-gray-800 border-gray-500 placeholder-gray-400 border text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter Name" required />
            </div>
            <div>
              <label htmlFor="phonenumber" className="sr-only">Enter Phonenumber</label>
              <input onChange={(e) => { handleChange(e); setshow(false);setvalidpass(false)  }} id="phonenumber" name="phonenumber" type="tel" maxLength={10} pattern="[0-9]{5}[0-9]{5}" className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-800 border-gray-500 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter Phonenumber" required />
            </div>
            {validpass && <span className='text-red-600 text-sm'>* Enter valid phone number</span>}
          </div>
          {show && <span className='text-red-600 text-sm'>* Enter both the details</span>}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-1 w-4" />
            </div>
          </div>

          <div>
            <button onClick={handleSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Login