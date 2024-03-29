import React from 'react'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItems } = useSelector((state) => state.cart)

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty))
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty))
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    const shippingCharge = subtotal > 1000 ? 0 : 100
    const tax = subtotal * 0.18
    const totalPrice = subtotal + shippingCharge + tax

    const removeItems = (id) => {
        dispatch(removeItemsFromCart(id))
    }
    const checkoutHandler = () => {
        navigate("/order/Shipping")
    }

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">Shopping Cart.</h1>
                    {cartItems.length === 0 ?
                        <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 sm:px-6 lg:px-8">
                            <div className="my-auto flex-shrink-0 py-16 sm:py-32">
                                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Cart is Emty</h1>
                                {/* <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p> */}
                                <div className="mt-6">
                                    <Link to="/" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                                        Go back home
                                        <span aria-hidden="true"> &rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </main>
                        :
                        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                            <section aria-labelledby="cart-heading" className="lg:col-span-7">
                                <h2 id="cart-heading" className="sr-only">
                                    Items in your shopping cart
                                </h2>
                                <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
                                    {cartItems.map((product) => (
                                        <li key={product.product} className="flex py-6 sm:py-10">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={product.image}
                                                    alt=""
                                                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                                                />
                                            </div>
                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <p className="font-medium text-gray-700 hover:text-gray-800">
                                                                    {product.name}
                                                                </p>
                                                            </h3>
                                                        </div>
                                                        <div className="mt-1 flex text-sm">
                                                            <p className="text-gray-500">Category : {product.category}</p>
                                                        </div>
                                                        <p className="text-gray-500">Qty : {product.quantity}</p>
                                                        <p className="mt-1 text-sm font-medium text-gray-900">₹{product.price * product.quantity}</p>
                                                    </div>
                                                    <div className="mt-4 sm:mt-0 sm:pr-9">
                                                        <button onClick={() => decreaseQuantity(product.product, product.quantity)}>-</button>
                                                        <input type="number" value={product.quantity} readOnly />
                                                        <button onClick={() => increaseQuantity(product.product, product.quantity, product.stock)}>+</button>
                                                        <div className="absolute top-0 right-0">
                                                            <button onClick={() => removeItems(product.product)} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                                                <span className="sr-only">Remove</span>
                                                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                                    {product.stock <= 1 ? (
                                                        <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                                                    ) : (
                                                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                                                    )}
                                                    <span>{product.stock <= 1 ? `Ships in 3–4 weeks` : 'In stock'}</span>
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                            {/* Order summary */}
                            <section
                                aria-labelledby="summary-heading"
                                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                            >
                                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                    Order summary
                                </h2>
                                <dl className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-600">Subtotal</dt>
                                        <dd className="text-sm font-medium text-gray-900">₹{subtotal}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="flex items-center text-sm text-gray-600">
                                            <span>Shipping estimate</span>
                                            <a href="/" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Learn more about how shipping is calculated</span>
                                                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                            </a>
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">₹{shippingCharge}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="flex text-sm text-gray-600">
                                            <span>Tax estimate</span>
                                            <a href="/" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Learn more about how tax is calculated</span>
                                                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                            </a>
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">₹{tax}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                                        <dd className="text-base font-medium text-gray-900">₹{totalPrice}</dd>
                                    </div>
                                </dl>
                                <div className="mt-6">
                                    <button
                                        onClick={checkoutHandler}
                                        type="submit"
                                        className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </section>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default Cart
