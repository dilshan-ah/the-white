import React, { useContext, useState } from 'react'
import Header from '../components/header'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { FaEnvelope, FaKey, FaUser } from 'react-icons/fa'
import { DataContext } from '../../context/Context'
import AuthUser from '../../auth/AuthUser'

const Account = () => {
    const { order, allProducts, authOrder, userData } = useContext(DataContext)
    const { http, setToken, user } = AuthUser();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    
    return (
        <>
            <Helmet>
                <title>My Account | The White</title>
            </Helmet>

            <Header />

            <Tabs className='container px-10 grid grid-cols-3 mt-20 gap-10'>
                <TabList className='border-0'>
                    <Tab className='cursor-pointer border-2 border-black rounded-none p-3 font-bold text-xl poppins text-center'>My Profile</Tab>
                    <Tab className='cursor-pointer border-2 border-black rounded-none p-3 font-bold text-xl poppins text-center'>Orders</Tab>
                </TabList>

                <div className='col-span-2'>
                    <TabPanel className='!p-0'>
                        <h3 class="poppins font-semibold text-3xl uppercase mb-5">Profile Information</h3>
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <FaUser />

                            <input type="text" value={user?.name} onChange={(e) => setName(e.target.value)} className="grow font-semibold poppins" placeholder="Full Name" name='name' />
                        </label>

                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <FaEnvelope />

                            <input type="text" value={user?.email} onChange={(e) => setEmail(e.target.value)} className="grow font-semibold poppins" placeholder="Email address" name='email' />
                        </label>

                        <div className='flex gap-5 justify-end items-center'>

                            <button onClick={(e) => SignUp(e)} className='btn bg-black text-white'>Save</button>
                        </div>

                        <h3 class="poppins font-semibold text-3xl uppercase mb-5">Update Password</h3>
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <FaKey />

                            <input type="password" onChange={(e) => setName(e.target.value)} className="grow" placeholder="Current Password" name='name' />
                        </label>

                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <FaKey />

                            <input type="password" onChange={(e) => setEmail(e.target.value)} className="grow" placeholder="New Password" name='email' />
                        </label>

                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <FaKey />

                            <input type="password" onChange={(e) => setEmail(e.target.value)} className="grow" placeholder="Confirm Password" name='email' />
                        </label>

                        <div className='flex gap-5 justify-end items-center'>

                            <button onClick={(e) => SignUp(e)} className='btn bg-black text-white'>Update</button>
                        </div>
                    </TabPanel>
                    <TabPanel className='!p-0'>
                        <h3 class="poppins font-semibold text-3xl uppercase mb-5">My Orders</h3>
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


                    </TabPanel>
                </div>

            </Tabs>

            <Footer />
        </>
    )
}

export default Account