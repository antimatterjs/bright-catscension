import { useMutation, useQuery } from '@tanstack/react-query';
import * as catAPI from './api';
import { CatVotingParams } from './types';
// import { CatUploadData, CatUploadCallbacks } from './types';


type CatAPIHelpers = {
    cats: any;
    uploadCat: any; // returns whatever type useMutation returns. Would probably have to look through tanstack's github repo to find out what that is
    isLoading: boolean;
    vote: any; // same issue as uploadCat
    toggleFavourite: (catId: string, isFavourite: boolean) => void;
}

export default function useCatAPI(): CatAPIHelpers {
    const { data: cats, isLoading } = useQuery({
        queryKey: ['cats'],
        queryFn: catAPI.getCats,
        staleTime: 1000 * 60 * 5 // 5 minutes
    });

    const { mutate: uploadCat } = useMutation({ mutationFn: catAPI.postCat });
    const { mutate: vote } = useMutation({ mutationFn: catAPI.judgeCat });
    const { mutate: favourite } = useMutation({ mutationFn: catAPI.favouriteCat });
    const { mutate: unfavourite } = useMutation({ mutationFn: catAPI.unfavouriteCat });

    const toggleFavourite = (catId: string, isFavourite: boolean) => {
        if (isFavourite) {
            unfavourite(catId);
        } else {
            favourite(catId);
        }
    }

    return {
        cats,
        uploadCat,
        isLoading,
        vote,
        toggleFavourite
    };
}
