import { useNavigate } from "react-router";
import getUserContext from '../context/UserContext';
import { useEffect } from "react";

export default function SecureRoute({ children }) {
    const userContext = getUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userContext.user.isAuthentified) {
            navigate("/login");
        }
    }, [userContext.user.isAuthentified, navigate]);

    return userContext.user.isAuthentified ? children : null;
}
