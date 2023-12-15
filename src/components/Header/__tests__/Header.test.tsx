import { fullRender, screen } from '@/testing/test-helpers';
import Header from '../';


describe('The Header', () => {
    it('should include the logo', () => {
        fullRender(<Header />);
        const logo = screen.getByRole('img');
        expect(logo).toBeInTheDocument();
    });

    it('should include the correct links', () => {
        fullRender(<Header />);
        const uploadLink = screen.getByRole('link', { name: /upload/i });
        expect(uploadLink).toBeInTheDocument();
    });
});