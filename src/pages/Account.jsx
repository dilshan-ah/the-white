import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/header'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { FaEnvelope, FaKey, FaUser } from 'react-icons/fa'
import { DataContext } from '../../context/Context'
import AuthUser from '../../auth/AuthUser'
import { useNavigate } from 'react-router-dom'

const Account = () => {
    const navigate = useNavigate();

    const { order, allProducts, authOrder, userData } = useContext(DataContext)
    const { http, user } = AuthUser();

    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [profileUpdate, SetProfileUpdate] = useState(false)

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({});
    const [passerrors, setPassErrors] = useState(null);
    const [passwordUpdate, SetPasswordUpdate] = useState(false)

    useEffect(() => {
        let timer;
        if (profileUpdate || passwordUpdate) {
            timer = setTimeout(() => {
                if (profileUpdate) SetProfileUpdate(false);
                if (passwordUpdate) SetPasswordUpdate(false);
            }, 3000);
        }
        return () => clearTimeout(timer);

    }, [profileUpdate, passwordUpdate]);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]);

    const headers = {
        'Content-Type': 'multipart/form-data',
    };

    const UpdateProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_id', user?.id);
        formData.append('name', name);
        formData.append('email', email);

        try {
            const res = await http.post('/profile-update', formData, { headers });

            const updatedUser = { ...user, name, email };

            sessionStorage.setItem('user', JSON.stringify(updatedUser));

            SetProfileUpdate(true)

        } catch (error) {
            console.error('Profile updating failed:', error);
        }
    };


    const validatePassword = () => {
        const newErrors = {};

        if (newPassword.length < 6) {
            newErrors.newPassword = "New password must be at least 6 characters long.";
        }

        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = "Confirm password does not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const UpdatePassword = async (e) => {
        e.preventDefault();

        if (!validatePassword()) {
            console.log("Validation failed");
            return;
        }

        const formData = new FormData();
        formData.append('user_id', user?.id);
        formData.append('current_password', currentPassword);
        formData.append('new_password', newPassword);

        try {
            const res = await http.post('/password-update', formData, { headers });

            if (res.data.success) {
                SetPasswordUpdate(true);
                setPassErrors(null); // Clear any errors on success
            } else {
                setPassErrors(res.data.error || 'Password update failed.');
            }
        } catch (error) {
            console.error('Password updating failed:', error);
            setPassErrors('Password update failed. Please check your inputs.');
        }
    };

    const Logout = async (e) => {
        e.preventDefault();

        try {
            const res = await http.post('/logout', {}, { headers });

            sessionStorage.removeItem('user');

            navigate('/')

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };



    return (
        <>
            <Helmet>
                <title>My Account | The White</title>
            </Helmet>

            <Header />
            {
                profileUpdate && <div className="alert bg-black text-white w-max fixed right-10 bottom-10">
                    <span className='grostesk font-bold'>Profile updated successfully.</span>
                </div>
            }
            {
                passwordUpdate && <div className="alert bg-black text-white w-max fixed right-10 bottom-10">
                    <span className='grostesk font-bold'>Password updated successfully.</span>
                </div>
            }
            <Tabs className='container mx-auto px-10 grid lg:grid-cols-3 md:grid-cols-2 mt-20 gap-10'>
                <TabList className='border-0'>
                    <Tab className='cursor-pointer border-2 border-black rounded-none p-3 font-bold text-xl poppins text-center'>My Profile</Tab>
                    <Tab className='cursor-pointer border-2 border-black rounded-none p-3 font-bold text-xl poppins text-center'>Orders</Tab>
                    <button onClick={(e) => Logout(e)} className='w-full cursor-pointer border-2 border-black rounded-none p-3 font-bold text-xl poppins text-center'>Log Out</button>
                </TabList>

                <div className='lg:col-span-2'>
                    <TabPanel className='!p-0'>
                        <h3 class="poppins font-semibold text-3xl uppercase mb-5">Profile Information</h3>
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <FaUser />

                            <input type="text" defaultValue={user?.name} onChange={(e) => setName(e.target.value)} className="grow font-semibold poppins" placeholder="Full Name" name='name' />
                        </label>

                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <FaEnvelope />

                            <input type="text" defaultValue={user?.email} onChange={(e) => setEmail(e.target.value)} className="grow font-semibold poppins" placeholder="Email address" name='email' />
                        </label>

                        <div className='flex gap-5 justify-end items-center'>

                            <button onClick={(e) => UpdateProfile(e)} className='btn bg-black text-white'>Save</button>
                        </div>

                        <h3 class="poppins font-semibold text-3xl uppercase mb-5">Update Password</h3>
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <FaKey />

                            <input type="password" onChange={(e) => setCurrentPassword(e.target.value)} className="grow" placeholder="Current Password" name='name' />
                        </label>
                        {passerrors && <p className="text-red-500 -mt-5 mb-5">{passerrors}</p>}

                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <FaKey />

                            <input type="password" onChange={(e) => setNewPassword(e.target.value)} className="grow" placeholder="New Password" name='email' />
                        </label>
                        {errors.newPassword && <p className="text-red-500 -mt-5 mb-5">{errors.newPassword}</p>}

                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <FaKey />

                            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className="grow" placeholder="Confirm Password" name='email' />
                        </label>
                        {errors.confirmPassword && <p className="text-red-500 -mt-5 mb-5">{errors.confirmPassword}</p>}

                        <div className='flex gap-5 justify-end items-center'>

                            <button onClick={(e) => UpdatePassword(e)} className='btn bg-black text-white'>Update</button>
                        </div>
                    </TabPanel>
                    <TabPanel className='!p-0'>
                        <h3 class="poppins font-semibold text-3xl uppercase mb-5 ">My Orders</h3>
                        <div className='overflow-x-auto md:max-w-none sm:max-w-xl max-w-xs mx-auto'>
                            {
                                authOrder && authOrder.length > 0 && user ? (
                                    authOrder.filter(order => order.user_id === user.id).length > 0 ? (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Order Items</th>
                                                    <th>Amount</th>
                                                    <th>Address</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {authOrder.filter(order => order.user_id === user.id).map((orderItem) => (
                                                    <tr key={orderItem.order_id}>
                                                        <td>{orderItem.order_id}</td>
                                                        <td>
                                                            {orderItem.order_items?.map((item) => {
                                                                const product = allProducts.find((product) => product.id === item.product_id);
                                                                return product ? (
                                                                    <div key={item.product_id} className="flex items-center gap-3">
                                                                        <div className="avatar">
                                                                            <div className="mask w-20 h-20">
                                                                                <img
                                                                                    src={`https://adminpanel.thewhitebd.com/uploads/product-thumbs/${product.thumbnail}`}
                                                                                    alt="Product Thumbnail"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-bold">{product.title}</div>
                                                                            <div className="text-sm opacity-50">
                                                                                {item.quantity} x {item.price} ৳
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : null;
                                                            })}
                                                        </td>
                                                        <td>
                                                            <b>Subtotal:</b> {orderItem.subtotal}৳ <br />
                                                            <b>Delivery fee:</b> {orderItem.delivery_fee}৳ <br />
                                                            <b>Total:</b> {orderItem.total}৳
                                                        </td>
                                                        <td>
                                                            <b>Billing Address:</b> <br />
                                                            {orderItem.billing_address?.address_line}, {orderItem.billing_address?.district},{" "}
                                                            {orderItem.billing_address?.division} <br />
                                                            {orderItem.shipping_address && (
                                                                <>
                                                                    <b>Shipping Address:</b> <br />
                                                                    {orderItem.shipping_address?.address_line}, {orderItem.shipping_address?.district},{" "}
                                                                    {orderItem.shipping_address?.division}
                                                                </>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {orderItem.status === "reviewing" || orderItem.status === "shipped" ? (
                                                                <h4 className="font-bold uppercase text-orange-500">{orderItem.status}</h4>
                                                            ) : orderItem.status === "completed" ? (
                                                                <h4 className="font-bold uppercase text-lime-500">{orderItem.status}</h4>
                                                            ) : (
                                                                <h4 className="font-bold uppercase text-red-500">{orderItem.status}</h4>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th>Order Items</th>
                                                    <th>Amount</th>
                                                    <th>Address</th>
                                                    <th>Status</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    ) : (
                                        <h4 className='poppins font-medium text-xl'>No Order Found... 🤷‍♂️</h4>
                                    )
                                ) : (
                                    <h4 className='poppins font-medium text-xl text-slate-300'>No Order Found... 🤷‍♂️</h4>
                                )
                            }
                        </div>



                    </TabPanel>
                </div>

            </Tabs>

            <Footer />
        </>
    )
}

export default Account