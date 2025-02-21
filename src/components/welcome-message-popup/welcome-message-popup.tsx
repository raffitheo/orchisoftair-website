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
>(({ className, content, onClick, ...props }, ref) => {
    return (
        <div
            className={`welcome-popup-overlay${className ? ` ${className}` : ''}`}
            ref={ref}
            {...props}
        >
            <div className="welcome-popup">
                {parse(content)}

                <div className="welcome-popup-button" onClick={onClick}>
                    OK
                </div>
            </div>
        </div>
    );
});
WelcomeMessagePopup.displayName = 'WelcomeMessagePopup';

export type { WelcomeMessagePopupProps };
export default WelcomeMessagePopup;
