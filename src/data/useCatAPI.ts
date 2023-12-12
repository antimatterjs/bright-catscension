import { useCallback, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as catAPI from './api';
import { Cat, CatVotingParams, Favourite, Vote } from './types';
// import { CatUploadData, CatUploadCallbacks } from './types';


type CatAPIHelpers = {
    cats: Cat[];
    votes: Vote[];
    uploadCat: any; // returns whatever type useMutation returns. Would probably have to look through tanstack's github repo to find out what that is
    isLoading: boolean;
    favourites: Favourite[];
    updatingFavourites: boolean;
}

export default function useCatAPI(): CatAPIHelpers {
    const queryClient = useQueryClient();

    const { data: cats, isLoading } = useQuery({
        queryKey: ['cats'],
        queryFn: catAPI.getCats,
    });

    const { data: votes } = useQuery({
        queryKey: ['votes'],
        queryFn: catAPI.getVotes,
    });

    const { data: favourites, isFetching: updatingFavourites } = useQuery({
        queryKey: ['favourites'],
        queryFn: catAPI.getFavourites,
    });

    const { mutate: uploadCat } = useMutation({
        mutationFn: catAPI.postCat,
        onSuccess: () => queryClient.invalidateQueries(['cats'])
    });

    return {
        cats,
        votes,
        uploadCat,
        isLoading,
        favourites,
        updatingFavourites
    };
}
