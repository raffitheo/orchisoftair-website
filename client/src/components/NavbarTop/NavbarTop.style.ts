import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.section`
    background-color: ${(props) => props.theme.main};
    left: 0;
    padding: 7px 0 0 0;
    position: fixed;
    right: 0;
    transition: all 200ms linear;
    width: 100%;
    z-index: 99;
`;

export const Container = styled.div`
    margin: 0 auto;
    padding: 0 15px;

    @media (min-width: 768px) {
        width: 750px;
    }
    @media (min-width: 992px) {
        width: 970px;
    }
    @media (min-width: 1200px) {
        width: 1170px;
    }

    &::before, &::after {
        content: ' ';
        display: table;
    }
    &::after {
        clear: both;
    }
`;

export const Row = styled.div`
    margin: 0 -15px;

    &::before, &::after {
        content: ' ';
        display: table;
    }
    &::after {
        clear: both;
    }
`;

export const LogoWrapper = styled.div`
    min-height: 1px;
    padding: 0 15px;
    position: relative;

    @media (min-width: 768px) {
        float: left;
        width: 16.66666667%;
    }
    @media (min-width: 1200px) {
        float: left;
        width: 16.66666667%;
    }
`;

export const Logo = styled.div`
    height: 106px;
    width: 152px;

    @media (min-width: 320px) and (max-width: 767px) {
        height: auto;
        margin: auto;
        width: 80px;
    )
`;

export const LogoImage = styled.img`
    height: 100%;
    transition: all 200ms linear;
    width: auto;

    @media (min-width: 320px) and (max-width: 767px) {
        height: auto;
        width: 100%;
    }
`;

export const ContactsWrapper = styled.div`
    float: left;
    min-height: 1px;
    padding: 0 15px;
    position: relative;

    @media (min-width: 768px) {
        width: 58.33333333%;
    }
    @media (min-width: 1200px) {
        width: 66.6%;
    }
`;

export const ContactsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 30px 0 22px;

    @media (min-width: 320px) and (max-width: 767px) {
        display: none;
    }
`;

export const Contacts = styled.div`
    color: ${(props) => props.theme.textPrimary};
    display: inline-block;
    margin-right: 30px;
    padding-left: 30px;
    position: relative;
    text-align: left;
    text-transform: uppercase;

    &:last-of-type {
        margin-right: 0;
    }
`;

export const ContactTitle = styled.h4`
    color: ${(props) => props.theme.textAccent};
    line-height: 1;
    margin-bottom: 7px;

    @media (min-width: 768px) and (max-width: 990px) {
        font-size: 12px;
    }
`;

export const ContactInfo = styled.h1`
    line-height: 1;

    @media (min-width: 768px) and (max-width: 990px) {
        font-size: 16px;
    }
`;

export const SocialsWrapper = styled.div`
    min-height: 1px;
    padding: 0 15px;
    position: relative;

    @media (min-width: 768px) {
        float: left;
        width: 25%;
    }
    @media (min-width: 1200px) {
        float: left;
        width: 16.66666667%;
    }
`;

export const SocialsContainer = styled.div`
    padding: 33px 0;
    text-align: right;

    @media (min-width: 320px) and (max-width: 767px) {
        padding: 0;
        position: absolute;
        right: 15px;
        text-align: right;
        top: -63px;
    }
`;

export const SocialLink = styled.a<{ hovercolor: string }>`
    align-items: center;
    border: 2px solid ${(props) => props.theme.textPrimary};
    border-radius: 50%;
    color: ${(props) => props.theme.textPrimary};
    display: inline-flex;
    height: 40px;
    justify-content: center;
    line-height: 1;
    margin-right: 10px;
    text-align: center;
    transition: all 200ms linear;
    width: 40px;

    &:last-of-type {
        margin-right: 0;
    }

    &:hover {
        border-color: ${(props) => props.hovercolor};
        color: ${(props) => props.hovercolor};
    }
`;

export const MobileHamburgerWrapper = styled.div`
    min-height: 1px;
    padding: 0 15px;
    position: relative;

    @media (min-width: 768px) {
        float: left;
        width: 25%;
    }
    @media (min-width: 1200px) {
        float: left;
        width: 16.66666667%;
    }
