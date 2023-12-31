export type CatUploadData = {
    file: File;
};

export type CatUploadCallbacks = {
    onSuccess: () => void;
    onError: (error: Error) => void;
};

export type BasicCat = {
    id: string;
    url: string;
    width: number;
    height: number;
    score: number;
};

export type Cat = BasicCat & {
    favouriteData: Favourite;
    isFavourite: boolean;
}

export type Favourite = {
    id: string;
    imageId: string;
    userId: string;
    subId: string;
    createdAt: string;
};


export type Vote = {
    id: string;
    imageId: string;
    subId: string;
    createdAt: string;
    value: number;
};

export type CatVotingParams = {
    catId: string;
    score: number;
};