import React,{
    useEffect,
    useState
} from 'react';

import { INavbarTopProps } from './INavbarTopProps';

import { IconExtension } from '../IconExtension/IconExtension';
import { IconName } from '../IconExtension/IIconExtensionProps';

import logo from '../../assets/logo.png';

import {
    ContactInfo,
    Contacts,
    ContactsContainer,
    ContactsWrapper,
    ContactTitle,
    Container,
    Logo,
    LogoImage,
    LogoWrapper,
    MobileHamburger,
    MobileHamburgerCheckbox,
    MobileHamburgerContainer,
    MobileHamburgerLine,
    MobileHamburgerLineContainer,
    MobileHamburgerWrapper,
    MobileNavigationContainer,
    MobileNavigationList,
    MobileNavigationListElement,
    MobileNavigationListElementLink,
    MobileNavigationSubMenuList,
    MobileNavigationSubMenuListElement,
    MobileNavigationSubMenuListElementLink,
    MobileNavigationSubMenuListExpand,
    MobileNavigationWrapper,
    MobileWrapper,
    NavigationContainer,
    NavigationList,
    NavigationListElement,
    NavigationListElementLink,
    NavigationSubMenuList,
    NavigationSubMenuListElement,
    NavigationSubMenuListElementLink,
    NavigationWrapper,
    Row,
    SearchbarButton,
    SearchbarContainer,
    SearchbarForm,
    SearchbarInput,
    SearchbarWrapper,
    SocialLink,
    SocialsContainer,
    SocialsWrapper,
    Wrapper
} from './NavbarTop.style';

