export type CatUploadData = {
    file: File;
};

export type CatUploadCallbacks = {
    onSuccess: () => void;
    onError: (error: Error) => void;
};
