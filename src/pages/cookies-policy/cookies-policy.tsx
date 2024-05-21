import Footer from '@components/footer';
import dayjs from 'dayjs';
import { HTMLAttributes, forwardRef } from 'react';

import LorePattern from '../../assets/lore-pattern.webp';

import './cookies-policy.css';

export interface CookiesPolicyProps extends HTMLAttributes<HTMLDivElement> {}

const CookiesPolicy = forwardRef<HTMLDivElement, CookiesPolicyProps>(
    ({ ...props }, ref) => {
        return (
            <div className="news" ref={ref} {...props}>
                <div className="cookies-polity-container" ref={ref} {...props}>
                    <div className="cookies-polity-header-box2">
                        <div className="cookies-polity-banner-box">
                            <div className="cookies-polity-header-banner">
                                <div className="cookies-polity-header">
                                    <div className="back-button">
                                        <a href="/">Torna indietro</a>
                                    </div>
                                </div>

                                <div>
                                    <h1>INFORMATIVA SUI COOKIES</h1>
                                    <div className="banner-date">
                                        {formatDate(new Date('2024-05-21'))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="cookies-polity-main-container"
                        style={{
                            background: `url(${LorePattern}) no-repeat 50%`,
                        }}
                    >
                        <div className="cookies-polity-main-box">
                            <p>
                                Come descritto nella nostra{' '}
                                <a href="/privacy-policy">
                                    Informativa sulla privacy
                                </a>
                                , utilizziamo i cookies per migliorare
                                l'esperienza complessiva. La presente
                                Informativa sui cookies fornisce ulteriori
                                dettagli su come e perché utilizziamo queste
                                tecnologie sul nostro sito web. I termini
                                “Orchi”, “noi”, “ci” e “nostro” includono il
                                direttivo dell'A.S.D. Gli Orchi Trieste.
                                Utilizzando il nostro sito web, l'utente
                                acconsente alla memorizzazione e all'accesso ai
                                cookies e ad altre tecnologie sul proprio
                                dispositivo, in conformità con la presente
                                Politica sui cookies.
                            </p>

                            <h3>Cookies</h3>

                            <p>
                                <strong>Cosa sono i cookies?</strong> I cookies
                                sono piccoli file di dati che vengono scaricati
                                sul dispositivo quando visitate un sito web. I
                                cookies vengono poi inviati al sito web di
                                origine a ogni visita successiva o a un altro
                                sito web che riconosce i cookies. I cookies sono
                                utili perché ci permettono di riconoscere il
                                dispositivo e migliorare la vostra esperienza di
                                navigazione.
                            </p>

                            <p>
                                <strong>Come utilizziamo i cookies?</strong>{' '}
                                Utilizziamo i cookies per i seguenti scopi:
                            </p>

                            <ul>
                                <li>
                                    <span>
                                        Prestazioni, analisi e ricerca: Per
                                        analizzare l'accesso e l'uso del sito
                                        web e monitorare le prestazioni.
                                        Utilizziamo servizi come{' '}
                                        <a
                                            href="https://marketingplatform.google.com/about/#?modal_active=none"
                                            target="_blank"
                                        >
                                            Google Analytics
                                        </a>{' '}
                                        per raccogliere informazioni
                                        sull'utilizzo del nostro sito.
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Funzionalità: Per ricordare le vostre
                                        preferenze e migliorare la navigazione
                                        tra le pagine.
                                    </span>
                                </li>
                            </ul>

                            <p>
                                <strong>
                                    Quanto tempo restano salvati i cookies?
                                </strong>{' '}
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

                            <h3 style={{ marginTop: '1rem' }}>
                                Altre tecnologie
                            </h3>

                            <p>
                                <strong>Archiviazione locale:</strong>{' '}
                                Utilizzata per memorizzare le preferenze degli
                                utenti.
                            </p>

                            <h3>Rinuncia ai cookies</h3>

                            <p>
                                La maggior parte dei dispositivi e dei browser
                                web sono impostati per accettare i cookies per
                                impostazione predefinita. Se si preferisce, è
                                possibile rimuovere o rifiutare i cookies. Per
                                ulteriori informazioni su come bloccare i
                                cookies, visitare{' '}
                                <a
                                    href="https://allaboutcookies.org/"
                                    target="_blank"
                                >
                                    allaboutcookies.org
                                </a>
                                . Si noti che la scelta di rimuovere o rifiutare
                                i cookies potrebbe influire sulla disponibilità
                                e sulla funzionalità del nostro sito web.
                            </p>

                            <h3>Revisioni di questa politica</h3>

                            <p>
                                Questa Informativa sui cookies può essere
                                modificata di tanto in tanto. Provvederemo a
                                informare l'utente pubblicando la versione più
                                aggiornata sul nostro sito web e modificando la
                                data all'inizio di questa pagina. In caso di
                                modifiche sostanziali, forniremo un ulteriore
                                avviso, come inviando un'e-mail o visualizzando
                                un avviso sul nostro sito web. Continuando a
                                utilizzare il sito web dopo l'entrata in vigore
                                di eventuali modifiche, l'utente accetta
                                l'Informativa sui cookies modificata.
                            </p>

                            <div className="content-creators"></div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );

        function formatDate(date: Date): string {
            const newDate = dayjs(date);
            const months: Array<string> = [
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

            const day: number = newDate.date();
            const month: string = months[newDate.month()];
            const year: number = newDate.year();

            return `${day} ${month} ${year}`;
        }
    },
);

export default CookiesPolicy;
