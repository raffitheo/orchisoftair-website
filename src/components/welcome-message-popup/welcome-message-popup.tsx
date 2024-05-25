import parse from 'html-react-parser';
import { HTMLAttributes, forwardRef } from 'react';

import './welcome-message-popup.sass';

export interface WelcomeMessagePopupProps
    extends HTMLAttributes<HTMLDivElement> {
    content: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const WelcomeMessagePopup = forwardRef<
    HTMLDivElement,
    WelcomeMessagePopupProps
>(({ content, onClick, ...props }, ref) => {
    return (
        <div className="development-popup-overlay" ref={ref} {...props}>
            <div className="development-popup-container">
                {parse(content)}

                <div className="development-popup-button" onClick={onClick}>
                    OK
                </div>
            </div>
        </div>
    );
});
WelcomeMessagePopup.displayName = 'WelcomeMessagePopup';

export default WelcomeMessagePopup;
