import React from 'react'

const Productview = ({title,image,creator}) => {
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg mx-1 my-2">
            <img className="w-full" src="https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc=" alt="Sunset in the mountains" />
            <div className="px-6 py-2">
                <div className="font-bold text-xl mb-2">{title}</div>
            </div>
            <div className="px-6 pt-2 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{creator}</span>
            </div>
        </div>
    )
}

export default Productview