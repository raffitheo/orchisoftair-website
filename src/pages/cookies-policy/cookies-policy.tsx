import Footer from '@components/footer';
import dayjs from 'dayjs';
import { HTMLAttributes, forwardRef } from 'react';

import LorePattern from '../../assets/lore-pattern.webp';

import './cookies-policy.sass';

export interface CookiesPolicyProps extends HTMLAttributes<HTMLDivElement> {}

const CookiesPolicy = forwardRef<HTMLDivElement, CookiesPolicyProps>(({ ...props }, ref) => {
    return (
        <div ref={ref} {...props}>
            <div className="cookies-policy-container">
                <div className="cookies-policy-header-box2">
                    <div className="cookies-policy-banner-box">
                        <div className="cookies-policy-header-banner">
                            <div className="cookies-policy-header">
                                <div className="back-button">
                                    <a href="/">Torna alla home</a>
                                </div>
                            </div>

                            <div>
                                <h1>INFORMATIVA SUI COOKIES</h1>
                                <div className="banner-date">{formatDate(new Date('2024-05-22'))}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="cookies-policy-main-container"
                    style={{
                        background: `url(${LorePattern}) no-repeat 50%`
                    }}
                >
                    <div className="cookies-policy-main-box">
                        <p>
                            Come descritto nella nostra <a href="/privacy-policy">Informativa sulla privacy</a>,
                            utilizziamo i cookies per migliorare l'esperienza complessiva. La presente Informativa
                            fornisce ulteriori dettagli su come e perché utilizziamo queste tecnologie sul nostro sito
                            web. I termini “Orchi”, “noi”, “ci” e “nostro” includono l'A.S.D. Gli Orchi Trieste.
                            Utilizzando il nostro sito web, l'utente acconsente alla memorizzazione e all'accesso ai
                            cookies e ad altre tecnologie sul proprio dispositivo, in conformità con la presente
                            Politica sui cookies.
                        </p>

                        <h3>Cookies</h3>

                        <p>
                            <strong>Cosa sono i cookies?</strong> I cookies sono piccoli file di dati che vengono
                            scaricati sul dispositivo quando si visita un sito web. Questi vengono poi inviati al sito
                            web di origine a ogni visita successiva o a un altro sito web che li riconosce. I cookies
                            sono utili perché ci permettono di riconoscere il dispositivo e migliorare l'esperienza di
                            navigazione.
                        </p>

                        <p>
                            <strong>Come utilizziamo i cookies?</strong> Utilizziamo i cookies per i seguenti scopi:
                        </p>

                        <ul>
                            <li>
                                <span>
                                    Prestazioni, analisi e ricerca: Per analizzare l'accesso e l'uso del sito web e
                                    monitorare le prestazioni. Utilizziamo servizi come{' '}
                                    <a href="https://vercel.com/products/observability" target="_blank">
                                        Vercel Analytics
                                    </a>{' '}
                                    per raccogliere informazioni sull'utilizzo del nostro sito.
                                </span>
                            </li>
                            <li>
                                <span>
                                    Funzionalità: Per ricordare le preferenze degli utenti e migliorare la navigazione
                                    tra le pagine.
                                </span>
                            </li>
                        </ul>

                        <p>
                            <strong>Quanto tempo restano salvati i cookies?</strong> I cookies si distinguono in due
                            categorie, a seconda della durata con cui rimangono salvati sul dispositivo:
                        </p>

                        <ul>
                            <li>
                                <span>
                                    Cookies di sessione: Rimangono sul dispositivo solo durante la visita al nostro
                                    sito.
                                </span>
                            </li>
                            <li>
                                <span>
                                    Cookies persistenti: Rimangono sul dispositivo per un periodo più lungo, variabile a
                                    seconda delle loro funzioni.
                                </span>
                            </li>
                        </ul>

                        <h3 style={{ marginTop: '1rem' }}>Altre tecnologie</h3>

                        <p>
                            <strong>Archiviazione locale:</strong> Utilizzata per memorizzare le preferenze degli
                            utenti.
                        </p>

                        <h3>Rinuncia ai cookies</h3>

                        <p>
                            La maggior parte dei dispositivi e dei browser web sono impostati per accettare i cookies
                            per impostazione predefinita. Se si preferisce, è possibile rimuovere o rifiutare i cookies.
                            Per ulteriori informazioni su come bloccare i cookies, visitare il sito{' '}
                            <a href="https://allaboutcookies.org/" target="_blank">
                                allaboutcookies.org
                            </a>
                            . Si noti che la scelta di rimuovere o rifiutare i cookies potrebbe influire sulla
                            disponibilità e sulla funzionalità del nostro sito web.
                        </p>

                        <h3>Revisioni di questa politica</h3>

                        <p>
                            Questa Informativa può essere modificata periodicamente. Provvederemo a informare gli utenti
                            pubblicando la versione più aggiornata sul nostro sito web e modificando la data all'inizio
                            di questa pagina. In caso di modifiche sostanziali, forniremo un ulteriore avviso, come
                            inviando un'e-mail o visualizzando un avviso sul nostro sito web. Continuando a utilizzare
                            il sito web dopo l'entrata in vigore di eventuali modifiche, gli utenti accetteranno
                            automaticamente l'Informativa modificata.
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
            'dicembre'
        ];

        const day = newDate.date();
        const month = months[newDate.month()];
        const year = newDate.year();

        return `${day} ${month} ${year}`;
    }
});
CookiesPolicy.displayName = 'CookiesPolicy';

export default CookiesPolicy;
