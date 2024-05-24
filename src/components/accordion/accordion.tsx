import { Fragment, HTMLAttributes, forwardRef, useState } from 'react';

import './accordion.sass';

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
    content: string;
    title: string;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
    ({ content, title, ...props }, ref) => {
        const [isOpen, setIsOpen] = useState<boolean>(false);

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

                    <div className="content">
                        {content
                            .replace(/\\r\\n/g, '\n')
                            .split('\n')
                            .map((line, i) => (
                                <Fragment key={i}>
                                    {line}
                                    <br />
                                </Fragment>
                            ))}
                    </div>
                </div>
            </div>
        );
    },
);
Accordion.displayName = 'Accordion';

export default Accordion;
