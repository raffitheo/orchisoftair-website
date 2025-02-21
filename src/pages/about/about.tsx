import AboutBackground from '@assets/about-background.webp';
import AboutMembersBackground from '@assets/about-members-background.webp';
import BackgroundPattern from '@assets/background-pattern.webp';
import FieldsLoading from '@assets/fields-loading.webp';
import Landing from '@assets/landing.webp';
import { Footer } from '@components/footer';
import { Navbar } from '@components/navbar';
import { OptimizedImage } from '@components/optimized-image';
import { SEO } from '@components/seo';
import env from '@config/env';
import useAppwriteQuery from '@hooks/use-appwrite-query';
import { type Field } from '@interfaces/field';
import { type Member } from '@interfaces/member';
import { Query } from 'appwrite';
import parse from 'html-react-parser';
import React from 'react';
import Carousel from 'react-multi-carousel';

import './about.sass';
import 'react-multi-carousel/lib/styles.css';

interface AboutProps extends React.HTMLAttributes<HTMLDivElement> {}

const About = React.forwardRef<HTMLDivElement, AboutProps>(
    ({ ...props }, ref) => {
        const [activeField, setActiveField] = React.useState(0);

        const { data: fieldsList, status: fieldsListStatus } =
            useAppwriteQuery<Field>({
                collectionId: env.collections.fields,
                queries: [
                    Query.select(['alt', 'description', 'image', 'title']),
                    Query.orderAsc('title'),
                ],
                transform: (doc) => ({
                    alt: doc.alt,
                    description: doc.description,
                    id: doc.$id,
                    image: doc.image,
                    title: doc.title,
                }),
            });

        const { data: membersList, status: membersListStatus } =
            useAppwriteQuery<Member>({
                collectionId: env.collections.members,
                queries: [
                    Query.select([
                        'alt',
                        'description',
                        'firstName',
                        'lastName',
                        'nickname',
                        'role',
                        'thumbnail',
                    ]),
                    Query.orderAsc('nickname'),
                    Query.equal('active', true),
                ],
                transform: (doc) => ({
                    alt: doc.alt,
                    description: doc.description,
                    firstName: doc.firstName,
                    lastName: doc.lastName,
                    nickname: doc.nickname,
                    role: doc.role,
                    thumbnail: doc.thumbnail,
                }),
            });

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
                <SEO title="Su di noi" />

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
                                    <OptimizedImage
                                        alt="laing-logo"
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
                                    <OptimizedImage
                                        alt="loading-first"
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
                                        <OptimizedImage
                                            alt={field.alt}
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
                                                <OptimizedImage
                                                    alt={member.alt}
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
    },
);
About.displayName = 'About';

export type { AboutProps };
export default About;
