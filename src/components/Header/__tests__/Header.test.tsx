import { fullRender, screen } from '@/testing/test-helpers';
import Header from '../';


describe('The Header', () => {
    it('should include the logo', () => {
        fullRender(<Header />);
        const logo = screen.getByRole('heading', { name: /bright catscension/i });
        expect(logo).toBeInTheDocument();
    });

    it('should include the correct links', () => {
        fullRender(<Header />);
        const homeLink = screen.getByRole('link', { name: /home/i });
        expect(homeLink).toBeInTheDocument();

        const uploadLink = screen.getByRole('link', { name: /upload/i });
        expect(uploadLink).toBeInTheDocument();
    });
});