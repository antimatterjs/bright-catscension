import './Upload.css';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCatAPI from '@/data/useCatAPI';


const UploadRoute = () => {
    // TODO: If we have a file selected, but have not yet uploaded it,
    // we shoud display a dialog advising that the image has not been uploaded yet
    
    const { uploadCat } = useCatAPI();
    const navigate = useNavigate();

    const [ file, setFile ] = useState<File | null>(null);
    const [ error, setError ] = useState<Error | null>(null);

    const fileURL = useMemo(() => file ? URL.createObjectURL(file) : null, [file]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!file) return;
        uploadCat(
            { file },
            {
                onSuccess: () => {
                    navigate('/');
                },
                onError: (error: Error) => setError(error)
            }
        );
    }

    return (
        <div className="upload-page">
            <h1>Upload your cats here!</h1>
            {fileURL && <img src={fileURL} className="preview-img" alt="Preview" />}
            <form role="form" onSubmit={handleSubmit}>
                <label htmlFor="file">Upload a file</label>
                <input type="file" id="file" onChange={handleChange} />
                <button type="submit" disabled={!file}>Upload</button>
                {fileURL && <button type="reset" onClick={() => setFile(null)}>Clear</button>}
                {error && <p role="alert">{error.message}</p>}
            </form>
        </div>
    );
}

export default UploadRoute;
