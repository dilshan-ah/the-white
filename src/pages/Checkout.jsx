import React, { useState } from 'react'
import SecondaryHeader from '../components/SecondaryHeader'
import addressesData from '../api/addresses.json';
import bkash from '../assets/bkash-logo.webp'
import nagad from '../assets/Nagad-Logo.png'
import rocket from '../assets/rocket-logo.png'
import upay from '../assets/upay_logo.png'
import blacktee from '../assets/black.png'
import Footer from '../components/Footer';

const Checkout = () => {


  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [divisionDistricts, setDivisionDistricts] = useState([]);

  const uniqueDivisions = [...new Set(addressesData.map(address => address.division))];

  const handleDivisionChange = (event) => {
    const division = event.target.value;
    setSelectedDivision(division);

    // Filter districts based on selected division
    const districts = addressesData.filter(address => address.division === division);
    setDivisionDistricts(districts);
    setSelectedDistrict('');
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };


  const [paymentMethod, setPaymentMethod] = useState('cod')


  return (
    <>
      <SecondaryHeader />

      <div className='px-5 container mx-auto'>

        <div className="text-sm breadcrumbs">
          <ul className='text-xl grostesk'>
            <li className='font-bold'><a>Home</a></li>
            <li>Checkout</li>
          </ul>
        </div>

        <div className='grid grid-cols-5 gap-20 py-10'>

          <div className='md:col-span-3 col-span-5'>
            <h3 className='grostesk font-bold text-2xl uppercase'>
              <span className='mr-5'>1.</span>
              CONTACT INFORMATION
            </h3>

            <div className='border-l ml-2 pl-8 pt-5 pb-10'>
              <input type="text" placeholder='Email Address' className='grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded' />

              <input type="tel" placeholder='Phone number' className='grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 rounded' />
            </div>

            <h3 className='grostesk font-bold text-2xl uppercase'>
              <span className='mr-5'>2.</span>
              BILLING ADDRESS
            </h3>

            <div className='border-l ml-2 pl-8 pt-5 pb-10'>

              <div className='grid grid-cols-2 gap-5 mb-5'>
                <input type="text" placeholder='First Name' className='grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 rounded' />

                <input type="text" placeholder='Last Name' className='grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 rounded' />
              </div>

              <input type="text" placeholder='Address' className='grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 rounded mb-5' />

              <div className='grid grid-cols-2 gap-5 mb-5'>


                <select value={selectedDistrict} onChange={handleDistrictChange} className='grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 rounded mb-5'>
                  <option value="">--Select District--</option>
                  {divisionDistricts.map((address, index) => (
                    <option key={index} value={address.district}>{address.district}</option>
                  ))}
                </select>

                <select value={selectedDivision} onChange={handleDivisionChange} className='grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 rounded mb-5'>
                  <option value="">--Select Division--</option>
                  {uniqueDivisions.map((division, index) => (
                    <option key={index} value={division}>{division}</option>
                  ))}
                </select>


              </div>


            </div>

            <h3 className='grostesk font-bold text-2xl uppercase'>
              <span className='mr-5'>3.</span>
              Shipping method
            </h3>

            <div className='border-l ml-2 pl-8 pt-5 pb-10'>

              <div className='relative'>
                <input type="radio" id="inside-dhaka" name="shipping-method" class="ship-radio radio absolute top-0 bottom-0 left-2 my-auto" checked />
                <label for="inside-dhaka" class="shipping-meth flex justify-between pl-10 pr-5 py-5 border-2 cursor-pointer">
                  <div class="flex items-center gap-4">
                    <h3 class="grostesk font-bold">Inside Dhaka (ঢাকার ভিতর)</h3>
                  </div>
                  <h4 class="grostesk font-bold">৳80.00</h4>
                </label>
              </div>

              <div className='relative'>
                <input type="radio" id="outside-dhaka" name="shipping-method" class="radio absolute top-0 bottom-0 left-2 my-auto" />
                <label for="outside-dhaka" class="shipping-meth flex justify-between pl-10 pr-5 py-5 border-2 cursor-pointer">
                  <div class="flex items-center gap-4">
                    <h3 class="grostesk font-bold">Outside Dhaka (ঢাকার বাহিরে)</h3>
                  </div>
                  <h4 class="grostesk font-bold">৳100.00</h4>
                </label>
              </div>


            </div>

            <h3 className='grostesk font-bold text-2xl uppercase'>
              <span className='mr-5'>4.</span>
              Payment method
            </h3>

            <div className='border-l ml-2 pl-8 pt-5 pb-10'>

              <div className={`relative pay-box border-2 ${paymentMethod === "cod" ? 'border-black' : ''}`}>
                <input
                  type="radio"
                  id="cod"
                  name="payment-method"
                  className="pay-radio radio absolute top-5 left-2 my-auto"
                  onChange={() => setPaymentMethod('cod')}
                  defaultChecked
                />
                <label
                  htmlFor="cod"
                  className="shipping-meth flex justify-between pl-10 pr-5 py-5 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <h3 className="grostesk font-bold capitalize">Cash on delivery</h3>
                  </div>
                </label>

                <div className={`pl-10 py-5 pr-5 shadow pay-details ${paymentMethod === "cod" ? 'block' : 'hidden'}`}>
                  Pay with cash upon delivery.
                </div>
              </div>

              <div className={`relative pay-box border-2 ${paymentMethod === "mm" ? 'border-black' : ''}`}>
                <input
                  type="radio"
                  id="mm"
                  name="payment-method"
                  onChange={() => setPaymentMethod('mm')}
                  className="pay-radio radio absolute  top-5 left-2 my-auto"
                />
                <label
                  htmlFor="mm"
                  className="shipping-meth flex justify-between pl-10 pr-5 py-5 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <h3 className="grostesk font-bold capitalize">Mobile Banking</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={bkash} className="h-5" alt="bKash" />
                    <img src={nagad} className="h-5" alt="Nagad" />
                    <img src={rocket} className="h-5" alt="Rocket" />
                    <img src={upay} className="h-5" alt="Upay" />
                  </div>
                </label>

                <div className={`${paymentMethod === "mm" ? 'block' : 'hidden'} `}>

                  <div className={`pl-10 py-5 pr-5 shadow pay-details flex gap-3 justify-center`}>
                    <input id='bkash' type="radio" name='mm-method' className='invisible absolute mm-mthd' />
                    <label for='bkash' className='px-5 py-3 shadow flex flex-col items-center border-2'>
                      <img src={bkash} className='h-5' alt="" />
                      <h5 className='grostesk font-semibold'>Bkash</h5>
                    </label>

                    <input id='nagad' type="radio" name='mm-method' className='invisible absolute mm-mthd' />
                    <label for='nagad' className='px-5 py-3 shadow flex flex-col items-center border-2'>
                      <img src={nagad} className='h-5' alt="" />
                      <h5 className='grostesk font-semibold'>Nagad</h5>
                    </label>

                    <input id='rocket' type="radio" name='mm-method' className='invisible absolute mm-mthd' />
                    <label for='rocket' className='px-5 py-3 shadow flex flex-col items-center border-2'>
                      <img src={rocket} className='h-5' alt="" />
                      <h5 className='grostesk font-semibold'>Rocket</h5>
                    </label>

                    <input id='upay' type="radio" name='mm-method' className='invisible absolute mm-mthd' />
                    <label for='upay' className='px-5 py-3 shadow flex flex-col items-center border-2'>
                      <img src={upay} className='h-5' alt="" />
                      <h5 className='grostesk font-semibold'>Upay</h5>
                    </label>
                  </div>

                  <div className='pl-10 py-5 pr-5'>
                    <h3 className='grostesk text-md'>Account type: <span className='font-bold'>Personal</span></h3>
                    <h3 className='grostesk text-md mb-5'>Account number: <span className='font-bold'>0199999999</span></h3>

                    <label className='grostesk text-md mb-5 font-semibold'>Your phone number</label>
                    <input type="text" placeholder='019xxxxxxxx' className='grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded' />

                    <label className='grostesk text-md mb-5 font-semibold'>bKash Transaction ID</label>
                    <input type="text" placeholder='2M7A5' className='grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded' />
                  </div>

                </div>






              </div>

            </div>


          </div>

          <div className='md:col-span-2 col-span-5'>
            <div className='p-5 shadow'>
              <h3 className="grostesk font-bold capitalize text-2xl mb-5">Order summary</h3>

              <div className='order-item flex gap-2 mb-5'>
                <img src={blacktee} className='w-14' alt="" />

                <div className='flex-1'>
                  <h3 className="grostesk font-bold capitalize text-xl">Black tee ✕ 2</h3>

                  <p className="grostesk font-bold text-lg">XL</p>
                </div>

                <h3 className="grostesk font-bold capitalize text-xl">800৳</h3>
              </div>

              <hr className='mb-5' />

              <h3 className="grostesk font-bold capitalize mb-5">Apply redeem code</h3>

              <div className="join items-center gap-2 mb-5">
                <div>
                  <div>
                    <input className="grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 rounded" placeholder="Apply redeem code" />
                  </div>
                </div>
                <button className="btn rounded-none hover:bg-transparent hover:text-black border-2 border-black hover:border-black grostesk px-5 py-3 font-bold bg-black text-white">Apply</button>
              </div>

              <div className='flex justify-between'>
                <h3 className="grostesk font-bold capitalize mb-5">Subtotal</h3>
                <h5 className='grostesk font-semibold'>800৳</h5>
              </div>

              <div className='flex justify-between'>
                <h3 className="grostesk font-bold capitalize mb-5">Delivery fee</h3>
                <h5 className='grostesk font-semibold'>80৳</h5>
              </div>

              <div className='flex justify-between'>
                <h3 className="grostesk font-bold capitalize mb-5">Total</h3>
                <h5 className='grostesk font-semibold'>880৳</h5>
              </div>

              <button className="btn w-full rounded-none hover:bg-transparent hover:text-black border-2 border-black hover:border-black grostesk px-5 py-3 font-bold bg-black text-white">Place Order</button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Checkout