`;

export const MobileHamburgerContainer = styled.div`
    display: none;
    padding: 33px 0;
    text-align: left;

    @media (min-width: 320px) and (max-width: 767px) {
        display: block;
        left: 15px;
        padding: 0;
        position: absolute;
        text-align: left;
        top: -63px;
    }
`;

export const MobileHamburgerCheckbox = styled.input`
    cursor: pointer;
    display: block;
    height: 100%;
    opacity: 0;
    position: absolute;
    width: 100%;
    z-index: 2;
    -webkit-touch-callout: none;
`;

export const MobileHamburgerLineContainer = styled.div`
    bottom: 0;
	height: 22px;
	left: 0;
	margin: auto;
	position: absolute;
	right: 0;
	top: 0;
	width: 32px;
`;

export const MobileHamburgerLine = styled.span`
    background-color: ${(props) => props.theme.textAccent};
    border-radius: 1px;
    display: block;
    height: 3px;
    position: absolute;
    transition: all 200ms linear;
    width: 100%;

    &:nth-of-type(1) {
        top: 0;
    }
    &:nth-of-type(2) {
        bottom: 50%;
        top: 50%;
        transform: translateY(-50%);
    }
    &:nth-of-type(3) {
        bottom: 0;
    }
`;

export const MobileHamburger = styled.div`
    cursor: pointer;
    height: 40px;
    position: relative;
    width: 40px;
    
	&.active, ${MobileHamburgerCheckbox}:checked + ${MobileHamburgerLineContainer} {
		${MobileHamburgerLine} {
			&:nth-of-type(1) {
				top: 10px;
				transform: rotate(45deg);
			}
            &:nth-of-type(2) {
                opacity: 0;
            }
			&:nth-of-type(3) {
				bottom: 10px;
				transform: rotate(-45deg);
			}
		}
	}
`;

export const NavigationWrapper = styled.div`
    min-height: 1px;
    padding: 0 15px;
    position: relative;

    @media (min-width: 768px) {
        float: left;
        width: 75%;
    }
`;

export const NavigationContainer = styled.div`
    display: block;
`;

export const NavigationList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const NavigationListElementLink = styled(Link)`
    color: ${(props) => props.theme.textPrimary};
    display: block;
    font-size: 16px;
    padding: 20px 0 19px;
    text-transform: uppercase;
    transition: all 200ms linear;
`;

export const NavigationSubMenuList = styled.ul`
    background-color: ${(props) => props.theme.dark};
    cursor: default;
    left: 50%;
    margin-left: -61px;
    opacity: 0;
    padding: 16px 0 16px 40px;
    position: absolute;
    top: 78px;
    transition: all 200ms linear;
    visibility: hidden;
    width: 250px;
    z-index: 9;
`;

export const NavigationListElement = styled.li`
    display: inline-block;
    line-height: 1.2;
    margin-right: 78px;
    position: relative;

    &::before {
        background-color: ${(props) => props.theme.textAccent};
        bottom: 0;
        content: '';
        height: 2px;
        left: 0;
        position: absolute;
        right: 0;
        transition: all 200ms linear;
        width: 0;
    }

    &.active {
        &::before {
            width: 100%;
        }
    }

    &:hover {
        ${NavigationListElementLink} {
            color: ${(props) => props.theme.textAccent};
        }

        ${NavigationSubMenuList} {
            opacity: 1;
            top: 58px;
            visibility: visible;
        }
    }

    @media (min-width: 991px) and (max-width: 1024px) {
        margin-right: 45px;
    }
    @media (min-width: 768px) and (max-width: 990px) {
        margin-right: 30px;
    }
`;

export const NavigationSubMenuListElementLink = styled(Link)`
    color: ${(props) => props.theme.textPrimary};
    cursor: pointer;
    display: block;
    font-size: 16px;
    padding: 0;
    text-transform: uppercase;
    transition: all 200ms linear;
