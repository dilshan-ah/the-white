import React, { useContext } from 'react'
import Header from '../components/header'
import { DataContext } from '../../context/Context'

const TrackOrder = () => {
    const { order, allProducts } = useContext(DataContext)

    return (
        <>
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
                            </tr>
                        </thead>
                        <tbody>
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
                                                                    <img src={`http://127.0.0.1:8000/uploads/product-thumbs/${product.thumbnail}`} alt="Avatar Tailwind CSS Component" />
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
                                    </tr>
                                ))
                            }

                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Items</th>
                                <th>Amount</th>
                                <th>Address</th>
                            </tr>
                        </tfoot>

                    </table>
                </div>
            </div>
        </>
    )
}

export default TrackOrder