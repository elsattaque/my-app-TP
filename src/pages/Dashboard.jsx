import { useState, useEffect } from 'react';
import getUserContext from '../context/UserContext';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = getUserContext();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(async () => {
                try {
                    const response = await fetch('http://localhost:3000/dashboard', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const json = await response.json();
                        setData(json);
                    } else {
                        setData({ error: 'Erreur d\'autorisation' });
                    }
                } catch (error) {
                    console.error('Erreur lors de la récupération des données:', error);
                } finally {
                    setIsLoading(false);
                }
            }, 3000);
        };

        fetchData();
    }, [token]);

    return (
        <div>
            <h1>Tableau de bord</h1>
            {isLoading && <p>Chargement...</p>}
            {data && data.email && <h2>Bienvenue {data.email.split('@')[0]}</h2>}
            {data && data.email && <p>Email: {data.email}</p>}
            {data && data.error && <p>Erreur: {data.error}</p>}
        </div>
    );
}