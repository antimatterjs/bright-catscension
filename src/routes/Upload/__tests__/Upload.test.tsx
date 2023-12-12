import { fullRender, screen } from "@/testing/test-helpers";
import UploadRoute from "..";

describe('The Upload Page', () => {
    it('should have a form', () => {
        fullRender(<UploadRoute />);
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
    });

    it('should have a file input', () => {
        fullRender(<UploadRoute />);
        const fileInput = screen.getByLabelText(/upload a file/i);
        expect(fileInput).toBeInTheDocument();
    });
});