import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ toggleForm, onLogin }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')
    const navigate = useNavigate();


    const submitHandler = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "Admin@123") {
            onLogin("admin");
            navigate("/admin");
        }

        // Get saved user from localStorage
        const savedUser = JSON.parse(localStorage.getItem("user"));

        // Basic validation
        if (!username || !password) {
            setError("All fields are required");
            return;
        }

        if (!savedUser) {
            setError("No user found. Please sign up first.");
            return;
        }

        if (username !== savedUser.username || password !== savedUser.password) {
            setError("username or password does't exist");
            return;
        }

        setError('');
        setUsername('');
        setPassword('');

        onLogin("employee");
        navigate('/');
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white p-8 rounded-md shadow-md w-80">
                {
                    error && (
                        <p className="text-red-500 text-sm font-medium text-center">{error}</p>
                    )
                }
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
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
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            placeholder="Password"
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
                        Login
                    </button>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Not a member?{' '}
                        <span onClick={toggleForm} className="text-blue-500 hover:underline cursor-pointer">
                            Signup
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );

}

export default Login;

