import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const GetUser = ({ children }) => { 
    const [user, setUser] = useState({
        isAuthentified: false,
        email: ''
    }); 

    return (
        <UserContext.Provider value={{ user, setUser }}> 
            {children}
        </UserContext.Provider>
    );
};

export function getUserContext() {
    const userContext = useContext(UserContext);
    return userContext;
}

export default getUserContext;