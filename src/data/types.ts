export type CatUploadData = {
    file: File;
};

export type CatUploadCallbacks = {
    onSuccess: () => void;
    onError: (error: Error) => void;
};

export type Cat = {
    id: string;
    url: string;
    width: number;
    height: number;
    favourite?: boolean;
};

export type CatVotingParams = {
    catId: string;
    score: number;
};

