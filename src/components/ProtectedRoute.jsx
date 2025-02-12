import { useNavigate } from "react-router-dom";
import getUserContext from '../context/UserContext';
import { useEffect } from "react";

export default function SecureRoute({ children }) {
    const userContext = getUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userContext.isAuthentified) {
            navigate("/login");
        }
    }, [userContext.isAuthentified, navigate]);

    return userContext.isAuthentified ? children : null;
}
