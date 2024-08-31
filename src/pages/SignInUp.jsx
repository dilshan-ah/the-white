import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FaEnvelope, FaKey, FaUser } from 'react-icons/fa'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import AuthUser from '../../auth/AuthUser'
import { Link, useNavigate } from 'react-router-dom'

const SignInUp = () => {

    const navigate = useNavigate();

    const { http, setToken, user } = AuthUser();

    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRemembered, setIsRemembered] = useState(false)

    useEffect(() => {
        if (user && user.id) {
            navigate('/')
        }

    }, [user, navigate]);

    const SignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await http.post('/register', { email: email, password: password, name: name });
            setToken(res.data.user, res.data.access_token);
            navigate('/')
        } catch (error) {
            console.error('Register failed:', error);
        }
    }

    const SignIn = async (e) => {
        e.preventDefault();

        try {
            const res = await http.post('/login', {
                email: email,
                password: password,
                remember_token: isRemembered
            });

            setToken(res.data.user, res.data.access_token); // Ensure setToken function is defined
            navigate('/')
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Handle validation errors from Laravel
                setErrors(error.response.data.errors);
            } else if (error.response && error.response.status === 401) {
                // Handle unauthorized errors
                setErrors({ general: "Credentials doesn't match" });
            } else {
                console.error('Login failed:', error);
                setErrors({ general: 'An unexpected error occurred. Please try again later.' });
            }
        }
    };


    const rememberMeToken = isRemembered ? localStorage.getItem('rememberMeToken') : null;
    return (
        <>
            <Helmet>
                <title>Sign up/in | The White BD</title>
            </Helmet>
            <div className='container px-10 mx-auto py-20'>
                <Tabs className='shadow'>
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
                            <Link type="button" className="btn" to='/'>
                                Back
                            </Link>

                            <button onClick={(e) => SignUp(e)} className='btn bg-black text-white'>Register</button>
                        </div>
                    </TabPanel>
                    <TabPanel>

                        <form onSubmit={SignIn}>
                            <label className="input input-bordered flex items-center gap-2 mb-5">
                                <FaEnvelope />
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    className="grow"
                                    placeholder="Email address"
                                    name='email'
                                />
                            </label>
                            {errors.email && <p className="text-red-500 -mt-5 mb-5">{errors.email[0]}</p>}
                            {errors.general && <p className="text-red-500 -mt-5 mb-5">{errors.general}</p>}

                            <label className="input input-bordered flex items-center gap-2 mb-5">
                                <FaKey />
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="grow"
                                    placeholder="Password"
                                    name='password'
                                />
                            </label>
                            {errors.password && <p className="text-red-500 -mt-5 mb-5">{errors.password[0]}</p>}

                            <div className="form-control mb-5">
                                <label className="label cursor-pointer justify-start">
                                    <input
                                        onChange={() => setIsRemembered(!isRemembered)}
                                        type="checkbox"
                                        className="checkbox mr-5"
                                    />
                                    <span className="label-text">Remember me</span>
                                </label>
                            </div>

                            <div className='flex gap-5 justify-end items-center'>
                                <Link type="button" className="btn" to='/'>
                                    Back
                                </Link>
                                <button type="submit" className='btn bg-black text-white'>
                                    Login
                                </button>
                            </div>
                        </form>

                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}

export default SignInUp