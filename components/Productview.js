import { useRouter } from 'next/router'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const Productview = ({ product,setupdate }) => {
    const router = useRouter()
    const handleDelete = async(e) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/deleteproduct/${product.id}`,{
                method: 'DELETE'
            })
        } catch (error) {
            console.error(error)    
        }
        router.reload()
    }

    const handleUpdate = () => {
        setupdate({visible:true,id:product.id})
    }

    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg mx-1 my-2">
            <img className="w-full" src="https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc=" alt="Sunset in the mountains" />
            <div className="px-6 py-2">
                <div className="font-bold text-xl mb-2">{product.title}</div>
            </div>
            <div className="px-6 pt-2 pb-2 flex">
                <span className='mr-1 font-medium'>Created by</span> 
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product.createduser}</span>
                <span className='mx-2'>
                    <button onClick={handleUpdate} className="items-center px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md">
                    <FontAwesomeIcon icon={faPen} />
                    </button>
                </span>
                <span>
                    <button onClick={handleDelete} className="items-center p-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </span>
            </div>
        </div>
    )
}

export default Productview