`;

export const NavigationSubMenuListElement = styled.li`
    color: black;
    display: block;
    line-height: 1.2;
    margin: 21px 0;
    position: relative;

    &:hover, &.active {
        ${NavigationSubMenuListElementLink} {
            color: ${(props) => props.theme.textAccent};
        }
    }
`;

export const SearchbarWrapper = styled.div`
    min-height: 1px;
    padding: 0 15px;
    position: relative;

    @media (min-width: 768px) {
        float: left;
        width: 25%;
    }
`;

export const SearchbarContainer = styled.div`
    float: right;
    overflow: hidden;
    padding: 20px 0 19px;
    position: relative;
    text-align: right;
    width: 180px;
`;

export const SearchbarForm = styled.form`
    display: block;
    margin-top: 0em;
`;

export const SearchbarInput = styled.input`
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.textPrimary};
    color: ${(props) => props.theme.textPrimary};
    visibility: hidden;
    margin-right: 20px;
    opacity: 0;
    position: relative;
    transition: all 200ms linear;
    width: 50%;
    -webkit-appearance: none;

    &::placeholder {
        color: ${(props) => props.theme.textPrimary};
    }

    &.active {
        visibility: visible;
        opacity: 1;
        width: calc(100% - 20px);
    }
`;

export const SearchbarButton = styled.button`
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.textPrimary};
    cursor: pointer;
    font-size: 19px;
    position: absolute;
    right: 0;
    top: 20px;
    transition: all 200ms linear;

    &:hover:not(.no-interaction), &.active:not(.no-interaction) {
        color: ${(props) => props.theme.textAccent};
    }
`;

export const MobileWrapper = styled.section`
    background-color: ${(props) => props.theme.dark};
    display: none;
    height: 100vh;
    left: -250px;
    padding: 7px;
    position: fixed;
    top: 0;
    transition: all 200ms linear;
    width: 250px;
    z-index: 99;

    @media (min-width: 320px) and (max-width: 767px) {
        display: block;
    }
`;

export const MobileNavigationWrapper = styled.div`
    min-height: 1px;
    padding: 0 15px;
    position: relative;

    @media (min-width: 768px) {
        float: left;
        width: 75%;
    }
`;

export const MobileNavigationContainer = styled.div`
    display: block;
`;

export const MobileNavigationList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const MobileNavigationListElementLink = styled(Link)`
    color: ${(props) => props.theme.textPrimary};
    display: block;
    font-size: 16px;
    margin-right: 40px;
    padding: 20px 0 5px;
    text-transform: uppercase;
    transition: all 200ms linear;

    &:hover {
        color: ${(props) => props.theme.textAccent};
    }
`;

export const MobileNavigationListElement = styled.li`
    display: inline-block;
    line-height: 1.2;
    position: relative;
    width: 100%;

    &.active {
        ${MobileNavigationListElementLink} {
            color: ${(props) => props.theme.textAccent};
        }
    }
`;

export const MobileNavigationSubMenuListExpand = styled.div`
    align-items: center;
    color: ${(props) => props.theme.textPrimary};
    cursor: pointer;
    display: flex;
    height: 19px;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 20px;
    width: 19px;

    &:hover {
        color: ${(props) => props.theme.textAccent};
    }
`;

export const MobileNavigationSubMenuList = styled.ul`
    background-color: ${(props) => props.theme.dark};
    cursor: default;
    display: block;
    height: auto;
    margin-left: 25px;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
    transition: all 200ms linear;
    visibility: hidden;
    z-index: 9;

    &.visible {
        max-height: 100vh;
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
    }
`;

export const MobileNavigationSubMenuListElementLink = styled(Link)`
    color: ${(props) => props.theme.textPrimary};
    cursor: pointer;
    display: block;
    font-size: 16px;
    padding: 0;
    text-transform: uppercase;
    transition: all 200ms linear;
`;

export const MobileNavigationSubMenuListElement = styled.li`
    color: black;
    display: block;
    line-height: 1.2;
    margin: 21px 0;
    position: relative;

    &.last-child {
        margin-bottom: 10px;
    }

    &:hover, &.active {
        ${MobileNavigationSubMenuListElementLink} {
            color: ${(props) => props.theme.textAccent};
        }
    }
`;