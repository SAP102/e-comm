import React from 'react';
import { Popover, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/userAction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from 'react'

function Header({ setSearchField }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { cartItems } = useSelector((state) => state.cart)


  const searchHandler = (event) => {
    setSearchField(event.target.value)
  }

  const logoutuser = () => {
    dispatch(logout())
    toast.success('Logout successfully', {
      position: "top-right",
      autoClose: 1500,
    });
    navigate('/')
  }


  return (
    <>
      <header className="relative ">
        {/* Top navigation */}
        <nav aria-label="Top" className="relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center">
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                    // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <Link to={"/products"} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Products</Link>
                  <span className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Category</span>
                  <Link to={"/about"} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">About</Link>
                </div>
              </Popover.Group>


              <div className="ml-auto flex items-center">
                {
                  isAuthenticated ?
                    ""
                    :
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link to='/login' className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Sign in
                      </Link>
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                      <Link to="/signup" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Create account
                      </Link>
                    </div>

                }

                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a href="/" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div> */}

                <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        disabled = {location.pathname === "/products" ? false: true}
                        placeholder={location.pathname === "/products" ? " Search something.." : " " + " Disabled"} 
                        type="search"
                        onChange={ searchHandler}
                      />
                    </div>
                  </div>
                </div>
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartItems.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>

                {
                  isAuthenticated ?
                    <div className="hidden lg:ml-8 lg:flex">
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="flex items-center rounded-full  text-gray-400 hover:text-gray-600 focus:outline-none  ">
                            <div className="flex items-center">
                              <div>
                                <img
                                  className="inline-block h-9 w-9 rounded-full"
                                  src={user?.avatar?.url ? user?.avatar?.url : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                  alt={user?.avatar?.public_id}
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user?.name}</p>
                                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                              </div>
                            </div>
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-[9999] mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/account"
                                    className={(
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'block px-4 py-2 text-sm'
                                    )}
                                  >
                                    Account settings
                                  </Link>
                                )}
                              </Menu.Item>
                              {
                                user?.role === "admin" &&
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/admin/dashbord"
                                      className={(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                      )}
                                    >
                                      deshbord
                                    </Link>
                                  )}
                                </Menu.Item>
                              }
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/orders"
                                    className={(
                                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                      'block px-4 py-2 text-sm'
                                    )}
                                  >
                                    Orders
                                  </Link>
                                )}
                              </Menu.Item>
                              <div>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => logoutuser()}
                                      className={(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full px-4 py-2 text-left text-sm'
                                      )}
                                    >
                                      Sign out
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    :
                    ""
                }

              </div>
            </div>
          </div>
        </nav>

        {/* Hero section */}
        <ToastContainer />
      </header>

    </>
  )
}

export default Header