export const NavbarTop: React.FC<INavbarTopProps> = ({contacts, navigation, socials, onMobileMenuChange, isMobile, className, style}) => {
    const [currentlySelected, setCurrentlySelected] = useState<number>(-1);
    const [currentlySelectedSubMenu, setCurrentlySelectedSubMenu] = useState<number>(-1);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<number>(-1);

    const [searchActive, setSearchActive] = useState<boolean>(false);
    
    useEffect(() => {
        const handleScroll = (): void => {
            var desktopContacts: HTMLElement = document.getElementById('desktop-contacts') as HTMLElement;
            var navbar: HTMLElement = document.getElementById('navbar') as HTMLElement;
            var width = document.documentElement.offsetWidth;
    
            if (width >= 768 || width <= 320) {
                if (desktopContacts && navbar) {
                    var pageScroll: number = window.pageYOffset;
                    var desktopContactsHeight: number = desktopContacts.offsetHeight;
    
                    if (pageScroll > 10)
                        navbar.style.top = `-${desktopContactsHeight + 7}px`;
                    else
                        navbar.style.top = '0';
                }
            } else {
                navbar.style.top = '0';
            }
        };

        const handleInitialSelection = (): void => {
            var url: string = window.location.toString();
    
            if (url.indexOf('#') !== -1) {
                var selection: string = url.split('#')[1];
    
                if (selection) {
                    navigation.forEach((element, index) => {
                        if (`#${selection}` === element.link)
                            setCurrentlySelected(index);
                        else {
                            if (element.subMenu && element.subMenu.length >= 1) {
                                element.subMenu.forEach((subElement, subIndex) => {
                                    if (`#${selection}` === subElement.link) {
                                        setCurrentlySelected(index);
                                        setCurrentlySelectedSubMenu(subIndex);
                                    }
                                });
                            }
                        }
                    });
                } else {
                    setCurrentlySelected(0);
                    setCurrentlySelectedSubMenu(-1);
                }
            } else
                setCurrentlySelected(0);
        };

        handleInitialSelection();

        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!isMobile && isMobileMenuOpen)
            setIsMobileMenuOpen(false);
    }, [isMobile]);

    return (
        <>
            <Wrapper
                className={`${className ? className : ''}`}
                id={`navbar`}
                style={style ? style : {}}
            >
                <Container>
                    <Row
                        id={'desktop-contacts'}
                    >
                        <LogoWrapper>
                            <Logo>
                                <a
                                    href='#home'
                                >
                                    <LogoImage
                                        alt='logo'
                                        src={logo}
                                        style={{
                                            opacity: isMobileMenuOpen ? '0' : '1'
                                        }}
                                    />
                                </a>
                            </Logo>
                        </LogoWrapper>

                        <ContactsWrapper>
                            <ContactsContainer>
                                <>
                                    {contacts.map((contact, index) => {
                                        return (
                                            <Contacts
                                                key={`Contact${index}`}
                                            >
                                                <IconExtension
                                                    name={contact.icon as IconName}
                                                    size={16}
                                                    style={{
                                                        left: '8px',
                                                        position: 'absolute',
                                                        top: '-3px'
                                                    }}
                                                />

                                                <ContactTitle>
                                                    {contact.title}
                                                </ContactTitle>

                                                <ContactInfo>
                                                    {contact.info}
                                                </ContactInfo>
                                            </Contacts>
                                        );
                                    })}
                                </>
                            </ContactsContainer>
                        </ContactsWrapper>

                        <SocialsWrapper>
                            <SocialsContainer>
                                <>
                                    {socials.map((social, index) => {
                                        return (
                                            <SocialLink
                                                key={`Social${index}`}
                                                hovercolor={social.hoverColor}
                                                to={social.link}
                                            >
                                                <IconExtension
                                                    name={social.icon as IconName}
                                                    size={18}
                                                    style={{
                                                        margin: 'auto'
                                                    }}
                                                />
                                            </SocialLink>
                                        );
                                    })}
                                </>
                            </SocialsContainer>
                        </SocialsWrapper>

                        <MobileHamburgerWrapper>
                            <MobileHamburgerContainer>
                                <MobileHamburger>
                                    <MobileHamburgerCheckbox
                                        checked={!isMobile ? false : isMobileMenuOpen}
                                        onChange={(event) => {
                                            onMobileMenuChange(!isMobileMenuOpen, event);
                                            setIsMobileMenuOpen(!isMobileMenuOpen);
                                            setMobileSubMenuOpen(-1);
                                        }}
                                        type='checkbox'
                                    />

                                    <MobileHamburgerLineContainer>
                                        <MobileHamburgerLine />
                                        <MobileHamburgerLine />
                                        <MobileHamburgerLine />
                                    </MobileHamburgerLineContainer>
                                </MobileHamburger>
                            </MobileHamburgerContainer>
                        </MobileHamburgerWrapper>
                    </Row>

                    <Row
                        style={{
                            display: !isMobile ? 'block' : 'none'
                        }}
                    >
                        <NavigationWrapper>
                            <NavigationContainer>
                                <NavigationList>
                                    {navigation.map((element, elementIndex) => {
                                        return (
                                            <NavigationListElement
                                                className={currentlySelected === elementIndex ? 'active' : ''}
                                                key={`ListElement${elementIndex}`}
                                            >
                                                <NavigationListElementLink
                                                    className='navbar-list-element'
                                                    onClick={(event) => {
                                                        var pressedElement: HTMLElement = event.target as HTMLElement;

                                                        if (pressedElement && pressedElement?.classList.contains('navbar-list-element')) {
                                                            setCurrentlySelected(elementIndex);
                                                            setCurrentlySelectedSubMenu(0);
                                                        }
                                                    }}
                                                    to={element.link}
                                                >
                                                    {element.text}
                                                </NavigationListElementLink>

                                                {element.subMenu ?
                                                    <NavigationSubMenuList>
                                                        {element.subMenu.map((subMenuElement, subMenuElementIndex) => {
                                                            return (
                                                                <NavigationSubMenuListElement
                                                                    className={currentlySelected === elementIndex && currentlySelectedSubMenu === subMenuElementIndex ? 'active' : ''}
                                                                    key={`List${elementIndex}SubMenuElement${subMenuElementIndex}`}
                                                                >
                                                                    <NavigationSubMenuListElementLink
                                                                        className='submenu-list-element'
                                                                        onClick={(event) => {
                                                                            var pressedElement: HTMLElement = event.target as HTMLElement;
                                                                            
                                                                            if (pressedElement && pressedElement?.classList.contains('submenu-list-element')) {
                                                                                setCurrentlySelected(elementIndex);
                                                                                setCurrentlySelectedSubMenu(subMenuElementIndex);
                                                                            }
                                                                        }}
                                                                        to={subMenuElement.link}
                                                                    >
                                                                        {subMenuElement.text}
                                                                    </NavigationSubMenuListElementLink>
                                                                </NavigationSubMenuListElement>
                                                            );
                                                        })}
                                                    </NavigationSubMenuList>
                                                :
                                                    <></>
                                                }
                                            </NavigationListElement>
                                        );
                                    })}
                                </NavigationList>
                            </NavigationContainer>
                        </NavigationWrapper>

                        <SearchbarWrapper>
                            <SearchbarContainer>
                                <SearchbarForm
                                    action='#'
                                    method='get'
                                    role='search'
                                >
                                    <SearchbarInput
                                        className={searchActive ? 'active' : ''}
                                        name='s'
                                        placeholder='Cerca nel sito...'
                                        type='search'
                                    />
                                    <SearchbarButton
                                        className={searchActive ? 'active' : ''}
                                        type='button'
                                        onClick={() => {
                                            setSearchActive(!searchActive);
                                        }}
                                    >
                                        <IconExtension
                                            name={'Search'}
                                            size={19}
                                            style={{
                                                margin: 'auto'
                                            }}
                                        />
                                    </SearchbarButton>
                                </SearchbarForm>
                            </SearchbarContainer>
                        </SearchbarWrapper>
                    </Row>
                </Container>
            </Wrapper>

            <MobileWrapper
                id='navbar-mobile'
            >
                <Container>
                    <Row>
                        <LogoWrapper>
                            <Logo>
                                <a
                                    href='#home'
                                >
                                    <LogoImage
                                        alt='logo'
                                        src={logo}
                                    />
                                </a>
                            </Logo>
                        </LogoWrapper>
                    </Row>

                    <Row>
                        <MobileNavigationWrapper>
                            <MobileNavigationContainer>
                                <SearchbarWrapper>
                                    <SearchbarContainer>
                                        <SearchbarForm
                                            action='#'
                                            method='get'
                                            role='search'
                                        >
                                            <SearchbarInput
                                                className={'active'}
                                                name='s'
                                                placeholder='Cerca nel sito...'
                                                type='search'
                                            />
                                            <SearchbarButton
                                                className={'no-interaction'}
                                                type='button'
                                            >
                                                <IconExtension
                                                    name={'Search'}
                                                    size={19}
                                                    style={{
                                                        margin: 'auto'
                                                    }}
                                                />
                                            </SearchbarButton>
                                        </SearchbarForm>
                                    </SearchbarContainer>
                                </SearchbarWrapper>

                                <MobileNavigationList>
                                    {navigation.map((element, elementIndex) => {
                                        return (
                                            <MobileNavigationListElement
                                                className={currentlySelected === elementIndex ? 'active' : ''}
                                                key={`ListElement${elementIndex}`}
                                            >
                                                <MobileNavigationListElementLink
                                                    className='navbar-list-element'
                                                    onClick={(event) => { 
                                                        var pressedElement: HTMLElement = event.target as HTMLElement;

                                                        if (pressedElement && pressedElement?.classList.contains('navbar-list-element')) {
                                                            setCurrentlySelected(elementIndex);
                                                            setCurrentlySelectedSubMenu(0);

                                                            setTimeout(() => {
                                                                onMobileMenuChange(false);
                                                                setIsMobileMenuOpen(false);
                                                                setMobileSubMenuOpen(-1);
                                                            }, 250);
                                                        }
                                                    }}
                                                    to={element.link}
                                                >
                                                    {element.text}
                                                </MobileNavigationListElementLink>

                                                {element.subMenu ?
                                                    <>
                                                        <MobileNavigationSubMenuList
                                                            className={mobileSubMenuOpen === elementIndex ? 'visible' : ''}
                                                        >
                                                            {element.subMenu.map((subMenuElement, subMenuElementIndex) => {
                                                                return (
                                                                    <MobileNavigationSubMenuListElement
                                                                        className={`${currentlySelected === elementIndex && currentlySelectedSubMenu === subMenuElementIndex ? 'active' : ''} ${(subMenuElementIndex + 1) == element.subMenu?.length ? 'last-child' : ''}`}
                                                                        key={`List${elementIndex}SubMenuElement${subMenuElementIndex}`}
                                                                    >
                                                                        <MobileNavigationSubMenuListElementLink
                                                                            className='submenu-list-element'
                                                                            onClick={(event) => {
                                                                                var pressedElement: HTMLElement = event.target as HTMLElement;
                                                                                
                                                                                if (pressedElement && pressedElement?.classList.contains('submenu-list-element')) {
                                                                                    setCurrentlySelected(elementIndex);
                                                                                    setCurrentlySelectedSubMenu(subMenuElementIndex);

                                                                                    setTimeout(() => {
                                                                                        onMobileMenuChange(false);
                                                                                        setIsMobileMenuOpen(false);
                                                                                        setMobileSubMenuOpen(-1);
                                                                                    }, 250);
                                                                                }
                                                                            }}
                                                                            to={subMenuElement.link}
                                                                        >
                                                                            {subMenuElement.text}
                                                                        </MobileNavigationSubMenuListElementLink>
                                                                    </MobileNavigationSubMenuListElement>
                                                                );
                                                            })}
                                                        </MobileNavigationSubMenuList>

                                                        <MobileNavigationSubMenuListExpand>
                                                            <IconExtension
                                                                name={mobileSubMenuOpen === elementIndex ? 'Minus' : 'Plus'}
                                                                onClick={() => {
                                                                    setMobileSubMenuOpen(mobileSubMenuOpen === elementIndex ? -1 : elementIndex);
                                                                }}
                                                                size={16}
                                                            />
                                                        </MobileNavigationSubMenuListExpand>
                                                    </>
                                                :
                                                    <></>
                                                }
                                            </MobileNavigationListElement>
                                        );
                                    })}
                                </MobileNavigationList>
                            </MobileNavigationContainer>
                        </MobileNavigationWrapper>
                    </Row>
                </Container>   
            </MobileWrapper>
        </>
    );
};