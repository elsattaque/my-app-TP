import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                setSuccessMessage('Inscription réussie');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Échec de l\'inscription');
            }
        } catch (error) {
            setErrorMessage('Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Inscription</h1>
            <form onSubmit={onRegister}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmer le mot de passe" required />
                <button type="submit">S'inscrire</button>
            </form>
            {isLoading && <Spinner />}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}