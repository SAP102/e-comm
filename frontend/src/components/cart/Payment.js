import React, { useEffect, useRef } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createOrder } from '../../actions/orderAction';
import ConfirmStep from '../page/ConfirmStep';

function Payment() {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );
            const client_secret = data.client_secret;

            if (!stripe || !elements) return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });
            const { paymentIntent } = result;
            switch (paymentIntent.status) {
                case "succeeded":
                    order.paymentInfo = {
                        id: paymentIntent.id,
                        status: paymentIntent.status
                    }
                    dispatch(createOrder(order))
                    navigate('/success')
                    toast.success("Payment succeeded", {
                        position: "top-right",
                        autoClose: 1500,
                    })
                    window.localStorage.setItem("cartItems", JSON.stringify([]));
                    // localStorage.clear("cartItems");
                    break;
                case "processing":
                    alert("Your payment is processing.")
                    break;
                case "requires_payment_method":
                    alert("Your payment was not successful, please try again.")
                    break;
                default:
                    alert("Something went wrong.")
                    break;
            }
        } catch (error) {
            payBtn.current.disabled = false
            toast.error(error, {
                position: "top-right",
                autoClose: 1500,
            })
        }
    };
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 1500,
            })
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    return (
        <>

            <ConfirmStep />
            <div className='my-5'>
                <h1 
                className='my-5'
                >Payment</h1>
                <div className='border-2 py-6 px-5'>
                    <CardElement />
                </div>
                <button
                    type='submit'
                    className="inline-flex items-center rounded-md border border-transparent my-5 bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    ref={payBtn}
                    onClick={(e) => submitHandler(e)}
                >
                    Pay-  {orderInfo && orderInfo.totalPrice}
                </button>
                <ToastContainer />
            </div >
        </>
    )
}

export default Payment
