export const Contacts = (): {
    icon: string,
    title: string,
    info: string
}[] => {
    return (
        [
            {
                icon: 'AtSign',
                title: 'Scrivici',
                info: 'info@orchisoftair.it'
            },
            {
                icon: 'Phone',
                title: 'Chiamaci',
                info: '+39 348 469 1962'
            }
        ]
    );
};

export const Navigation = (): {
    text: string,
    link: string,
    subMenu?: {
        text: string,
        link: string
    }[]
}[] => {
    return (
        [
            {
                text: 'Home',
                link: '#home'
            },
            {
                text: 'Chi siamo',
                link: '#chi-siamo',
                subMenu: [
                    {
                        text: 'L\'associazione',
                        link: '#chi-siamo-l-associazione'
                    },
                    {
                        text: 'Il team',
                        link: '#chi-siamo-il-team'
                    },
                    {
                        text: 'Deve giochiamo',
                        link: '#chi-siamo-dove-giochiamo'
                    }
                ]
            },
            {
                text: 'Eventi',
                link: '#event',
                subMenu: [
                    {
                        text: 'In arrivo',
                        link: '#eventi-in-arrivo'
                    },
                    {
                        text: 'Storico',
                        link: '#eventi-storico'
                    }
                ]
            },
            {
                text: 'Contatti',
                link: '#contatti'
            },
            {
                text: 'Area riservata',
                link: 'area-riservata'
            }
        ]
    );
};

export const Social = (): {
    icon: string,
    link: string,
    hoverColor: string
}[] => {
    return (
        [
            {
                link: 'https://www.instagram.com/orchisoftair_official/',
                icon: 'Instagram',
                hoverColor: 'hsl(349, 75%, 31%)'
            },
            {
                link: 'https://www.facebook.com/orchitrieste/',
                icon: 'Facebook',
                hoverColor: 'hsl(349, 75%, 31%)'
            }
        ]
    );
};