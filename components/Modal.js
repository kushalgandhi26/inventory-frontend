import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Modal = ({ setopenmodal, update, setupdate }) => {
    const router = useRouter()
    const [productDetails, setproductDetails] = useState({ title: "", image: "", createduser: "temp" })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setproductDetails({ ...productDetails, [name]: value })
    }

    const getDetails = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/products/${update.id}`, {
            method: 'GET'
        })
        const res = response.json().then(result => {
            setproductDetails(result)
        })

    }

    const handleSubmit = async (e) => {
        if (update.visible === true) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/updateproduct/${update.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productDetails),
                    method: 'PUT'
                })
                router.reload()
            } catch (error) {
                console.error(error)
            }
        } else {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/addproduct`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productDetails),
                    method: 'POST'
                })
                router.reload()
            } catch (error) {
                console.error(error)
            }
        }
        
    }

    useEffect(() => {
        if (update.visible === true) {
            getDetails()
        }
    }, [update])


    return (
        <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
            <div className="relative w-full h-full max-w-md p-4 md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={() => { setopenmodal(false); setupdate({ visible: false }) }} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Enter Product Details</h3>
                        <form className="space-y-6" action="#">
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Product Name</label>
                                <input onChange={(e) => handleChange(e)} type="text" name="title" id="title" value={productDetails.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div>
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Image URL</label>
                                <input onChange={(e) => handleChange(e)} type="text" name="image" id="image" value={productDetails.image} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <button onClick={handleSubmit} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{(update.visible)?"Update Product":"Add Product"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal