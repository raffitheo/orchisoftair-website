import LorePattern from '@assets/lore-pattern.webp';
import { Footer } from '@components/footer';
import { appsettings } from '@config/appsettings';
import dayjs from 'dayjs';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './privacy-policy.sass';

const PAGE_TITLE = `${appsettings.WEBSITE_DEFAULT_TITLE} | Informativa sulla privacy`;

interface PrivacyPolicyProps extends React.HTMLAttributes<HTMLDivElement> {}

const PrivacyPolicy = React.forwardRef<HTMLDivElement, PrivacyPolicyProps>(
    ({ ...props }, ref) => {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{PAGE_TITLE}</title>

                    <meta
                        name="author"
                        content={appsettings.WEBSITE_DEFAULT_AUTHOR}
                    />
                    <meta
                        name="description"
                        content={appsettings.WEBSITE_DEFAULT_DESCRIPTION}
                    />
                    <meta name="title" content={PAGE_TITLE} />

                    <meta
                        property="og:description"
                        content={appsettings.WEBSITE_DEFAULT_DESCRIPTION}
                    />
                    <meta property="og:title" content={PAGE_TITLE} />

                    <meta
                        property="twitter:description"
                        content={appsettings.WEBSITE_DEFAULT_DESCRIPTION}
                    />
                    <meta property="twitter:title" content={PAGE_TITLE} />
                </Helmet>

                <div className="news" ref={ref} {...props}>
                    <div
                        className="privacy-policy-container"
                        ref={ref}
                        {...props}
                    >
                        <div className="privacy-policy-header-box2">
                            <div className="privacy-policy-banner-box">
                                <div className="privacy-policy-header-banner">
                                    <div className="privacy-policy-header">
                                        <div className="back-button">
                                            <Link to="/">Torna alla home</Link>
                                        </div>
                                    </div>

                                    <div>
                                        <h1>INFORMATIVA SULLA PRIVACY</h1>
                                        <div className="banner-date">
                                            {formatDate(new Date('2024-06-07'))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="video-gradient" />

                        <div
                            className="privacy-policy-main-container"
                            style={{
                                background: `url(${LorePattern}) no-repeat 50%`,
                            }}
                        >
                            <div className="privacy-policy-main-box">
                                <h2>Introduzione</h2>

                                <p>
                                    A.S.D. Gli Orchi Trieste (compreso anche il
                                    suo sito web) prende molto seriamente la
                                    privacy dei propri utenti. Questa
                                    Informativa descrive come raccogliamo,
                                    utilizziamo e proteggiamo le informazioni
                                    degli utenti che si iscrivono alla nostra
                                    newsletter.
                                </p>

                                <h2>1. RACCOLTA DEI DATI</h2>

                                <p>
                                    Quando un utente si iscrive alla nostra
                                    newsletter, raccogliamo unicamente il suo
                                    indirizzo e-mail. Non raccogliamo altre
                                    informazioni personali.
                                </p>

                                <h2>2. UTILIZZO DEI DATI</h2>

                                <p>Utilizziamo gli indirizzi e-mail per:</p>

                                <ul>
                                    <li>
                                        <span>
                                            Inviare la nostra newsletter con
                                            aggiornamenti, notizie ed eventi.
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            Fornire informazioni su iniziative e
                                            attività di A.S.D. Gli Orchi
                                            Trieste.
                                        </span>
                                    </li>
                                </ul>

                                <h2>3. CONSERVAZIONE DEI DATI</h2>

                                <p>
                                    Gli indirizzi e-mail verranno conservati
                                    fino a quando l'utente non decide di
                                    annullare l'iscrizione alla nostra
                                    newsletter.
                                </p>

                                <h2>4. DIRITTI DELL'UTENTE</h2>

                                <p>Tutti gli utenti hanno diritto a:</p>

                                <ul>
                                    <li>
                                        <span>
                                            Annullare l'iscrizione alla
                                            newsletter in qualsiasi momento
                                            utilizzando il link di disiscrizione
                                            presente in ogni e-mail.
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            Richiedere l'accesso, la rettifica o
                                            la cancellazione dell'indirizzo
                                            e-mail dal nostro database. Per
                                            farlo, contattaci a{' '}
                                            <Link
                                                target="_blank"
                                                to="mailto:orchitriestesoftair@gmail.com"
                                            >
                                                orchitriestesoftair@gmail.com
                                            </Link>
                                            .
                                        </span>
                                    </li>
                                </ul>

                                <h2>5. SICUREZZA DEI DATI</h2>

                                <p>
                                    Adottiamo misure di sicurezza per proteggere
                                    gli indirizzi e-mail raccolti da accessi non
                                    autorizzati, alterazioni, divulgazioni o
                                    distruzioni.
                                </p>

                                <h2>6. UTILIZZO DEI COOKIES</h2>

                                <p>
                                    Il nostro sito utilizza cookies per
                                    migliorare l'esperienza di navigazione degli
                                    utenti. I cookies sono piccoli file di dati
                                    che vengono salvati sul tuo dispositivo
                                    quando visiti il nostro sito web.
                                </p>

                                <h2>7. TRATTAMENTO INTERNAZIONALE DEI DATI</h2>

                                <p>
                                    L'indirizzo e-mail dell'utente potrebbe
                                    essere conservato e trattato al di fuori
                                    dell'Unione Europea. Adottiamo misure
                                    adeguate per proteggere i dati personali in
                                    conformità con questa Informativa.
                                </p>

                                <h2>8. LIMITI DI ETÀ</h2>

                                <p>
                                    Non raccogliamo dati di persone di età
                                    inferiore ai 14 anni. Inoltre, non
                                    consentiamo consapevolmente a tali persone
                                    di utilizzare i nostri servizi. Se l'utente
                                    ha meno di 14 anni, è preghiato di non
                                    inviarci alcun dato che lo riguardi. Se
                                    veniamo a conoscenza di aver raccolto dati
                                    personali di un minore di 14 anni, li
                                    cancelleremo il più rapidamente possibile.
                                    Se si ritiene che siamo in possesso di dati
                                    di o su un bambino di età inferiore ai 14
                                    anni, preghiamo di contattarci.
                                </p>

                                <h2>
                                    9. MODIFICHE ALL'INFORMATIVA SULLA PRIVACY
                                </h2>

                                <p>
                                    Questa Informativa può essere modificata
                                    periodicamente. Provvederemo a informare gli
                                    utenti pubblicando la versione più
                                    aggiornata sul nostro sito web e modificando
                                    la data all'inizio di questa pagina. In caso
                                    di modifiche sostanziali, forniremo un
                                    ulteriore avviso, come inviando un'e-mail o
                                    visualizzando un avviso sul nostro sito web.
                                    Continuando a utilizzare il sito web dopo
                                    l'entrata in vigore di eventuali modifiche,
                                    gli utenti accetteranno automaticamente
                                    l'Informativa modificata.
                                </p>

                                <h2>10. CONTATTI</h2>

                                <p>
                                    Per qualsiasi domanda o richiesta relativa
                                    alla privacy dei tuoi dati, siamo
                                    conttatabili a:
                                </p>

                                <span style={{ marginTop: '1rem' }}>
                                    Associazione Sportiva Dilettantistica "Gli
                                    Orchi Trieste"
                                </span>
                                <br />
                                <span>Codice Fiscale: 90114470322</span>
                                <br />
                                <span>
                                    Sede legale: Via Caccia 11, Trieste, 34129
                                    Italia
                                </span>
                                <br />
                                <span style={{ marginBottom: '1rem' }}>
                                    Email:{' '}
                                    <Link
                                        target="_blank"
                                        to="mailto:orchitriestesoftair@gmail.com"
                                    >
                                        orchitriestesoftair@gmail.com
                                    </Link>
                                </span>

                                <div className="content-creators"></div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
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
PrivacyPolicy.displayName = 'PrivacyPolicy';

export type { PrivacyPolicyProps };
export default PrivacyPolicy;
