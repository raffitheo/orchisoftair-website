const appsettings = {
    COOKIES_ACCEPTED: 'cookies-accepted',
    WEBSITE_DEFAULT_AUTHOR: 'Raffaele Valenti & A.S.D. Gli Orchi Trieste',
    WEBSITE_DEFAULT_DESCRIPTION:
        "Scopri l'A.S.D. Gli Orchi Trieste, che dal 2007 permette ai suoi soci di praticare lo sport del softair nella città di Trieste. Rimani aggiornat* sulle ultime novità ed eventi che organizziamo ed iscriviti alla nostra newsletter. Unisciti a noi!",
    WEBSITE_DEFAULT_IMAGE: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/social-image.png`,
    WEBSITE_DEFAULT_KEYWORDS: [
        'airsoft',
        'softair',
        'trieste',
        'orchi',
        'team',
        'asd',
        'friuli venezia giulia',
    ],
    WEBSITE_DEFAULT_TITLE: 'A.S.D. Gli Orchi Trieste - Softair Team',
};

export { appsettings };
