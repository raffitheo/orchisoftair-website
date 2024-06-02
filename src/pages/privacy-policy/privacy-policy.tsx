import Footer from '@components/footer';
import dayjs from 'dayjs';
import { HTMLAttributes, forwardRef } from 'react';
import { Helmet } from 'react-helmet';

import LorePattern from '../../assets/lore-pattern.webp';

import './privacy-policy.sass';

export interface PrivacyPolicyProps extends HTMLAttributes<HTMLDivElement> {}

const PrivacyPolicy = forwardRef<HTMLDivElement, PrivacyPolicyProps>(({ ...props }, ref) => {
    return (
        <>
            <Helmet>
                <title>A.S.D. Gli Orchi Trieste - Softair Team | Informativa sulla privacy</title>

                <meta name="title" content="A.S.D. Gli Orchi Trieste - Softair Team | Informativa sulla privacy" />

                <meta
                    property="og:title"
                    content="A.S.D. Gli Orchi Trieste - Softair Team | Informativa sulla privacy"
                />

                <meta
                    property="twitter:title"
                    content="A.S.D. Gli Orchi Trieste - Softair Team | Informativa sulla privacy"
                />
            </Helmet>

            <div className="news" ref={ref} {...props}>
                <div className="privacy-policy-container" ref={ref} {...props}>
                    <div className="privacy-policy-header-box2">
                        <div className="privacy-policy-banner-box">
                            <div className="privacy-policy-header-banner">
                                <div className="privacy-policy-header">
                                    <div className="back-button">
                                        <a href="/">Torna alla home</a>
                                    </div>
                                </div>

                                <div>
                                    <h1>INFORMATIVA SULLA PRIVACY</h1>
                                    <div className="banner-date">{formatDate(new Date('2024-05-22'))}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="privacy-policy-main-container"
                        style={{
                            background: `url(${LorePattern}) no-repeat 50%`
                        }}
                    >
                        <div className="privacy-policy-main-box">
                            <h3>Introduzione</h3>

                            <p>
                                A.S.D. Gli Orchi Trieste (compreso anche il suo sito web) prende molto seriamente la
                                privacy dei propri utenti. Questa Informativa descrive come raccogliamo, utilizziamo e
                                proteggiamo le informazioni degli utenti che si iscrivono alla nostra newsletter.
                            </p>

                            <h3>1. RACCOLTA DEI DATI</h3>

                            <p>
                                Quando un utente si iscrive alla nostra newsletter, raccogliamo unicamente il suo
                                indirizzo e-mail. Non raccogliamo altre informazioni personali.
                            </p>

                            <h3>2. UTILIZZO DEI DATI</h3>

                            <p>Utilizziamo gli indirizzi e-mail per:</p>

                            <ul>
                                <li>
                                    <span>Inviare la nostra newsletter con aggiornamenti, notizie ed eventi.</span>
                                </li>
                                <li>
                                    <span>
                                        Fornire informazioni su iniziative e attività di A.S.D. Gli Orchi Trieste.
                                    </span>
                                </li>
                            </ul>

                            <h3 style={{ marginTop: '1rem' }}>3. CONSERVAZIONE DEI DATI</h3>

                            <p>
                                Gli indirizzi e-mail verranno conservati fino a quando l'utente non decide di annullare
                                l'iscrizione alla nostra newsletter.
                            </p>

                            <h3>4. DIRITTI DELL'UTENTE</h3>

                            <p>Tutti gli utenti hanno diritto a:</p>

                            <ul>
                                <li>
                                    <span>
                                        Annullare l'iscrizione alla newsletter in qualsiasi momento utilizzando il link
                                        di disiscrizione presente in ogni e-mail.
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Richiedere l'accesso, la rettifica o la cancellazione dell'indirizzo e-mail dal
                                        nostro database. Per farlo, contattaci a{' '}
                                        <a href="mailto:gliorchitrieste@gmail.com" target="_blank">
                                            gliorchitrieste@gmail.com
                                        </a>
                                        .
                                    </span>
                                </li>
                            </ul>

                            <h3 style={{ marginTop: '1rem' }}>5. SICUREZZA DEI DATI</h3>

                            <p>
                                Adottiamo misure di sicurezza per proteggere gli indirizzi e-mail raccolti da accessi
                                non autorizzati, alterazioni, divulgazioni o distruzioni.
                            </p>

                            <h3>6. UTILIZZO DEI COOKIES</h3>

                            <p>
                                Il nostro sito utilizza cookies per migliorare l'esperienza di navigazione degli utenti.
                                I cookies sono piccoli file di dati che vengono salvati sul tuo dispositivo quando
                                visiti il nostro sito web.
                            </p>

                            <h3>7. TRATTAMENTO INTERNAZIONALE DEI DATI</h3>

                            <p>
                                L'indirizzo e-mail dell'utente potrebbe essere conservato e trattato al di fuori
                                dell'Unione Europea. Adottiamo misure adeguate per proteggere i dati personali in
                                conformità con questa Informativa.
                            </p>

                            <h3>8. LIMITI DI ETÀ</h3>

                            <p>
                                Non raccogliamo dati di persone di età inferiore ai 14 anni. Inoltre, non consentiamo
                                consapevolmente a tali persone di utilizzare i nostri servizi. Se l'utente ha meno di 14
                                anni, è preghiato di non inviarci alcun dato che lo riguardi. Se veniamo a conoscenza di
                                aver raccolto dati personali di un minore di 14 anni, li cancelleremo il più rapidamente
                                possibile. Se si ritiene che siamo in possesso di dati di o su un bambino di età
                                inferiore ai 14 anni, preghiamo di contattarci.
                            </p>

                            <h3>9. MODIFICHE ALL'INFORMATIVA SULLA PRIVACY</h3>

                            <p>
                                Questa Informativa può essere modificata periodicamente. Provvederemo a informare gli
                                utenti pubblicando la versione più aggiornata sul nostro sito web e modificando la data
                                all'inizio di questa pagina. In caso di modifiche sostanziali, forniremo un ulteriore
                                avviso, come inviando un'e-mail o visualizzando un avviso sul nostro sito web.
                                Continuando a utilizzare il sito web dopo l'entrata in vigore di eventuali modifiche,
                                gli utenti accetteranno automaticamente l'Informativa modificata.
                            </p>

                            <h3>10. CONTATTI</h3>

                            <p>
                                Per qualsiasi domanda o richiesta relativa alla privacy dei tuoi dati, siamo
                                conttatabili a:
                            </p>

                            <span style={{ marginTop: '1rem' }}>A.S.D. Gli Orchi Trieste</span>
                            <br />
                            <span>Via Caccia 11, Trieste, 34129 Italia</span>
                            <br />
                            <span style={{ marginBottom: '1rem' }}>
                                <a href="mailto:gliorchitrieste@gmail.com" target="_blank">
                                    gliorchitrieste@gmail.com
                                </a>
                            </span>

                            <div className="content-creators"></div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
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
PrivacyPolicy.displayName = 'PrivacyPolicy';

export default PrivacyPolicy;
