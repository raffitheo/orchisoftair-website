import React from 'react';

import { OrchiWebsite } from './OrchiWebsite';

import {
    render,
    screen
} from '@testing-library/react';

test('renders learn react link', () => {
    render(<OrchiWebsite />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
