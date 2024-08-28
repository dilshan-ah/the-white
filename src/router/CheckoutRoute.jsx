import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const CheckoutRoute = ({ cart }) => {
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (cart.length === 0) {
            // Set a timer before redirecting
            const timer = setTimeout(() => {
                setShouldRedirect(true);
            }, 3000); // Adjust the delay as needed (3000ms = 3 seconds)

            // Clear the timer if the component unmounts before the timeout
            return () => clearTimeout(timer);
        }
    }, [cart]);

    if (shouldRedirect) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default CheckoutRoute