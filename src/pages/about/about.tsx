import AboutBackground from '@assets/about-background.webp';
import AboutMembersBackground from '@assets/about-members-background.webp';
import BackgroundPattern from '@assets/background-pattern.webp';
import FieldsLoading from '@assets/fields-loading.webp';
import Landing from '@assets/landing.webp';
import { Footer } from '@components/footer';
import { Navbar } from '@components/navbar';
import { appsettings } from '@config/appsettings';
import { databases } from '@config/appwrite';
import { type DataStatus } from '@interfaces/data-status';
import { type Field } from '@interfaces/field';
import { type Member } from '@interfaces/member';
import { Query } from 'appwrite';
import parse from 'html-react-parser';
import React from 'react';
import { Helmet } from 'react-helmet';
import Carousel from 'react-multi-carousel';

import './about.sass';
import 'react-multi-carousel/lib/styles.css';

const PAGE_TITLE = `${appsettings.WEBSITE_DEFAULT_TITLE} | Su di noi`;

interface AboutProps extends React.HTMLAttributes<HTMLDivElement> {}

const About = React.forwardRef<HTMLDivElement, AboutProps>(
    ({ ...props }, ref) => {
        const [fieldsList, setFieldsList] = React.useState<Field[]>([]);
        const [fieldsListStatus, setFieldsListStatus] =
            React.useState<DataStatus>('initialized');

        const [activeField, setActiveField] = React.useState(0);

        const [membersList, setMembersList] = React.useState<Member[]>([]);
        const [membersListStatus, setMembersListStatus] =
            React.useState<DataStatus>('initialized');

        React.useEffect(() => {
            setFieldsListStatus('loading');
            setMembersListStatus('loading');
        }, []);

        React.useEffect(() => {
            if (fieldsListStatus === 'loading') {
                getFields();
            }

            if (membersListStatus === 'loading') {
                getMembers();
            }
        }, [fieldsListStatus, membersListStatus]);

        const responsive = {
            superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 3,
            },
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
        };

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

                <div ref={ref} {...props}>
                    <Navbar active="about" />

                    <div
                        className="about-main-background"
                        style={{ backgroundImage: `url(${AboutBackground})` }}
                    >
                        <div className="about-gradient" />

                        <div className="video-gradient">
                            <div className="about-info-box">
                                <div className="title-holder">
                                    <img
                                        alt="laing-logo"
                                        loading="lazy"
                                        src={Landing}
                                    />
                                </div>

                                <div className="about-detail">
                                    <p>
                                        L’A.S.D. Gli Orchi Trieste - Softair
                                        Team, attiva dal 2007, promuove
                                        l’airsoft a Trieste, partecipando a
                                        competizioni e organizzando eventi. I
                                        soci si allenano per affinare tiro a
                                        segno e strategie, rendendo
                                        l’associazione un punto di riferimento
                                        per gli appassionati locali e
                                        contribuendo allo sviluppo dello sport
                                        nella regione.
                                    </p>

                                    <p className="about-detail-hide">
                                        Composta da appassionati di airsoft,
                                        l’associazione organizza partite, tornei
                                        e allenamenti, puntando al miglioramento
                                        tecnico e al fair play. Aperta a nuovi
                                        membri, l’A.S.D. Gli Orchi Trieste
                                        invita chiunque sia interessato a
                                        unirsi, garantendo divertimento e
                                        spirito competitivo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="about-fields"
                        style={{ backgroundImage: `url(${BackgroundPattern})` }}
                    >
                        <div className="gradient-overlay">
                            <div className="about-box">{renderFields()}</div>
                        </div>
                    </div>

                    <div className="about-members">
                        <div
                            className="background-image"
                            style={{
                                backgroundImage: `url(${AboutMembersBackground})`,
                            }}
                        />

                        <div className="about-into-box">
                            <h1>GLI ORCHI</h1>

                            {renderMembers('presidency')}
                            {renderMembers('advisors')}
                            {renderMembers('associates')}
                        </div>
                    </div>

                    <Footer />
                </div>
            </React.Fragment>
        );

        function renderFields() {
            switch (fieldsListStatus) {
                case 'error':
                case 'error-no-data':
                    return (
                        <div className="about-text">
                            <p>
                                Si è presentato un errore inaspettato. Non è
                                possibile caricare la lista dei campi.
                            </p>
                        </div>
                    );

                case 'initialized':
                case 'loading':
                    return (
                        <React.Fragment>
                            <div className="about-text">
                                <h2></h2>

                                <p>Caricamento dei campi in corso...</p>
                            </div>

                            <div className="about-carousel">
                                <div className="item loading">
                                    <img
                                        alt="loading-first"
                                        loading="lazy"
                                        src={FieldsLoading}
                                    />

                                    <div className="center">
                                        <div className="spinner"></div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    );

                case 'success':
                    return (
                        <React.Fragment>
                            <div className="about-text">
                                <h2>{fieldsList[activeField].title}</h2>

                                <p>
                                    {parse(fieldsList[activeField].description)}
                                </p>
                            </div>

                            <div className="about-carousel">
                                {fieldsList.map((field, index) => (
                                    <div
                                        className={`item${index === activeField ? ' active' : ''}`}
                                        key={field.alt}
                                        onClick={() => setActiveField(index)}
                                    >
                                        <img
                                            alt={field.alt}
                                            loading="lazy"
                                            src={field.image}
                                        />
                                    </div>
                                ))}
                            </div>
                        </React.Fragment>
                    );
            }
        }

        function renderMembers(
            membersType: 'advisors' | 'associates' | 'presidency',
        ) {
            let membersToDisplay: string[] = [];

            switch (membersType) {
                case 'advisors':
                    membersToDisplay = ['advisor'];
                    break;

                case 'associates':
                    membersToDisplay = ['associate'];
                    break;

                case 'presidency':
                    membersToDisplay = ['president', 'vicepresident'];
                    break;
            }

            switch (membersListStatus) {
                case 'error':
                case 'error-no-data':
                    return (
                        <div className={`about-members-${membersType}`}>
                            <p>
                                Si è presentato un errore inaspettato. Non è
                                possibile caricare la lista dei membri.
                            </p>
                        </div>
                    );

                case 'initialized':
                case 'loading':
                    return (
                        <div className={`about-members-${membersType}`}>
                            <Carousel
                                draggable
                                infinite
                                responsive={responsive}
                                swipeable
                            >
                                <div className="about-members-element">
                                    <div className="about-members-inner-element">
                                        <div className="center">
                                            <div className="spinner"></div>
                                        </div>

                                        <div className="about-member-element-details">
                                            <p>Caricamento in corso...</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="about-members-element">
                                    <div className="about-members-inner-element">
                                        <div className="center">
                                            <div className="spinner"></div>
                                        </div>

                                        <div className="about-member-element-details">
                                            <p>Caricamento in corso...</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="about-members-element">
                                    <div className="about-members-inner-element">
                                        <div className="center">
                                            <div className="spinner"></div>
                                        </div>

                                        <div className="about-member-element-details">
                                            <p>Caricamento in corso...</p>
                                        </div>
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                    );

                case 'success':
                    return (
                        <div className={`about-members-${membersType}`}>
                            <Carousel
                                draggable
                                infinite
                                responsive={responsive}
                                swipeable
                            >
                                {membersList
                                    .filter((member) =>
                                        membersToDisplay.includes(member.role),
                                    )
                                    .map((member) => (
                                        <div
                                            className="about-members-element"
                                            key={member.nickname}
                                        >
                                            <div className="about-members-inner-element">
                                                <img
                                                    alt={member.alt}
                                                    loading="lazy"
                                                    src={member.thumbnail}
                                                />

                                                <div className="about-member-element-details">
                                                    <h2>
                                                        {member.nickname ||
                                                            'Non assegnato'}
                                                    </h2>

                                                    <p>
                                                        Nome: {member.firstName}
                                                        <br />
                                                        Cognome:{' '}
                                                        {member.lastName}
                                                        <br />
                                                        <br />
                                                        Descrizione:
                                                        <br />
                                                        {member.description &&
                                                            parse(
                                                                member.description,
                                                            )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </Carousel>
                        </div>
                    );
            }
        }

        async function getFields() {
            const response = await databases.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_FIELDS_COLLECTION_ID,
                [Query.select(['$id', 'alt', 'description', 'image', 'title'])],
            );

            if (response) {
                setFieldsListStatus('success');

                const fieldsListResponse = response.documents.map(
                    (documnet) => {
                        return {
                            alt: documnet.alt,
                            description: documnet.description,
                            id: documnet.$id,
                            image: documnet.image,
                            title: documnet.title,
                        };
                    },
                );

                setFieldsList(fieldsListResponse);
            } else {
                setFieldsListStatus('error');
            }
        }

        async function getMembers() {
            const response = await databases.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_MEMBERS_COLLECTION_ID,
                [
                    Query.select([
                        '$id',
                        'alt',
                        'description',
                        'firstName',
                        'lastName',
                        'nickname',
                        'role',
                        'thumbnail',
                    ]),
                    Query.orderAsc('nickname'),
                ],
            );

            if (response) {
                setMembersListStatus('success');

                const membersListResponse = response.documents.map(
                    (documnet) => {
                        return {
                            alt: documnet.alt,
                            description: documnet.description,
                            firstName: documnet.firstName,
                            id: documnet.$id,
                            lastName: documnet.lastName,
                            nickname: documnet.nickname,
                            role: documnet.role,
                            thumbnail: documnet.thumbnail,
                        };
                    },
                );

                setMembersList(membersListResponse);
            } else {
                setMembersListStatus('error');
            }
        }
    },
);
About.displayName = 'About';

export type { AboutProps };
export default About;
