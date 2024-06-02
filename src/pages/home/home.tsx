import BackgroundNewsletter from '@assets/background-newsletter.webp';
import BackgroundPattern from '@assets/background-pattern.webp';
import DamoclesIcon from '@assets/icons/damocles-icon.webp';
import Landing from '@assets/landing.webp';
import Footer from '@components/footer';
import Navbar from '@components/navbar';
import NewsCarouselElement from '@components/news-carousel-element';
import appsettings from '@config/appsettings';
import { databases } from '@config/appwrite';
import { DataStatus } from '@interfaces/data-status';
import News from '@interfaces/news';
import { ID, Query } from 'appwrite';
import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Carousel from 'react-multi-carousel';

import './home.sass';
import 'react-multi-carousel/lib/styles.css';

const PAGE_TITLE = appsettings.WELCOME_MESSAGES_CLOSED;

export interface HomeProps extends HTMLAttributes<HTMLDivElement> {}

const Home = forwardRef<HTMLDivElement, HomeProps>(({ ...props }, ref) => {
    const [email, setEmail] = useState<string>('');
    const [emailStatus, setEmailStatus] = useState<DataStatus>('initialized');
    const [newsList, setNwsList] = useState<Array<News>>([]);
    const [newsListStatus, setNwsListStatus] = useState<DataStatus>('initialized');

    useEffect(() => {
        setNwsListStatus('loading');
    }, []);

    useEffect(() => {
        if (newsListStatus === 'loading') {
            getNews();
        }
    }, [newsListStatus]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <>
            <Helmet>
                <title>{PAGE_TITLE}</title>

                <meta name="author" content={appsettings.WEBSITE_DEFAULT_AUTHOR} />
                <meta name="description" content={appsettings.WEBSITE_DEFAULT_DESCRIPTION} />
                <meta name="title" content={PAGE_TITLE} />

                <meta property="og:description" content={appsettings.WEBSITE_DEFAULT_DESCRIPTION} />
                <meta property="og:title" content={PAGE_TITLE} />

                <meta property="twitter:description" content={appsettings.WEBSITE_DEFAULT_DESCRIPTION} />
                <meta property="twitter:title" content={PAGE_TITLE} />
            </Helmet>

            <div ref={ref} {...props}>
                <div className="video-container">
                    <Navbar />

                    <div className="video-overlay" />

                    <div className="video-gradient" />

                    <div className="main-box">
                        <div className="main-logo-flex">
                            <div className="main-logo-section">
                                <img alt="Logo" src={Landing} height={333} width={707} />

                                <div className="buttom-section">
                                    <a href="/about">
                                        <button className="about-button">SU DI NOI</button>
                                    </a>
                                    <a href="/contact-us">
                                        <button className="contact-button">FAI UNA PROVA</button>
                                    </a>
                                </div>

                                <div className="partners-section">
                                    <p>IN COLLABORAZIONE CON</p>

                                    <div className="parthners-container">
                                        <a className="damocles-logo" href="https://www.damocles.it/" target="_blank">
                                            <img alt="Logo" height={37} src={DamoclesIcon} width={124} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative-container" style={{ backgroundImage: `url(${BackgroundPattern})` }}>
                    <div className="gradient-overlay">
                        <div className="gradient-overlay2">
                            <div className="news-section">
                                <div className="news-title">NOVITÀ ED EVENTI</div>

                                <div className="news-carousel">{renderNewsCarousel()}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="newsletter-section" style={{ backgroundImage: `url(${BackgroundNewsletter})` }}>
                    <div className="overlay">
                        <div className="overlay2">
                            <div className="newsletter-section-box">
                                <p className="subtitle">RIMANI AGGIORNATO</p>

                                {rendernewsLetter()}
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );

    function renderNewsCarousel() {
        switch (newsListStatus) {
            case 'error':
            case 'error-no-data':
                return (
                    <h1>Si è presentato un errore inaspettato. Non è possibile caricare la lista degli elementi.</h1>
                );

            case 'initialized':
            case 'loading':
                return (
                    <Carousel draggable autoPlay infinite responsive={responsive} swipeable>
                        <NewsCarouselElement isLoading />
                        <NewsCarouselElement isLoading />
                        <NewsCarouselElement isLoading />
                    </Carousel>
                );

            case 'success':
                if (newsList.length >= 1) {
                    return (
                        <Carousel draggable autoPlay infinite responsive={responsive} swipeable>
                            {newsList.map((news) => (
                                <NewsCarouselElement
                                    category={news.category}
                                    href={news.redirectLink}
                                    key={news.id}
                                    src={news.thumbnail}
                                    title={news.title}
                                />
                            ))}
                        </Carousel>
                    );
                } else {
                    return <h1>Non ci sono elementi da visualizzare.</h1>;
                }
        }
    }

    function rendernewsLetter() {
        switch (emailStatus) {
            case 'error':
            case 'error-no-data':
                return (
                    <p className="response-message">
                        Si è presentato un errore inaspettato. Non è possibile iscriversi alla newsletter in questo
                        momento.
                    </p>
                );

            case 'initialized':
                return (
                    <form className="subscribe-form">
                        <input
                            autoComplete="on"
                            className="email-input"
                            id="email"
                            name="email"
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Inserisci e-mail"
                            required
                            type="email"
                            value={email}
                        />

                        <button className="subscribe-button" onClick={addNewsletterEmail} type="submit">
                            Iscriviti alla newsletter
                        </button>
                    </form>
                );

            case 'loading':
                return <p className="response-message">Caricamento in corso...</p>;

            case 'success':
                return <p className="response-message">Ti ringraziamo per esserti sottoscritto!</p>;
        }
    }

    async function getNews() {
        const response = await databases.listDocuments(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_NEWS_COLLECTION_ID,
            [
                Query.select(['$id', 'category', 'creationDate', 'redirectLink', 'subtitle', 'thumbnail', 'title']),
                Query.equal('display', [true]),
                Query.orderDesc('creationDate')
            ]
        );

        if (response) {
            setNwsListStatus('success');

            const newsListResponse = response.documents.map((documnet) => {
                return {
                    category: documnet.category,
                    creationDate: new Date(documnet.creationDate),
                    id: documnet.$id,
                    redirectLink: documnet.redirectLink,
                    subtitle: documnet.subtitle,
                    thumbnail: documnet.thumbnail,
                    title: documnet.title
                };
            });

            setNwsList(newsListResponse);
        } else {
            setNwsListStatus('error');
        }
    }

    async function addNewsletterEmail(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        setEmailStatus('loading');

        const response = await databases.createDocument(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_NEWSLETTER_COLLECTION_ID,
            ID.unique(),
            { email: email, subscriptionDate: new Date() }
        );

        if (response) {
            setEmailStatus('success');
        } else {
            setEmailStatus('error');
        }

        setEmail('');
    }
});
Home.displayName = 'Home';

export default Home;
