import parse from 'html-react-parser';
import React from 'react';

import './welcome-message-popup.sass';

interface WelcomeMessagePopupProps
    extends React.HTMLAttributes<HTMLDivElement> {
    content: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const WelcomeMessagePopup = React.forwardRef<
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

export type { WelcomeMessagePopupProps };
export default WelcomeMessagePopup;
