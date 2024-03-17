import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/reducer";

const Navbar = () => {
    const name = useSelector((state) => state.user.name);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="flex flex-row justify-between p-4 px-6 bg-primary-blue text-xl text-white">
            {name && (
                <div className="cursor-default">
                    Hello {name}!
                </div>
            )}
            <div className={`flex flex-row gap-10 ${isAuthenticated ? '' : 'justify-between  w-full'}`}>
                {isAuthenticated ? (
                    <button onClick={handleLogout} className="hover:underline">
                        Logout
                    </button>
                ) : (
                    <Link to={"login"} className="cursor-pointer hover:underline">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
