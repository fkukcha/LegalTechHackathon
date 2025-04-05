import React, { useEffect, useState } from 'react';
import './App.css';

interface Bewerbung {
    frist: string;
    prozess: string[];
    kontakt: {
        telefon: string;
        email: string;
        website: string;
    };
}

interface Förderung {
    institution: string;
    name: string;
    beschreibung: string;
    betrag: string;
    währung: string;
    voraussetzungen: string[];
    bewerbung: Bewerbung;
    favicon: string;
}

const App: React.FC = () => {
    const [data, setData] = useState<Förderung[]>([]);
    const [expanded, setExpanded] = useState<number | null>(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setData(data.förderungen));
    }, []);

    const toggleExpand = (index: number) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-brand">Meine App</div>
                <div className="navbar-nav">
                    <a className="nav-item" href="#">Home</a>
                    <a className="nav-item" href="#">Über uns</a>
                </div>
            </nav>

            <div className="content">
                <h3>Willkommen zur Förderungsapp!</h3>
                <p>Liste der Förderungen</p>
                {data.map((förderung, index) => (
                    <div key={index} className="förderung">
                        <h4 onClick={() => toggleExpand(index)} style={{ cursor: 'pointer' }}>
                            {förderung.name}
                        </h4>
                        {expanded === index && (
                            <div>
                                <p>{förderung.beschreibung}</p>
                                <p>Betrag: {förderung.betrag} {förderung.währung}</p>
                                <p>Voraussetzungen:</p>
                                <ul>
                                    {förderung.voraussetzungen.map((voraussetzung, i) => (
                                        <li key={i}>{voraussetzung}</li>
                                    ))}
                                </ul>
                                <p>Bewerbungsfrist: {förderung.bewerbung.frist}</p>
                                <p>Bewerbungsprozess:</p>
                                <ul>
                                    {förderung.bewerbung.prozess.map((schritt, i) => (
                                        <li key={i}>{schritt}</li>
                                    ))}
                                </ul>
                                <p>Kontakt:</p>
                                <p>Telefon: {förderung.bewerbung.kontakt.telefon}</p>
                                <p>Email: {förderung.bewerbung.kontakt.email}</p>
                                <p>Website: <a href={förderung.bewerbung.kontakt.website}>{förderung.bewerbung.kontakt.website}</a></p>
                                <img src={förderung.favicon} alt={`${förderung.name} favicon`} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;