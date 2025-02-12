import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { getUserContext } from '../context/UserContext';

export default function Navbar() {
    const { user, setUser } = getUserContext();

    const onLogout = () => {
        localStorage.removeItem('token');
        setUser({ isAuthenticated: false, email: '' });
    };

    return (
        <nav>
            <Link to="/">Accueil</Link>
            {user.isAuthenticated ? (
                <>
                    <Link to="/dashboard">Tableau de bord</Link>
                    <button onClick={onLogout}>Se déconnecter</button>
                </>
            ) : (
                <>
                    <Link to="/register">S'inscrire</Link>
                    <Link to="/login">Se connecter</Link>
                </>
            )}
        </nav>
    );
}