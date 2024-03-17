import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/reducer";

const Login = () => {
    const [email, setEmail] = useState("guest@gmail.com");
    const [password, setPassword] = useState("123456");
    const [submitStatus, setSubmitStatus] = useState(false);
    const [message, setMessage] = useState("");
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus(true);
        setMessage("Submitting...");
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}users/login`, {
                email,
                password,
            });
            if (res.response) {
                setMessage(res.response.data.error);
            }
            if (res.data) {
                setMessage("Logged In");
                dispatch(
                    login({
                        name: res.data.name,
                        token: res.data.token,
                        email: res.data.email,
                    })
                );
                navigate("/");
            }
        } catch (error) {
            setMessage("Something went wrong!");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-5 rounded-2xl p-4 py-8 bg-white w-1/2 h-max shadow-2xl shadow-blue-500/50"
            >
                <div className="text-4xl font-medium">Sign In</div>
                <div className="text-xl text-gray-400/70">
                    Welcome back to the community
                </div>
                <div className="flex flex-col w-1/2 gap-5">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="px-4 py-3 bg-gray-400/30 rounded-lg w-full focus-visible:outline-blue-500/60 text-lg"
                    />
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="px-4 py-3 bg-gray-400/30 rounded-lg w-full focus-visible:outline-blue-500/60 text-lg"
                    />
                </div>
                <div className="flex flex-row w-1/2 justify-between">
                    <div>
                        <span className="text-blue-500 px-1 cursor-default">ON</span>
                        Remember Me
                    </div>
                    <Link className="text-blue-500 cursor-pointer" to={"#"}>
                        Forgot Password?
                    </Link>
                </div>
                <div className="w-1/2">
                    <button
                        type="submit"
                        className="w-full p-2 rounded-xl text-lg bg-blue-500 text-white"
                    >
                        Sign In
                    </button>
                </div>
                <div>
                    Don&apos;t have an account yet?{" "}
                    <Link to={"/register"} className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </div>
                {submitStatus && <div className="p-2 text-blue-500">{message}</div>}
            </form>
        </div>
    );
};

export default Login;
