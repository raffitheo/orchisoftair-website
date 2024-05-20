import Footer from '@components/footer';
import Navbar from '@components/navbar';
import { databases } from '@config/appwrite';
import { DataStatus } from '@interfaces/data-status';
import News from '@interfaces/news';
import { ID, Query } from 'appwrite';
import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';

import BackgroundNewsletter from '../../assets/background-newsletter.webp';
import BackgroundPattern from '../../assets/background-pattern.webp';
import DamoclesIcon from '../../assets/damocles-icon.webp';
import Landing from '../../assets/landing.webp';

import './home.css';
import 'react-multi-carousel/lib/styles.css';

interface NewsItemProps extends HTMLAttributes<HTMLDivElement> {
    category: string;
    href: string;
    src: string;
    title: string;
}

const NewsItem = forwardRef<HTMLDivElement, NewsItemProps>(
    ({ category, href, src, title, ...props }, ref) => {
        return (
            <div className="news-item" ref={ref} {...props}>
                <a href={href}>
                    <img alt="news" src={src} />
                </a>
                <div className="news-item-description">
                    <h3>{title}</h3>
                    <p>{category}</p>
                    <a className="news-item-link" href={href}>
                        SCOPRI DI PIÙ →
                    </a>
                </div>
            </div>
        );
    },
);

export interface HomeProps extends HTMLAttributes<HTMLDivElement> {}

const Home = forwardRef<HTMLDivElement, HomeProps>(({ ...props }, ref) => {
    const [email, setEmail] = useState<string>('');
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const [newsList, setNwsList] = useState<Array<News>>([]);
    const [newsListStatus, setNwsListStatus] =
        useState<DataStatus>('initialized');

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
            items: 3,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div ref={ref} {...props}>
            <div className="video-container">
                <Navbar />

                <div className="video-gradient" />

                <div className="main-box">
                    <div className="main-logo-flex">
                        <div className="main-logo-section">
                            <img
                                alt="Logo"
                                src={Landing}
                                height={333}
                                width={707}
                            />

                            <div className="buttom-section">
                                <a href="/about">
                                    <button className="about-button">
                                        SU DI NOI
                                    </button>
                                </a>
                                <a href="/contact-us">
                                    <button className="contact-button">
                                        UNISCITI A NOI
                                    </button>
                                </a>
                            </div>

                            <div className="logo-wraper">
                                <a
                                    className="damocles-logo"
                                    href="https://www.damocles.it/"
                                    target="_blank"
                                >
                                    <img
                                        alt="Logo"
                                        height={37}
                                        src={DamoclesIcon}
                                        width={124}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="relative-container"
                style={{ backgroundImage: `url(${BackgroundPattern})` }}
            >
                <div className="gradient-overlay">
                    <div className="gradient-overlay2">
                        <div className="new-section">
                            <div className="news-title">NOVITÀ ED EVENTI</div>

                            <div className="news-carousel">
                                {renderNewsCarousel()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section
                className="newsletter-section"
                style={{ backgroundImage: `url(${BackgroundNewsletter})` }}
            >
                <div className="overlay">
                    <div className="overlay2">
                        <div className="newsletter-section-box">
                            <p className="subtitle">RIMANI AGGIORNATO</p>

                            {emailSent ? (
                                <p className="success-message">
                                    Ti ringraziamo per esserti sottoscritto!
                                </p>
                            ) : (
                                <form className="subscribe-form">
                                    <input
                                        autoComplete="on"
                                        className="email-input"
                                        id="email"
                                        name="email"
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        placeholder="Inserisci e-mail"
                                        required
                                        type="email"
                                        value={email}
                                    />

                                    <button
                                        className="subscribe-button"
                                        onClick={addNewsletterEmail}
                                        type="submit"
                                    >
                                        Iscriviti alla newsletter
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );

    function renderNewsCarousel(): JSX.Element {
        switch (newsListStatus) {
            case 'error':
            case 'error-no-data':
            case 'initialized':
            case 'loading':
                return <></>;

            case 'success':
                return (
                    <Carousel
                        draggable
                        autoPlay
                        infinite
                        responsive={responsive}
                        swipeable
                    >
                        {newsList.map((news) => (
                            <NewsItem
                                category={news.category}
                                href={news.redirectLink}
                                key={news.id}
                                src={news.thumbnail}
                                title={news.title}
                            />
                        ))}
                    </Carousel>
                );
        }
    }

    async function getNews() {
        const response = await databases.listDocuments(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_NEWS_COLLECTION_ID,
            [
                Query.select([
                    '$id',
                    'category',
                    'creationDate',
                    'redirectLink',
                    'subtitle',
                    'thumbnail',
                    'title',
                ]),
                Query.equal('display', [true]),
                Query.orderDesc('creationDate'),
            ],
        );

        if (response) {
            setNwsListStatus('success');

            const newsListResponse: Array<News> = [];

            response.documents.forEach((documnet) => {
                newsListResponse.push({
                    category: documnet.category,
                    creationDate: new Date(documnet.creationDate),
                    id: documnet.$id,
                    redirectLink: documnet.redirectLink,
                    subtitle: documnet.subtitle,
                    thumbnail: documnet.thumbnail,
                    title: documnet.title,
                });
            });

            setNwsList(newsListResponse);
        } else {
            setNwsListStatus('error');
        }
    }

    async function addNewsletterEmail(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) {
        e.preventDefault();

        await databases.createDocument(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_NEWSLETTER_COLLECTION_ID,
            ID.unique(),
            { email: email, subscriptionDate: new Date() },
        );

        setEmail('');
        setEmailSent(true);
    }
});

export default Home;
