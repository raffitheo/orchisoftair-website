import LorePattern from '@assets/lore-pattern.webp';
import { Footer } from '@components/footer';
import { SEO } from '@components/seo';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

import './cookies-policy.sass';

interface CookiesPolicyProps extends React.HTMLAttributes<HTMLDivElement> {}

const CookiesPolicy = React.forwardRef<HTMLDivElement, CookiesPolicyProps>(
    ({ className, ...props }, ref) => {
        return (
            <React.Fragment>
                <SEO title="Informativa sui cookies" type="article" />

                <div
                    className={`cookies-policy${className ? ` ${className}` : ''}`}
                    ref={ref}
                    {...props}
                >
                    <div className="cookies-policy-header-box2">
                        <div className="cookies-policy-banner-box">
                            <div className="cookies-policy-header-banner">
                                <div className="cookies-policy-header">
                                    <div className="back-button">
                                        <Link to="/">Torna alla home</Link>
                                    </div>
                                </div>

                                <div>
                                    <h1>INFORMATIVA SUI COOKIES</h1>
                                    <div className="banner-date">
                                        {formatDate(new Date('2024-06-05'))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="video-gradient" />

                    <div
                        className="cookies-policy-main-container"
                        style={{
                            background: `url(${LorePattern}) no-repeat 50%`,
                        }}
                    >
                        <div className="cookies-policy-main-box">
                            <p>
                                Come descritto nella nostra{' '}
                                <Link to="/privacy-policy">
                                    Informativa sulla privacy
                                </Link>
                                , utilizziamo i cookies per migliorare
                                l'esperienza complessiva. La presente
                                Informativa fornisce ulteriori dettagli su come
                                e perché utilizziamo queste tecnologie sul
                                nostro sito web. I termini “Orchi”, “noi”, “ci”
                                e “nostro” includono l'A.S.D. Gli Orchi Trieste.
                                Utilizzando il nostro sito web, l'utente
                                acconsente alla memorizzazione e all'accesso ai
                                cookies e ad altre tecnologie sul proprio
                                dispositivo, in conformità con la presente
                                Politica sui cookies.
                            </p>

                            <h2>Cookies</h2>

                            <h3 style={{ marginTop: '1rem' }}>
                                Cosa sono i cookies?
                            </h3>

                            <p>
                                I cookies sono piccoli file di dati che vengono
                                scaricati sul dispositivo quando si visita un
                                sito web. Questi vengono poi inviati al sito web
                                di origine a ogni visita successiva o a un altro
                                sito web che li riconosce. I cookies sono utili
                                perché ci permettono di riconoscere il
                                dispositivo e migliorare l'esperienza di
                                navigazione.
                            </p>

                            <h3>Come utilizziamo i cookies?</h3>

                            <p>Utilizziamo i cookies per i seguenti scopi:</p>

                            <ul>
                                <li>
                                    <span>
                                        <b>Prestazioni, analisi e ricerca:</b>{' '}
                                        Per analizzare l'accesso e l'uso del
                                        sito web e monitorare le prestazioni.
                                        Utilizziamo servizi come{' '}
                                        <Link
                                            target="_blank"
                                            to="https://vercel.com/products/observability"
                                        >
                                            Vercel Analytics
                                        </Link>{' '}
                                        e{' '}
                                        <Link to="https://vercel.com/docs/speed-insights">
                                            Vercel Speed Insights
                                        </Link>
                                        per raccogliere informazioni
                                        sull'utilizzo del nostro sito.
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <b>Funzionalità:</b> Per ricordare le
                                        preferenze degli utenti e migliorare la
                                        navigazione tra le pagine.
                                    </span>
                                </li>
                            </ul>

                            <h3 style={{ marginTop: '1rem' }}>
                                Quanto tempo restano salvati i cookies?
                            </h3>

                            <p>
                                I cookies si distinguono in due categorie, a
                                seconda della durata con cui rimangono salvati
                                sul dispositivo:
                            </p>

                            <ul>
                                <li>
                                    <span>
                                        Cookies di sessione: Rimangono sul
                                        dispositivo solo durante la visita al
                                        nostro sito.
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Cookies persistenti: Rimangono sul
                                        dispositivo per un periodo più lungo,
                                        variabile a seconda delle loro funzioni.
                                    </span>
                                </li>
                            </ul>

                            <h2>Altre tecnologie</h2>

                            <h3 style={{ marginTop: '1rem' }}>
                                Archiviazione locale
                            </h3>

                            <p>
                                Utilizzata per memorizzare le preferenze degli
                                utenti.
                            </p>

                            <h2>Rinuncia ai cookies</h2>

                            <p>
                                La maggior parte dei dispositivi e dei browser
                                web sono impostati per accettare i cookies per
                                impostazione predefinita. Se si preferisce, è
                                possibile rimuovere o rifiutare i cookies. Per
                                ulteriori informazioni su come bloccare i
                                cookies, visitare il sito{' '}
                                <Link
                                    target="_blank"
                                    to="https://allaboutcookies.org/"
                                >
                                    allaboutcookies.org
                                </Link>
                                . Si noti che la scelta di rimuovere o rifiutare
                                i cookies potrebbe influire sulla disponibilità
                                e sulla funzionalità del nostro sito web.
                            </p>

                            <h2>Revisioni di questa politica</h2>

                            <p>
                                Questa Informativa può essere modificata
                                periodicamente. Provvederemo a informare gli
                                utenti pubblicando la versione più aggiornata
                                sul nostro sito web e modificando la data
                                all'inizio di questa pagina. In caso di
                                modifiche sostanziali, forniremo un ulteriore
                                avviso, come inviando un'e-mail o visualizzando
                                un avviso sul nostro sito web. Continuando a
                                utilizzare il sito web dopo l'entrata in vigore
                                di eventuali modifiche, gli utenti accetteranno
                                automaticamente l'Informativa modificata.
                            </p>

                            <div className="content-creators"></div>
                        </div>
                    </div>
                </div>

                <Footer />
            </React.Fragment>
        );

        function formatDate(date: Date) {
            const newDate = dayjs(date);
            const months = [
                'gennaio',
                'febbraio',
                'marzo',
                'aprile',
                'maggio',
                'giugno',
                'luglio',
                'agosto',
                'settembre',
                'ottobre',
                'novembre',
                'dicembre',
            ];

            const day = newDate.date();
            const month = months[newDate.month()];
            const year = newDate.year();

            return `${day} ${month} ${year}`;
        }
    },
);
CookiesPolicy.displayName = 'CookiesPolicy';

export type { CookiesPolicyProps };
export default CookiesPolicy;
