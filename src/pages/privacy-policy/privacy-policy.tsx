import Footer from '@components/footer';
import dayjs from 'dayjs';
import { HTMLAttributes, forwardRef } from 'react';

import LorePattern from '../../assets/lore-pattern.webp';

import './privacy-policy.css';

export interface PrivacyPolicyProps extends HTMLAttributes<HTMLDivElement> {}

const PrivacyPolicy = forwardRef<HTMLDivElement, PrivacyPolicyProps>(
    ({ ...props }, ref) => {
        return (
            <div className="news" ref={ref} {...props}>
                <div className="privacy-polity-container" ref={ref} {...props}>
                    <div className="privacy-polity-header-box2">
                        <div className="privacy-polity-banner-box">
                            <div className="privacy-polity-header-banner">
                                <div className="privacy-polity-header">
                                    <div className="back-button">
                                        <a href="/">Torna indietro</a>
                                    </div>
                                </div>

                                <div>
                                    <h1>INFORMATIVA SULLA PRIVACY</h1>
                                    <div className="banner-date">
                                        {formatDate(new Date('2024-05-21'))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="privacy-polity-main-container"
                        style={{
                            background: `url(${LorePattern}) no-repeat 50%`,
                        }}
                    >
                        <div className="privacy-polity-main-box">
                            <h3>Introduzione</h3>

                            <p>
                                A.S.D. Gli Orchi Trieste (compresi il suo sito
                                web) prende molto seriamente la privacy dei
                                propri utenti. Questa informativa descrive come
                                raccogliamo, utilizziamo e proteggiamo le
                                informazioni degli utenti che si iscrivono alla
                                nostra newsletter.
                            </p>

                            <h3>1. RACCOLTA DEI DATI</h3>

                            <p>
                                Quando un utente si iscrive alla nostra
                                newsletter, raccogliamo solo il suo indirizzo
                                e-mail. Non raccogliamo altre informazioni
                                personali.
                            </p>

                            <h3>2. UTILIZZO DEI DATI</h3>

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
                                        attività di A.S.D. Gli Orchi Trieste.
                                    </span>
                                </li>
                            </ul>

                            <h3 style={{ marginTop: '1rem' }}>
                                3. CONSERVAZIONE DEI DATI
                            </h3>

                            <p>
                                Gli indirizzi e-mail verranno conservati fino a
                                quando l'utente non decide di annullare
                                l'iscrizione alla nostra newsletter.
                            </p>

                            <h3>4. DIRITTI DELL'UTENTE</h3>

                            <p>Tutti gli utenti hanno diritto a:</p>

                            <ul>
                                <li>
                                    <span>
                                        Annullare l'iscrizione alla newsletter
                                        in qualsiasi momento utilizzando il link
                                        di disiscrizione presente in ogni
                                        e-mail.
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Richiedere l'accesso, la rettifica o la
                                        cancellazione del tuo indirizzo e-mail
                                        dal nostro database. Per farlo,
                                        contattaci a{' '}
                                        <a
                                            href="mailto:gliorchitrieste@gmail.com"
                                            target="_blank"
                                        >
                                            gliorchitrieste@gmail.com
                                        </a>
                                        .
                                    </span>
                                </li>
                            </ul>

                            <h3 style={{ marginTop: '1rem' }}>
                                5. SICUREZZA DEI DATI
                            </h3>

                            <p>
                                Adottiamo misure di sicurezza per proteggere il
                                tuo indirizzo e-mail da accessi non autorizzati,
                                alterazioni, divulgazioni o distruzioni.
                            </p>

                            <h3>6. UTILIZZO DEI COOKIES</h3>

                            <p>
                                Il nostro sito utilizza cookies per migliorare
                                l'esperienza di navigazione degli utenti. I
                                cookies sono piccoli file di dati che vengono
                                salvati sul tuo dispositivo quando visiti il
                                nostro sito web. Utilizziamo cookies per:
                            </p>

                            <ul>
                                <li>
                                    <span>
                                        Analizzare l'uso del sito web e
                                        migliorare le sue prestazioni.
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        Ricordare le tue preferenze durante la
                                        navigazione.
                                    </span>
                                </li>
                            </ul>

                            <p>
                                Puoi disabilitare i cookies nelle impostazioni
                                del tuo browser, ma ciò potrebbe influire sulla
                                funzionalità del sito.
                            </p>

                            <h3>7. TRATTAMENTO INTERNAZIONALE DEI DATI</h3>

                            <p>
                                Il tuo indirizzo e-mail potrebbe essere
                                conservato e trattato al di fuori dell'Unione
                                Europea. Adottiamo misure adeguate per
                                proteggere i tuoi dati personali in conformità
                                con questa informativa.
                            </p>

                            <h3>8. LIMITI DI ETÀ</h3>

                            <p>
                                Non raccogliamo dati di persone di età inferiore
                                ai 14 anni. Inoltre, non consentiamo
                                consapevolmente a tali persone di utilizzare i
                                nostri servizi. Se l'utente ha meno di 14 anni,
                                è preghiato di non inviarci alcun dato che lo
                                riguardi. Se veniamo a conoscenza di aver
                                raccolto dati personali di un minore di 14 anni,
                                li cancelleremo il più rapidamente possibile. Se
                                si ritiene che siamo in possesso di dati di o su
                                un bambino di età inferiore ai 14 anni,
                                preghiamo di contattarci.
                            </p>

                            <h3>9. MODIFICHE ALL'INFORMATIVA SULLA PRIVACY</h3>

                            <p>
                                Possiamo aggiornare questa informativa sulla
                                privacy periodicamente. Ti informeremo di
                                eventuali modifiche pubblicando la nuova
                                informativa sul nostro sito web. La data di
                                revisione sarà aggiornata di conseguenza.
                            </p>

                            <h3>10. CONTATTI</h3>

                            <p>
                                Per qualsiasi domanda o richiesta relativa alla
                                privacy dei tuoi dati, puoi contattarci a:
                            </p>

                            <span style={{ marginTop: '1rem' }}>
                                A.S.D. Gli Orchi Trieste
                            </span>
                            <br />
                            <span>Via Caccia 11, Trieste, 34129 Italia</span>
                            <br />
                            <span style={{ marginBottom: '1rem' }}>
                                <a
                                    href="mailto:gliorchitrieste@gmail.com"
                                    target="_blank"
                                >
                                    gliorchitrieste@gmail.com
                                </a>
                            </span>

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

export default PrivacyPolicy;
