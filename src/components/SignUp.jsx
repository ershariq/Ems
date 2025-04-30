import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const SignUp = ({ toggleForm }) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState('')


    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(username, email, password, confirmPassword);

        // validation
        if (password.length < 8) {
            setError("Password Must be 8 characters long");
            return;
        }
        if (password !== confirmPassword) {
            setError("Password Must be Same as Confirm Password");
            return;
        }
        if (!/[!@#$%^&*()"'?<>.,]/.test(password)) {
            setError("Password Must have Special Character");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password Must have Capital letter");
            return;
        }

        setError('');

        // ✅ Save username & password to localStorage
        const userData = {
            username,
            password,
        };

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        localStorage.setItem('user', JSON.stringify(userData));

        toast.success('Account created successfully! You can now log in.', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">

            <div className="bg-white p-8 rounded-md shadow-md w-96">
                {
                    error && (
                        <p className="text-red-500 text-sm font-medium text-center">{error}</p>
                    )
                }
                <h2 className="text-2xl font-bold text-center mb-4">SignUp</h2>
                <form onSubmit={(e) => {
                    submitHandler(e);
                }}>
                    <div className="mb-4">
                        <input
                            required
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text"
                            placeholder="Username"
                            className="w-full border-b border-gray-400 focus:outline-none py-2 placeholder-gray-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            required
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            placeholder="Email"
                            className="w-full border-b border-gray-400 focus:outline-none py-2 placeholder-gray-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            required
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            placeholder="Password"
                            className="w-full border-b border-gray-400 focus:outline-none py-2 placeholder-gray-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            required
                            value={confirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full border-b border-gray-400 focus:outline-none py-2 placeholder-gray-500"
                        />
                    </div>
                    <div className="mb-4 text-sm text-gray-500 hover:underline cursor-pointer">
                        Forgot Password?
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
                    >
                        SignUp
                    </button>
                    <ToastContainer />
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <span onClick={toggleForm} className="text-blue-500 hover:underline cursor-pointer">
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
