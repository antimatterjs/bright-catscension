import { render, screen } from '@testing-library/react';
import App from '../App';

describe('The Main App Layout', () => {
    it('should include the header', () => {
        render(<App />);
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
    });

    it('should include the footer', () => {
        render(<App />);
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
    });
});
