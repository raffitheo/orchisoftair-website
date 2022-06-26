export default interface INavbarTopProps {
    contacts: {
        icon: string,
        title: string,
        info: string
    }[];
    navigation: {
        text: string,
        link: string,
        subMenu?: {
            text: string,
            link: string
        }[]
    }[];
    socials: {
        icon: string,
        link: string,
        hoverColor: string
    }[];
    onMobileMenuChange: (newValue: boolean, event?: React.ChangeEvent<HTMLInputElement>) => void;
    isMobile: boolean;
    
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
    small?: boolean;
}