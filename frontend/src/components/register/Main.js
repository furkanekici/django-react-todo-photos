import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import useRegister from "../hooks/useRegister";
import alerts from '../general/Alert';

function Main() {
    const [darkMode, setDarkMode] = useOutletContext();
    const [whichAlert, setWhichAlert] = useState("none");
    const [alertMessage, setAlertMessage] = useState("");

    const formData = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const register = useRegister();
    const { infoAlert, successAlert, warningAlert, errorAlert } = alerts();

    const from = location.state?.from.pathname || "/login";

    const onSubmit = async (e) => {
        e.preventDefault();
        const { username, password1, password2 } = formData.current;
        const response = await register(username.value, password1.value, password2.value);
        if (response === undefined || response.status === 500) {
            setAlertMessage("Something went wrong");
            setWhichAlert("error");
        } else if (response.status === 201) {
            setAlertMessage("Registration successful");
            setWhichAlert("success");
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1000);
        } else if (response.status === 400) {
            console.log(response.data);
            setAlertMessage("Invalid credentials");
            setWhichAlert("error");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setWhichAlert("none");
        }, 3000)
    }, [whichAlert]);

    return (
        <div className='relative'>
            <div className='absolute inset-x-0 w-3/4 md:w-2/5 mx-auto'>
                {whichAlert === "info" ? infoAlert(alertMessage) : whichAlert === "success" ? successAlert(alertMessage) : whichAlert === "warning" ? warningAlert(alertMessage) : whichAlert === "error" ? errorAlert(alertMessage) : null}
            </div>
            <div className={darkMode ? "min-h-screen py-6 bg-dark-pattern flex flex-col justify-center sm:py-12" : "min-h-screen py-6 bg-light-pattern flex flex-col justify-center sm:py-12"}>
                <div className='relative py-2 sm:max-w-xl sm:mx-auto'>
                    <div className={!darkMode ? 'absolute inset-0 bg-gradient-to-r from-cyan-500 to-zinc-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl' : 'absolute inset-0 bg-gradient-to-r from-yellow-600 to-white shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'} ></div>
                    <div className={!darkMode ? 'relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20' : 'relative px-4 py-10 bg-[#272935] shadow-lg sm:rounded-3xl sm:p-20'}>
                        <div className='max-w-md mx-auto'>
                            <div>
                                <h1 className='text-2xl font-semibold'>Register</h1>
                            </div>
                            <form ref={formData} className='mt-2' onSubmit={onSubmit}>
                                <div>
                                    <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
                                    <input
                                        id='username'
                                        name='username'
                                        type="text"
                                        placeholder="ahmethankaya"
                                        className={'input input-bordered input-primary w-full mb-2'}
                                    />
                                </div>
                                <div>
                                    <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="password1">Password</label>
                                    <input
                                        id='password1'
                                        name='password1'
                                        type="password"
                                        placeholder="********"
                                        className={'input input-bordered input-primary w-full mb-2'}
                                    />
                                </div>
                                <div>
                                    <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="password2">Confirm Password</label>
                                    <input
                                        id='password2'
                                        name='password2'
                                        type="password"
                                        placeholder="********"
                                        className={'input input-bordered input-primary w-full mb-2'}
                                    />
                                </div>
                                <button type="submit" className='btn w-full mt-3'>Create an account</button>
                            </form>
                            <div className='divider'>OR</div>
                            <div>
                                <button className='btn btn-secondary w-full mx-auto' onClick={() => {
                                    navigate("/login");
                                }}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main