import React, { useContext, useState } from 'react'
import Header from '../components/header'
import { DataContext } from '../../context/Context'
import AuthUser from '../../auth/AuthUser'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { FaEnvelope, FaKey, FaUser } from 'react-icons/fa'
import { Helmet } from 'react-helmet'

const TrackOrder = () => {
    const { order, allProducts, authOrder, userData } = useContext(DataContext)

    const [isRemembered, setIsRemembered] = useState(false)


    const { http, setToken, user } = AuthUser();

    console.log(user);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const SignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await http.post('/register', { email: email, password: password, name: name });
            window.location.reload()
        } catch (error) {
            console.error('Register failed:', error);
        }
    }

    const SignIn = async (e) => {
        e.preventDefault();
        try {
            const res = await http.post('/login', { email: email, password: password, remember_token: rememberMeToken });
            setToken(res.data.user, res.data.access_token);
            window.location.reload()
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    const rememberMeToken = isRemembered ? localStorage.getItem('rememberMeToken') : null;

    return (
        <>
            <Helmet>
                <title>Track you order | The White</title>
            </Helmet>

            <Header />

            <div className='container mx-auto p-5'>
                <div className="overflow-x-auto">
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
                        {
                            user?.id ?

                                authOrder?.map((orderItem) => (
                                    orderItem.user_id == user?.id &&
                                    <tbody key={orderItem.order_id}>
                                        <tr>
                                            <td>{orderItem.order_id}</td>
                                            <td>
                                                {orderItem.order_items?.map((item) => {
                                                    const product = allProducts.find((product) => product.id == item.product_id);
                                                    return product ? (
                                                        <div key={item.product_id} className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                <div className="mask w-20 h-20">
                                                                    <img src={`https://adminpanel.thewhitebd.com/uploads/product-thumbs/${product.thumbnail}`} alt="Product Thumbnail" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{product.title}</div>
                                                                <div className="text-sm opacity-50">{item.quantity} x {item.price} ৳</div>
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

                                                {orderItem?.billing_address?.address_line}, {orderItem?.billing_address?.district}, {orderItem?.billing_address?.division} <br />

                                                {orderItem.shipping_address && (
                                                    <>
                                                        <b>Shipping Address:</b> <br />
                                                        {orderItem.shipping_address?.address_line}, {orderItem.shipping_address?.district}, {orderItem.shipping_address?.division}
                                                    </>
                                                )}
                                            </td>
                                            <td>

                                                {
                                                    orderItem?.status === "reviewing" || orderItem?.status === "shipped" ? (
                                                        <h4 className='font-bold uppercase text-orange-500'>{orderItem?.status}</h4>
                                                    ) : orderItem?.status === "completed" ? (
                                                        <h4 className='font-bold uppercase text-lime-500'>{orderItem?.status}</h4>
                                                    ) : (
                                                        <h4 className='font-bold uppercase text-red-500'>{orderItem?.status}</h4>
                                                    )
                                                }

                                            </td>
                                        </tr>
                                    </tbody>
                                )) : <tbody>
                                    {
                                        order.map((orderItem) => (
                                            <tr>
                                                <td>
                                                    {orderItem.order_id}
                                                </td>
                                                <td>
                                                    {
                                                        orderItem?.orderItems?.map((item) => {
                                                            const product = allProducts.find((product) => product.id === item.product_id);
                                                            return product ? (
                                                                <div key={product.id} className="flex items-center gap-3">
                                                                    <div className="avatar">
                                                                        <div className="mask w-20 h-20">
                                                                            <img src={`https://adminpanel.thewhitebd.com/uploads/product-thumbs/${product.thumbnail}`} alt="Avatar Tailwind CSS Component" />
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-bold">{product.title}</div>
                                                                        <div className="text-sm opacity-50">{item.quantity} x {item.price} ৳</div>
                                                                    </div>
                                                                </div>
                                                            ) : null;
                                                        })
                                                    }


                                                </td>
                                                <td>
                                                    <b>Subtotal:</b> {orderItem.subtotal}৳
                                                    <br />
                                                    <b>Delivery fee:</b> {orderItem.delivery_fee}৳
                                                    <br />
                                                    <b>Total:</b> {orderItem.total}৳
                                                </td>
                                                <td>
                                                    <b>Billing Address:</b> <br />
                                                    {orderItem.address}, {orderItem.district}, {orderItem.division} <br />

                                                    {
                                                        orderItem.saddress &&
                                                        <>
                                                            <b>Shipping Address:</b> <br />
                                                            {orderItem.saddress}, {orderItem.sdistrict}, {orderItem.sdivision}
                                                        </>
                                                    }

                                                </td>
                                                <td>
                                                    <button onClick={() => document.getElementById('authlog').showModal()} className='text-primary text-md font-semibold'>Login to check status</button>

                                                    <dialog id="authlog" className="modal">
                                                        <div className="modal-box p-0 rounded-none">

                                                            <Tabs>
                                                                <TabList className='flex'>
                                                                    <Tab className='w-1/2 cursor-pointer border-2 border-black rounded-none p-3 font-bold text-xl grostesk text-center'>Register</Tab>
                                                                    <Tab className='w-1/2 cursor-pointer border-2 border-black rounded-none p-3 font-bold text-xl grostesk text-center'>Login</Tab>
                                                                </TabList>

                                                                <TabPanel>

                                                                    <label className="input input-bordered flex items-center gap-2 mb-5 mt-5">
                                                                        <FaUser />

                                                                        <input type="text" onChange={(e) => setName(e.target.value)} className="grow" placeholder="Full Name" name='name' />
                                                                    </label>

                                                                    <label className="input input-bordered flex items-center gap-2 mb-5">
                                                                        <FaEnvelope />

                                                                        <input type="text" onChange={(e) => setEmail(e.target.value)} className="grow" placeholder="Email address" name='email' />
                                                                    </label>

                                                                    <label className="input input-bordered flex items-center gap-2 mb-5">
                                                                        <FaKey />

                                                                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="grow" placeholder="password" name='password' />
                                                                    </label>

                                                                    <div className='flex gap-5 justify-end items-center'>
                                                                        <form method="dialog">
                                                                            {/* if there is a button in form, it will close the modal */}
                                                                            <button className="btn">Close</button>
                                                                        </form>

                                                                        <button onClick={(e) => SignUp(e)} className='btn bg-black text-white'>Register</button>
                                                                    </div>
                                                                </TabPanel>
                                                                <TabPanel>

                                                                    <label className="input input-bordered flex items-center gap-2 mb-5">
                                                                        <FaEnvelope />

                                                                        <input onChange={(e) => setEmail(e.target.value)} type="text" className="grow" placeholder="Email address" name='email' />
                                                                    </label>

                                                                    <label className="input input-bordered flex items-center gap-2 mb-5">
                                                                        <FaKey />

                                                                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="grow" placeholder="password" name='password' />
                                                                    </label>

                                                                    <div className="form-control mb-5">
                                                                        <label className="label cursor-pointer justify-start">
                                                                            <input onChange={() => setIsRemembered(!isRemembered)} type="checkbox" className="checkbox mr-5" />
                                                                            <span className="label-text">Remember me</span>
                                                                        </label>
                                                                    </div>

                                                                    <div className='flex gap-5 justify-end items-center'>
                                                                        <form method="dialog">
                                                                            {/* if there is a button in form, it will close the modal */}
                                                                            <button className="btn">Close</button>
                                                                        </form>

                                                                        <button onClick={(e) => SignIn(e)} className='btn bg-black text-white'>Login</button>
                                                                    </div>
                                                                </TabPanel>
                                                            </Tabs>
                                                        </div>
                                                    </dialog>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                        }


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
                </div>
            </div>
        </>
    )
}

export default TrackOrder