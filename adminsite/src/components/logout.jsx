import Cookies from "universal-cookie";
import { Navigate } from "react-router";

const Logout = () => {
    const cookies = new Cookies();
    cookies.remove("Token");
    return <Navigate to="/login" />;
};

export default Logout;
