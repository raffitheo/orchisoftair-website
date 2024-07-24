import parse from 'html-react-parser';
import React from 'react';

import './accordion.sass';

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
    content: string;
    title: string;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
    ({ content, title, ...props }, ref) => {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <div ref={ref} {...props}>
                <div className={isOpen ? 'open' : 'close'}>
                    <div
                        className="accordion-content-line"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <h4>{title}</h4>
                        <svg
                            fill="none"
                            height={18}
                            viewBox="0 0 18 18"
                            width={18}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17 9L9 1L1 9"
                                stroke="#8A9299"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                            />
                        </svg>
                    </div>

                    <div className="content">{parse(content)}</div>
                </div>
            </div>
        );
    },
);
Accordion.displayName = 'Accordion';

export type { AccordionProps };
export default Accordion;
