import { Footer } from '@components/footer';
import { Navbar } from '@components/navbar';
import { SEO } from '@components/seo';
import env from '@config/env';
import emailjs from '@emailjs/browser';
import { type DataStatus } from '@interfaces/data-status';
import React from 'react';
import { Link } from 'react-router-dom';

import './contact-us.sass';

interface ContactUsProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContactUs = React.forwardRef<HTMLDivElement, ContactUsProps>(
    ({ className, ...props }, ref) => {
        const [emailText, setEmailText] = React.useState<string>();
        const [messageText, setMessageText] = React.useState<string>();
        const [nameText, setNameText] = React.useState<string>();
        const [subjectText, setSubjectText] = React.useState<string>();

        const [emailStatus, setEmailStatus] =
            React.useState<DataStatus>('initialized');

        const form = React.useRef<HTMLFormElement>(null);

        return (
            <React.Fragment>
                <SEO title="Contatti" />

                <Navbar active="contact-us" />

                <div
                    className={`contact-us${className ? ` ${className}` : ''}`}
                    ref={ref}
                    {...props}
                >
                    <div className="contact-us-header-box2">
                        <div className="contact-us-banner-box">
                            <div className="contact-us-header-banner">
                                <div className="contact-us-header" />

                                <div>
                                    <h1>MODULO DI CONTATTO</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-us-main-container">
                        <div className="contact-us-main-box">
                            <p>
                                Se hai domande da farci, puoi contattarci
                                tramite messaggio privato sui nostri canali
                                social, come{' '}
                                <Link to="https://www.instagram.com/orchisoftair_official/">
                                    Instagram
                                </Link>{' '}
                                o{' '}
                                <Link to="https://www.facebook.com/orchitrieste/">
                                    Facebook
                                </Link>
                                . Siamo sempre felici di rispondere alle tue
                                domande e fornirti tutte le informazioni di cui
                                hai bisogno. Tuttavia, per facilitare la
                                comunicazione e garantirti una risposta rapida e
                                accurata, ti invitiamo a compilare il modulo
                                seguente. In questo modo, possiamo raccogliere
                                tutte le informazioni necessarie per
                                ricontattarti nel modo più efficiente possibile.
                                Grazie per la tua collaborazione!
                            </p>

                            {renderEmailForm()}
                        </div>
                    </div>
                </div>

                <Footer />
            </React.Fragment>
        );

        function renderEmailForm() {
            switch (emailStatus) {
                case 'initialized':
                    return (
                        <form onSubmit={sendEmail} ref={form}>
                            <div className="contact-us-element">
                                <input
                                    id="name"
                                    name="name"
                                    onChange={(e) =>
                                        setNameText(e.target.value)
                                    }
                                    placeholder="Inserisci il tuo nome"
                                    required
                                    type="text"
                                    value={nameText}
                                />
                                <label htmlFor="name">Nome</label>
                            </div>

                            <div className="contact-us-element">
                                <input
                                    id="email"
                                    name="email"
                                    onChange={(e) =>
                                        setEmailText(e.target.value)
                                    }
                                    placeholder="Inserisci la tua email"
                                    required
                                    type="email"
                                    value={emailText}
                                />
                                <label htmlFor="email">E-mail</label>
                            </div>

                            <div className="contact-us-element">
                                <span>{subjectText?.length ?? 0}/100</span>
                                <input
                                    id="subject"
                                    maxLength={100}
                                    name="subject"
                                    onChange={(e) =>
                                        setSubjectText(e.target.value)
                                    }
                                    placeholder="Inserisci un oggetto di contatto"
                                    required
                                    type="text"
                                    value={subjectText}
                                />
                                <label htmlFor="subject">Oggetto</label>
                            </div>

                            <div className="contact-us-element">
                                <span>{messageText?.length ?? 0}/500</span>
                                <textarea
                                    id="message"
                                    maxLength={500}
                                    name="message"
                                    onChange={(e) =>
                                        setMessageText(e.target.value)
                                    }
                                    placeholder="Inserisci un messaggio"
                                    required
                                    rows={5}
                                    value={messageText}
                                />
                                <label htmlFor="message">Messaggio</label>
                            </div>

                            <button className="contact-submit" type="submit">
                                INVIA RICHIESTA
                            </button>
                        </form>
                    );

                case 'error':
                case 'error-no-data':
                    return (
                        <p className="contact-us-response-message">
                            Si è presentato un errore imprevisto, ti chiediamo
                            di riporvare più tardi.
                        </p>
                    );

                case 'loading':
                    return (
                        <p className="contact-us-response-message">
                            Caricamento in corso...
                        </p>
                    );

                case 'success':
                    return (
                        <p className="contact-us-response-message">
                            Grazie, il messaggio è stato inviato correttamente e
                            verrai ricontattat* al più presto!
                        </p>
                    );
            }
        }

        function sendEmail(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();

            setEmailStatus('loading');

            if (form.current)
                emailjs
                    .sendForm(
                        env.email.serviceId,
                        env.email.templateId,
                        form.current,
                        {
                            publicKey: env.email.userId,
                        },
                    )
                    .then(
                        () => {
                            setEmailStatus('success');
                        },
                        () => {
                            setEmailStatus('error');
                        },
                    );
        }
    },
);
ContactUs.displayName = 'ContactUs';

export type { ContactUsProps };
export default ContactUs;
