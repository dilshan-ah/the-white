import React, { useContext, useEffect, useId, useState } from 'react'
import SecondaryHeader from '../components/SecondaryHeader'
import addressesData from '../api/addresses.json';
import bkash from '../assets/bkash-logo.webp'
import nagad from '../assets/Nagad-Logo.png'
import rocket from '../assets/rocket-logo.png'
import upay from '../assets/upay_logo.png'
import blacktee from '../assets/black.png'
import Footer from '../components/Footer';
import { DataContext } from '../../context/Context';
import AuthUser from '../../auth/AuthUser';
import { Link, useNavigate } from 'react-router-dom';
import { CiCircleCheck } from 'react-icons/ci';
import { Helmet } from 'react-helmet';

const Checkout = () => {

  const { http, user } = AuthUser();

  const navigate = useNavigate();

  const [outsideBd, setOutsideBd] = useState(false)

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

  const [sDivisionDistricts, setSdivisionDistricts] = useState([]);

  const handleSdivisionChange = (event) => {
    const division = event.target.value;
    setSelectedSdivision(division);

    // Filter districts based on selected division
    const districts = addressesData.filter(address => address.division === division);
    setSdivisionDistricts(districts);
    setSelectedSdistrict('');
  };

  const handleSdistrictChange = (event) => {
    setSelectedSdistrict(event.target.value);
  };


  const { cart, setCart, allProducts, userData, setOrder, offers } = useContext(DataContext)

  const calculateSubTotalPrice = () => {
    const sbttl = cart.reduce((subtotal, item) => subtotal + (parseFloat(item.price) * item.quantity), 0).toFixed();
    return sbttl;
  };




  const calculateTotalPrice = () => {
    const subtotal = parseFloat(calculateSubTotalPrice());
    const total = subtotal + parseFloat(deliveryFee) - parseFloat(discount);
    return total.toFixed();
  };

  const handleShippingChange = (e) => {
    setDeliveryFee(Number(e.target.value));

    if (deliveryFee == 80) {
      setShippingMethod('Dhaka city')
    } else if (deliveryFee == 100) {
      setShippingMethod('Dhaka division')
    } else {
      setShippingMethod('Outside dhaka')
    }

    setOutsideBd(false)
  };


  const [differentShipping, setDiffererntShipping] = useState(false)

  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
    } else {
      setUserId(1)
    }

    if (!cart || cart.length === 0) {
      navigate('/');
    }

  }, [user, cart, navigate]);

  const [hasFreeDeliveryWithoutCode, setHasFreeDeliveryWithoutCode] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');

  // user details
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState();

  const [userId, setUserId] = useState();
  // shipping details

  const [sfname, setSfname] = useState(null);
  const [slname, setSlname] = useState();
  const [sphone, setSphone] = useState();
  const [saddress, setSaddress] = useState();
  const [selectedSdivision, setSelectedSdivision] = useState('');
  const [selectedSdistrict, setSelectedSdistrict] = useState('');
  //billing  address
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [address, setAddress] = useState();
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  // shipping method
  const [shippingMethod, setShippingMethod] = useState()
  // Payment method
  const [paymentMethod, setPaymentMethod] = useState('cod')

  const [mobileMethods, setMobileMethods] = useState()
  const [transactionNumber, setTransactionNumber] = useState()
  const [transactionId, setTransactionId] = useState()

  // Order summery
  const [subtotal, setSubtotal] = useState(calculateSubTotalPrice())
  const [discountedSubtotal, setDiscountedSubtotal] = useState(subtotal);
  const [deliveryFee, setDeliveryFee] = useState(hasFreeDeliveryWithoutCode ? 0 : 80)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(calculateTotalPrice())


  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  function useId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }


  const [loyalty, setLoyalty] = useState()

  const loyaltyfunc = (e) => {
    if (e.target.value <= user?.loyalty_points) {
      setLoyalty(e.target.value)
    } else {
      setLoyalty(0)
    }
  }

  const applyLoyalty = () => {
    setDiscount(loyalty / 10)
  }

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!fname) newErrors.fname = "First name is required";
    if (!lname) newErrors.lname = "Last name is required";
    if (!address) newErrors.address = "Address is required";
    if (!selectedDivision) newErrors.selectedDivision = "Please select a division";
    if (!selectedDistrict) newErrors.selectedDistrict = "Please select a district";

    // Add more validation logic as needed
    if (differentShipping) {
      if (!sfname) newErrors.sfname = "Shipping first name is required";
      if (!slname) newErrors.slname = "Shipping last name is required";
      if (!sphone) newErrors.sphone = "Shipping phone number is required";
      if (!saddress) newErrors.saddress = "Shipping address is required";
      if (!selectedSdivision) newErrors.selectedSdivision = "Please select a shipping division";
      if (!selectedSdistrict) newErrors.selectedSdistrict = "Please select a shipping district";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const MakeOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form contains errors");
      return;
    }

    const uniqueOrderId = useId().slice(0, 10);

    const formData = new FormData();

    formData.append('order_id', uniqueOrderId);
    formData.append('name', fname + ' ' + lname);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('user_id', userId);
    formData.append('shipping_at', shippingMethod);
    formData.append('payment_method', paymentMethod);
    formData.append('subtotal', subtotal);
    formData.append('discount', discount);
    formData.append('delivery_fee', deliveryFee);
    formData.append('total', total);


    formData.append('address', address);
    formData.append('district', selectedDistrict);
    formData.append('division', selectedDivision);

    formData.append('diffShip', differentShipping);

    formData.append('sname', sfname + ' ' + slname);
    formData.append('sphone', sphone);
    formData.append('saddress', saddress);
    formData.append('sdistrict', selectedSdistrict);
    formData.append('sdivision', selectedSdivision);

    formData.append('mobile_method', mobileMethods);
    formData.append('transaction_number', transactionNumber);
    formData.append('transaction_id', transactionId);

    formData.append('loyalty', loyalty);


    cart.forEach((item, index) => {
      formData.append(`order[${index}][product_id]`, item.product_id);
      formData.append(`order[${index}][price]`, item.price);
      formData.append(`order[${index}][quantity]`, item.quantity);
      formData.append(`order[${index}][attribute_id]`, item.attribute_id);
    });

    try {
      const res = await http.post('/store-order', formData, { headers });

      const newOrder = {
        order_id: uniqueOrderId,
        name: `${fname} ${lname}`,
        email: email,
        phone: phone,
        shipping_at: shippingMethod,
        payment_method: paymentMethod,
        subtotal: subtotal,
        delivery_fee: deliveryFee,
        discount: discount,
        total: total - discount,
        address: address,
        district: selectedDistrict,
        division: selectedDivision,
        sname: `${sfname} ${slname}`,
        sphone: sphone,
        saddress: saddress,
        sdistrict: selectedSdistrict,
        sdivision: selectedSdivision,
        mobile_method: mobileMethods,
        transaction_number: transactionNumber,
        transaction_id: transactionId,
        orderItems: cart
      };

      setOrder(prevOrders => {
        const updatedOrders = [...prevOrders, newOrder];
        localStorage.setItem('order', JSON.stringify(updatedOrders)); // Update local storage with the new list of orders
        return updatedOrders;
      });

      document.getElementById('my_modal_1').showModal()
      setCart([])

    } catch (error) {
      console.error('Order inserting failed:', error);
    }
  }

  useEffect(() => {
    const checkOffers = () => {
      const hasFreeDeliveryWithCode = offers?.some(
        offer => offer.free_delivery === 'yes' && offer.reeder_code === redeemCode && offer.min_amount <= subtotal
      );

      const hasFreeDeliveryWithoutCode = offers?.some(
        offer => offer.free_delivery === 'yes' && offer.reeder_code === null && offer.min_amount <= subtotal
      );

      const hasProductOfferWithCode = offers?.some(
        offer => offer.free_delivery === 'no' && offer.reeder_code === redeemCode && offer.min_amount <= subtotal
      );

      if (hasFreeDeliveryWithCode || hasFreeDeliveryWithoutCode) {
        setHasFreeDeliveryWithoutCode(true);
        setDeliveryFee(0);
      } else if (hasProductOfferWithCode) {
        const offer = offers.find(
          offer => offer.free_delivery === 'no' && offer.reeder_code === redeemCode && offer.min_amount <= subtotal
        );
        const discount = subtotal * (offer.offet_amount / 100);
        setDiscount(discount);

        console.log(offer);
      } else {
        setHasFreeDeliveryWithoutCode(false);
      }

    };

    checkOffers();
  }, [offers, redeemCode, subtotal]);

  const handleRedeemCodeSubmit = (e) => {
    e.preventDefault();
    const code = e.target.redeemCode.value;
    setRedeemCode(code);

  };

  const handleLoyaltyReset = () => {
    setLoyalty(0)
    setDiscount(0)
  }



  return (
    <>
      <Helmet>
        <title>Checkout | The White</title>
      </Helmet>

      <SecondaryHeader />

      <div className='px-5 container mx-auto'>

        <div className="text-sm breadcrumbs">
          <ul className='text-xl poppins'>
            <li className='font-semibold'><a>Home</a></li>
            <li>Checkout</li>
          </ul>
        </div>

        <div className='grid grid-cols-5 gap-20 py-10'>

          <div className='md:col-span-3 col-span-5'>
            <h3 className='poppins font-semibold text-2xl uppercase'>
              <span className='mr-5'>1.</span>
              CONTACT INFORMATION
            </h3>

            <div className='border-l ml-2 pl-8 pt-5 pb-10'>
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={user?.email} placeholder='Email Address' className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded' />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
              <input type="tel" onChange={(e) => setPhone(e.target.value)} placeholder='Phone number' className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 rounded' />
              {errors.phone && <span className="text-red-500">{errors.phone}</span>}
            </div>

            <h3 className='poppins font-semibold text-2xl uppercase'>
              <span className='mr-5'>2.</span>
              BILLING ADDRESS
            </h3>

            <div className='border-l ml-2 pl-8 pt-5 pb-10'>

              <div className='grid sm:grid-cols-2 gap-5 mb-5'>
                <div>
                  <input type="text" onChange={(e) => setFname(e.target.value)} placeholder='First Name' className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 rounded' />
                  {errors.fname && <span className="text-red-500">{errors.fname}</span>}
                </div>
                <div>
                  <input type="text" onChange={(e) => setLname(e.target.value)} placeholder='Last Name' className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 rounded' />
                  {errors.lname && <span className="text-red-500">{errors.lname}</span>}
                </div>
              </div>

              <div className='mb-5'>
                <input type="text" onChange={(e) => setAddress(e.target.value)} placeholder='Address' className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 rounded' />
                {errors.address && <span className="text-red-500">{errors.address}</span>}
              </div>

              <div className='grid lg:grid-cols-2 gap-5 mb-5'>

                <div className='mb-5'>
                  <select value={selectedDivision} onChange={handleDivisionChange} className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 rounded'>
                    <option value="">--Select Division--</option>
                    {uniqueDivisions.map((division, index) => (
                      <option key={index} value={division}>{division}</option>
                    ))}
                  </select>
                  {errors.selectedDivision && <span className="text-red-500">{errors.selectedDivision}</span>}
                </div>

                <div className='mb-5'>
                  <select value={selectedDistrict} onChange={handleDistrictChange} className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 rounded'>
                    <option value="">--Select District--</option>
                    {divisionDistricts.map((address, index) => (
                      <option key={index} value={address.district}>{address.district}</option>
                    ))}
                  </select>
                  {errors.selectedDistrict && <span className="text-red-500">{errors.selectedDistrict}</span>}
                </div>

              </div>

              <div className="form-control">
                <label className="label cursor-pointer w-max gap-5">
                  <input type="checkbox" className="checkbox" onChange={() => setDiffererntShipping(!differentShipping)} />
                  <span className="label-text">Ship at different address</span>
                </label>
              </div>

              {
                differentShipping &&
                <div>
                  <h3 className='poppins font-semibold text-2xl uppercase my-5'>
                    Shipping ADDRESS
                  </h3>

                  <div className='grid grid-cols-2 gap-5 mb-5'>
                    <div>
                      <input type="text" onChange={(e) => setSfname(e.target.value)} placeholder='First Name' className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 rounded' />
                      {errors.sfname && <span className="text-red-500">{errors.sfname}</span>}
                    </div>

                    <div>
                      <input type="text" onChange={(e) => setSlname(e.target.value)} placeholder='Last Name' className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 rounded' />
                      {errors.slname && <span className="text-red-500">{errors.slname}</span>}
                    </div>

                  </div>

                  <div className='mb-5'>
                    <input type="text" onChange={(e) => setSphone(e.target.value)} placeholder='Phone number' className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 rounded' />
                    {errors.sphone && <span className="text-red-500">{errors.sphone}</span>}
                  </div>

                  <div className='mb-5'>
                    <input type="text" onChange={(e) => setSaddress(e.target.value)} placeholder='Address' className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 rounded' />
                    {errors.selectedSdivision && <span className="text-red-500">{errors.selectedSdivision}</span>}
                  </div>

                  <div className='grid sm:grid-cols-2 gap-5 mb-5'>

                    <div>
                      <select value={selectedSdivision} onChange={handleSdivisionChange} className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 rounded'>
                        <option value="">--Select Division--</option>
                        {uniqueDivisions.map((division, index) => (
                          <option key={index} value={division}>{division}</option>
                        ))}
                      </select>
                      {errors.selectedSdivision && <span className="text-red-500">{errors.selectedSdivision}</span>}
                    </div>

                    <div>
                      <select value={selectedSdistrict} onChange={handleSdistrictChange} className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 rounded'>
                        <option value="">--Select District--</option>
                        {sDivisionDistricts.map((address, index) => (
                          <option key={index} value={address.district}>{address.district}</option>
                        ))}
                      </select>
                      {errors.selectedSdistrict && <span className="text-red-500">{errors.selectedSdistrict}</span>}
                    </div>

                  </div>
                </div>
              }





            </div>

            <h3 className='poppins font-semibold text-2xl uppercase'>
              <span className='mr-5'>3.</span>
              Shipping method
            </h3>

            <div className='border-l ml-2 pl-8 pt-5 pb-10'>

              <div className='relative'>
                <input type="radio" id="inside-dhaka-city" name="shipping-method" class="ship-radio radio absolute top-0 bottom-0 left-2 my-auto" value={hasFreeDeliveryWithoutCode ? 0 : 80} onChange={handleShippingChange}
                  checked={deliveryFee === 80} />
                <label for="inside-dhaka-city" class="shipping-meth flex justify-between pl-10 pr-5 py-5 border-2 cursor-pointer">
                  <div class="flex items-center gap-4">
                    <h3 class="poppins font-semibold">Inside Dhaka (ঢাকা শহরের ভিতর)</h3>
                  </div>
                  <h4 class="poppins font-semibold">৳{hasFreeDeliveryWithoutCode ? '00.00' : '80.00'}</h4>
                </label>
              </div>

              <div className='relative'>
                <input type="radio" id="inside-dhaka" name="shipping-method" class="ship-radio radio absolute top-0 bottom-0 left-2 my-auto" value={hasFreeDeliveryWithoutCode ? 0 : 100} onChange={handleShippingChange}
                  checked={deliveryFee === 100} />
                <label for="inside-dhaka" class="shipping-meth flex justify-between pl-10 pr-5 py-5 border-2 cursor-pointer">
                  <div class="flex items-center gap-4">
                    <h3 class="poppins font-semibold">Inside Dhaka (ঢাকা বিভাগের ভিতর)</h3>
                  </div>
                  <h4 class="poppins font-semibold">৳{hasFreeDeliveryWithoutCode ? '00.00' : '100.00'}</h4>
                </label>
              </div>

              <div className='relative'>
                <input type="radio" id="outside-dhaka" name="shipping-method" class="radio absolute top-0 bottom-0 left-2 my-auto" value={hasFreeDeliveryWithoutCode ? 0 : 120}
                  onChange={handleShippingChange}
                  checked={deliveryFee === 120} />
                <label for="outside-dhaka" class="shipping-meth flex justify-between pl-10 pr-5 py-5 border-2 cursor-pointer">
                  <div class="flex items-center gap-4">
                    <h3 class="poppins font-semibold">Outside Dhaka (ঢাকার বাহিরে)</h3>
                  </div>
                  <h4 class="poppins font-semibold">৳{hasFreeDeliveryWithoutCode ? '00.00' : '120.00'}</h4>
                </label>
              </div>

              <div className='relative'>
                <input type="radio" id="outside-bd" name="shipping-method" class="radio absolute top-0 bottom-0 left-2 my-auto"
                  onChange={() => setOutsideBd(true)} />
                <label for="outside-bd" class="shipping-meth flex justify-between pl-10 pr-5 py-5 border-2 cursor-pointer">
                  <div class="flex items-center gap-4">
                    <h3 class="poppins font-semibold">Outside Bangladesh (বাংলাদেশের বাহিরে)</h3>
                  </div>
                  <h4 class="poppins font-semibold">Temporary unavaialbe!</h4>
                </label>
              </div>


            </div>

            <h3 className='poppins font-semibold text-2xl uppercase'>
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
                    <h3 className="poppins font-semibold capitalize">Cash on delivery</h3>
                  </div>
                </label>

                <div className={`pl-10 py-5 pr-5 shadow pay-details ${paymentMethod === "cod" ? 'block' : 'hidden'}`}>
                  Pay with cash upon delivery.
                </div>
              </div>

              <div className={`relative pay-box border-2 ${paymentMethod === "mt" ? 'border-black' : ''}`}>
                <input
                  type="radio"
                  id="mt"
                  name="payment-method"
                  onChange={() => setPaymentMethod('mt')}
                  className="pay-radio radio absolute  top-5 left-2 my-auto"
                />
                <label
                  htmlFor="mt"
                  className="shipping-meth flex justify-between pl-10 pr-5 py-5 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <h3 className="poppins font-semibold capitalize">Mobile Banking</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={bkash} className="h-5" alt="bKash" />
                    <img src={nagad} className="h-5" alt="Nagad" />
                    <img src={rocket} className="h-5" alt="Rocket" />
                    <img src={upay} className="h-5" alt="Upay" />
                  </div>
                </label>

                <div className={`${paymentMethod === "mt" ? 'block' : 'hidden'} `}>

                  <div className={`pl-10 py-5 pr-5 shadow pay-details grid md:grid-cols-4 grid-cols-2 gap-3 justify-center`}>
                    <input id='bkash' value='bkash' onChange={(e) => setMobileMethods(e.target.value)} type="radio" name='mm-method' className='invisible absolute mm-mthd' />
                    <label for='bkash' className='px-5 py-3 shadow flex flex-col items-center border-2'>
                      <img src={bkash} className='h-5' alt="" />
                      <h5 className='poppins font-semibold'>Bkash</h5>
                    </label>

                    <input id='nagad' value='nagad' onChange={(e) => setMobileMethods(e.target.value)} type="radio" name='mm-method' className='invisible absolute mm-mthd' />
                    <label for='nagad' className='px-5 py-3 shadow flex flex-col items-center border-2'>
                      <img src={nagad} className='h-5' alt="" />
                      <h5 className='poppins font-semibold'>Nagad</h5>
                    </label>

                    <input id='rocket' value='rocket' onChange={(e) => setMobileMethods(e.target.value)} type="radio" name='mm-method' className='invisible absolute mm-mthd' />
                    <label for='rocket' className='px-5 py-3 shadow flex flex-col items-center border-2'>
                      <img src={rocket} className='h-5' alt="" />
                      <h5 className='poppins font-semibold'>Rocket</h5>
                    </label>

                    <input id='upay' value='upay' onChange={(e) => setMobileMethods(e.target.value)} type="radio" name='mm-method' className='invisible absolute mm-mthd' />
                    <label for='upay' className='px-5 py-3 shadow flex flex-col items-center border-2'>
                      <img src={upay} className='h-5' alt="" />
                      <h5 className='poppins font-semibold'>Upay</h5>
                    </label>
                  </div>

                  <div className='pl-10 py-5 pr-5'>
                    <h3 className='poppins text-md'>Account type: <span className='font-bold'>Personal</span></h3>
                    <h3 className='poppins text-md mb-5'>Account number: <span className='font-bold'>01779744512</span></h3>

                    <label className='poppins text-md mb-5 font-semibold'>Your phone number</label>
                    <input type="text" onChange={(e) => setTransactionNumber(e.target.value)} placeholder='019xxxxxxxx' className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded' />

                    <label className='poppins text-md mb-5 font-semibold'>Transaction ID</label>
                    <input type="text" onChange={(e) => setTransactionId(e.target.value)} placeholder='2M7A5' className='poppins font-bold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded' />
                  </div>

                </div>

              </div>

            </div>


          </div>

          <div className='md:col-span-2 col-span-5'>
            <div className='p-5 shadow'>
              <h3 className="poppins font-semibold capitalize text-2xl mb-5">Order summary</h3>

              {
                cart.map((orderItem) => (

                  <div className='order-item flex gap-2 mb-5'>
                    <img src={`https://adminpanel.thewhitebd.com/uploads/product-thumbs/${allProducts.find(product => product.id === orderItem.product_id)?.thumbnail}`} className='w-14 h-auto' alt="" />

                    <div className='flex-1'>
                      <h3 className="poppins font-semibold capitalize text-xl">{allProducts.find(product => product.id === orderItem.product_id)?.title} ✕ {orderItem.quantity}</h3>

                      <p className="poppins font-semibold text-lg">
                        {allProducts.find(product => product.id === orderItem.product_id)?.variations.map((variation) => (
                          variation.attribute_value.id == orderItem.attribute_id && variation.attribute_value.name
                        ))}
                      </p>
                    </div>

                    <h3 className="aldrich-regular font-semibold capitalize text-xl">{orderItem.price * orderItem.quantity}৳</h3>
                  </div>
                ))
              }


              <hr className='mb-5' />

              <h3 className="poppins font-bold capitalize mb-5">Apply redeem code</h3>

              {!loyalty && (
                <form onSubmit={handleRedeemCodeSubmit} className="join items-center w-full gap-2 mb-5">
                  <div className='flex-1'>
                    <div>
                      <input
                        name="redeemCode"
                        className="poppins font-semibold w-full outline-none border-2 border-black px-5 py-3 rounded"
                        placeholder="Apply redeem code"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn rounded-none hover:bg-transparent hover:text-black border-2 border-black hover:border-black poppins px-5 py-3 font-semibold bg-black text-white"
                  >
                    Apply
                  </button>
                </form>
              )}
              {
                redeemCode && discount != 0 &&
                <div className='flex justify-between mb-4 text-red-500 font-semibold'>
                  <p>
                    {discount}৳ discount applied
                  </p>

                  <button onClick={() => setDiscount(0)} className='link'>Reset</button>
                </div>
              }



              {
                user && !redeemCode && <div className="join items-center justify-between w-full gap-2 mb-5">
                  <div>
                    <div>
                      <h3 className="poppins font-semibold capitalize mr-5">You have {user?.loyalty_points} points</h3>
                    </div>
                  </div>
                  <button className="btn rounded-none hover:bg-transparent hover:text-black border-2 border-black hover:border-black poppins px-5 py-3 font-bold bg-black text-white" onClick={() => document.getElementById('loyalty').showModal()}>Use Loyalty points</button>

                  <dialog id="loyalty" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 className="font-bold text-lg mb-5">Use loyalty points ({user?.loyalty_points} points)</h3>

                      <div className="join items-center w-full gap-2 mb-5">
                        <div className='flex-1'>
                          <div>
                            <input onChange={(e) => loyaltyfunc(e)} className="poppins font-bold w-full outline-none border-2 border-black px-5 py-3 rounded" type='text' placeholder="Use loyalty points" />
                          </div>
                        </div>
                        <button onClick={() => applyLoyalty()} className="btn rounded-none hover:bg-transparent hover:text-black border-2 border-black hover:border-black poppins px-5 py-3 font-bold bg-black text-white">Apply</button>
                      </div>
                      {
                        loyalty > 100 && (
                          <p className='text-lg font-bold'>
                            You will get {loyalty / 10}৳ off
                          </p>
                        )
                      }
                      {
                        loyalty == 0 ? (
                          <p className='text-red-400 text-sm'>Insufficient balance</p>
                        ) : loyalty < 100 ? (
                          <p className='text-red-400 text-sm'>Use At least 100 points</p>
                        ) : (
                          <p></p>
                        )
                      }
                    </div>
                  </dialog>
                </div>
              }

              {
                loyalty && discount != 0 &&
                <div className='flex justify-between mb-4 text-red-500 font-semibold'>
                  <p>
                    {discount}৳ discount applied
                  </p>

                  <button onClick={handleLoyaltyReset} className='link'>Reset</button>
                </div>
              }


              <div className='flex justify-between'>
                <h3 className="poppins font-semibold capitalize mb-5">Subtotal</h3>
                <h5 className='aldrich-regular font-semibold'>{calculateSubTotalPrice()}৳</h5>
              </div>

              {
                discount ? <div className='flex justify-between'>
                  <h3 className="poppins font-semibold capitalize mb-5">Discount</h3>
                  <h5 className='aldrich-regular font-semibold text-red-500'>- {discount}৳</h5>
                </div> : ''
              }


              <div className='flex justify-between'>

                <h3 className="poppins font-semibold capitalize mb-5">Delivery fee</h3>
                <div className='flex items-center'>
                  {hasFreeDeliveryWithoutCode && <p className='text-lime-500 poppins font-semibold mr-4'>(Free Delivery)</p>}

                  <h5 className='aldrich-regular font-semibold'>{deliveryFee}৳</h5>
                </div>

              </div>

              <div className='flex justify-between'>
                <h3 className="poppins font-semibold capitalize mb-5">Total</h3>
                <h5 className='aldrich-regular font-semibold'>{calculateTotalPrice()}৳</h5>
              </div>

              <button onClick={(e) => MakeOrder(e)} className="btn w-full rounded-none hover:bg-transparent hover:text-black border-2 border-black hover:border-black poppins px-5 py-3 font-bold bg-black text-white" disabled={outsideBd ? 'disabled' : ''}>Place Order</button>
            </div>
          </div>

        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box flex flex-col justify-center items-center">
          <h3 className="font-bold text-5xl poppins text-emerald-700">Order Confirmed!</h3>
          <CiCircleCheck className='text-9xl text-emerald-700' />
          <div className="modal-action ">
            <Link to='/' className="capitalize btn btn-neutral">Return Home</Link>
            <Link to='/track-order' className="capitalize btn btn-outline">Track my order</Link>
          </div>
        </div>
      </dialog>

      <Footer />
    </>
  )
}

export default Checkout