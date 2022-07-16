import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Modal = ({ setopenmodal, update, setupdate, loggedIn }) => {
    const router = useRouter()
    const [productDetails, setproductDetails] = useState({ title: "", image: "", createduser: loggedIn.user })

    const [show, setshow] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setproductDetails({ ...productDetails, [name]: value })
    }

    const getDetails = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/products/${update.id}`, {
            method: 'GET',
            headers:{
                'token':loggedIn.jwt
            }
        })
        const res = response.json().then(result => {
            setproductDetails(result)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (productDetails.title != "") {
            if (update.visible === true) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/updateproduct/${update.id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': loggedIn.jwt
                        },
                        body: JSON.stringify(productDetails),
                        method: 'PUT'
                    })
                    setupdate({visible:false})
                } catch (error) {
                    console.error(error)
                }
            } else {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/addproduct`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': loggedIn.jwt
                        },
                        body: JSON.stringify(productDetails),
                        method: 'POST'
                    })
                } catch (error) {
                    console.error(error)
                }
            }
            setopenmodal(false)
            router.push("/")
        }
        setshow(true)
    }

    useEffect(() => {
        if (update.visible === true) {
            getDetails()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update])


    return (
        <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div className="relative w-full h-full m-auto max-w-md p-4 md:h-auto">
                <div className="relative rounded-lg shadow bg-gray-700">
                    <button onClick={() => { setopenmodal(false); setupdate({ visible: false }) }} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-white">Enter Product Details</h3>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Product Name</label>
                                <input onChange={(e) => {handleChange(e);setshow(false)}} type="text" name="title" id="title" value={productDetails.title} className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required />
                                {show && <span className='text-red-600 text-sm'>* Enter product name</span>}
                            </div>
                            <div>
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Image URL (Copy image address)</label>
                                <input onChange={(e) => handleChange(e)} type="text" name="image" id="image" value={productDetails.image} className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" />
                            </div>
                            <button onClick={handleSubmit} type="submit" className="w-full text-white focus:ring-4 focus:outline-non font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">{(update.visible) ? "Update Product" : "Add Product"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal