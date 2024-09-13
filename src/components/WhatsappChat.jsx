import React from 'react'
import whatsapp from '../assets/WhatsApp-Logo.png'
import { Link } from 'react-router-dom'

const WhatsappChat = () => {
    return (
        <Link to='https://wa.me/+8801973704783' target='_blank' className='fixed bottom-10 right-10 z-30'>
            <img src={whatsapp} className='w-16' alt="" srcset="" />
        </Link>
    )
}

export default WhatsappChat