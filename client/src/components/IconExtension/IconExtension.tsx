import React from 'react';

import { IconExtensionProps } from './IIconExtensionProps';

import * as icons from 'react-feather';

export const IconExtension = ({ name, ...rest }: IconExtensionProps) => {
    const IconComponent = icons[name];
    
    return (
        <IconComponent
            {...rest}
        />
    );
};