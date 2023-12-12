import './Upload.css';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCatAPI from '@/data/useCatAPI';


const UploadRoute = () => {
    // TODO: If we have a file selected, but have not yet uploaded it,
    // we shoud display a dialog advising that the image has not been uploaded yet
    
    const { uploadCat, isUploading } = useCatAPI();
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

            {isUploading && <p>Uploading...</p>}

            <form role="form" onSubmit={handleSubmit}>
                <div className="uploader-container">
                    <input type="file" id="file" aria-label="Upload a file"
                    onChange={handleChange} />
                </div>
                
                <div className="control-btns">
                    <button type="submit" disabled={!file}>
                        Upload
                    </button>
                    <button type="reset"
                      onClick={() => setFile(null)}
                      disabled={!file}>
                        Clear
                    </button>
                </div>
                
                {error && <p role="alert">{error.message}</p>}
            </form>
        </div>
    );
}

export default UploadRoute;
