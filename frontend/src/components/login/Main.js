import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import useLogin from "../hooks/useLogin";
import alerts from '../general/Alert';

function Main() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [darkMode, setDarkMode] = useOutletContext();
    const [whichAlert, setWhichAlert] = useState("none");
    const [alertMessage, setAlertMessage] = useState("");
    const [isFirstTimeForUsername, setIsFirstTimeForUsername] = useState(true);
    const [isFirstTimeForPassword, setIsFirstTimeForPassword] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const login = useLogin();
    const { infoAlert, successAlert, warningAlert, errorAlert } = alerts();

    const from = location.state?.from.pathname || "/";

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await login(username, password);
        console.log(response);
        if (response === undefined || response.status === 500) {
            setAlertMessage("Something went wrong");
            setWhichAlert("error");
        } else if (response.status === 200) {
            setAlertMessage("Login successful");
            setWhichAlert("success");
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1000);
        } else if (response.status === 400) {
            setAlertMessage("Invalid username or password");
            setWhichAlert("error");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setWhichAlert("none");
        }, 3000)
    }, [whichAlert])

    return (
        <div className='relative'>
            <div className='absolute inset-x-0 w-3/4 md:w-2/5 mx-auto'>
                {whichAlert === "info" ? infoAlert(alertMessage) : whichAlert === "success" ? successAlert(alertMessage) : whichAlert === "warning" ? warningAlert(alertMessage) : whichAlert === "error" ? errorAlert(alertMessage) : null}
            </div>
            <div className={darkMode ? "min-h-screen py-6 bg-dark-pattern flex flex-col justify-center sm:py-12" : "min-h-screen py-6 bg-light-pattern flex flex-col justify-center sm:py-12"}>
                <div className='relative py-2 sm:max-w-xl sm:mx-auto'>
                    <div className={!darkMode ? 'absolute inset-0 bg-gradient-to-r from-emerald-600 to-zinc-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl' : 'absolute inset-0 bg-gradient-to-r from-amber-700 to-white shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'} ></div>
                    <div className={!darkMode ? 'relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20' : 'relative px-4 py-10 bg-[#272935] shadow-lg sm:rounded-3xl sm:p-20'}>
                        <div className='max-w-md mx-auto'>
                            <div>
                                <h1 className='text-2xl font-semibold'>Login</h1>
                            </div>
                            <form className='m-2' onSubmit={onSubmit}>
                                <div>
                                    <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
                                    <input
                                        id='username'
                                        type="text"
                                        placeholder="ahmethankose"
                                        className={isFirstTimeForUsername ? 'input input-bordered input-primary w-full mb-2' : !username ? 'input input-bordered input-error w-full mb-2' : 'input input-bordered input-primary w-full mb-2'}
                                        value={username}
                                        onChange={(e) => { setUsername(e.target.value); setIsFirstTimeForUsername(false); }}
                                    />
                                    {isFirstTimeForUsername ? null : !username ? <p className='text-red-500 text-xs italic mb-2'>Please enter your username!</p> : null}
                                </div>
                                <div>
                                    <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                                    <input
                                        id='password'
                                        type="password"
                                        placeholder="Password"
                                        className={isFirstTimeForPassword ? 'input input-bordered input-primary w-full mb-2' : !password ? 'input input-bordered input-error w-full mb-2' : 'input input-bordered input-primary w-full mb-2'}
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setIsFirstTimeForPassword(false); }}
                                    />
                                    {isFirstTimeForPassword ? null : !password ? <p className='text-red-500 text-xs italic mb-2'>Please enter your password!</p> : null}
                                </div>
                                <div>
                                    <button type="submit" className='btn w-full'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main