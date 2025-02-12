import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserContext from '../context/UserContext';
import Spinner from '../components/Spinner';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const userContext = getUserContext();
    const navigate = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        if (userContext.user.isAuthentified) {
            navigate("/dashboard");
        }

        const data = {
            email: email,
            password: password
        }

        try {
            fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(async res => {
                    setTimeout(async () => {
                        switch (res.status) {
                            case 200:
                                const json = await res.json();
                                localStorage.setItem("token", json.token);
                                const user = {
                                    email: email,
                                    isAuthentified: true
                                };
                                await userContext.setUser(user);
                                navigate("/Dashboard");
                                break;
                            case 404:
                                setErrorMessage("Utilisateur inconnu");
                                break;
                            case 400:
                                setErrorMessage("Texte incorrecte");
                                break;
                            default:
                                console.log(res.status);
                                setErrorMessage("Erreur");
                                break;
                        }
                        setIsLoading(false);
                    }, 3000);
                })
                .catch(err => console.log("Erreur:", err));
        } catch (error) {
            setErrorMessage('Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={onLogin}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
                <button type="submit">Se connecter</button>
            </form>
            {isLoading && <Spinner />}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}