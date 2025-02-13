import { Link } from 'react-router';
import { getUserContext } from '../context/UserContext';

export default function Navbar() {
    const { user, setUser } = getUserContext();

    const onLogout = () => {
        localStorage.removeItem('token');
        setUser({ isAuthentified: false, email: '' });
    };

    return (
        <nav>
            <Link to="/">Accueil</Link>
            {user.isAuthentified ? (
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