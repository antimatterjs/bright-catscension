import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as catAPI from './api';
import { BasicCat, Favourite, Vote } from './types';
import { useParams } from 'react-router-dom';

type CatAPIHelpers = {
    cats: BasicCat[];
    votes: Vote[];
    uploadCat: any; // returns whatever type useMutation returns. Would probably have to look through tanstack's github repo to find out what that is
    isLoading: boolean;
    isError: boolean;
    isUploading: boolean;
    favourites: Favourite[];
    updatingFavourites: boolean;
}

export default function useCatAPI(): CatAPIHelpers {
    const { page } = useParams<{ page: string }>();
    const pageNumber = page ? parseInt(page, 10) : 0;
    const queryClient = useQueryClient();

    const { data: cats, isLoading, isError } = useQuery({
        queryKey: ['cats', pageNumber],
        queryFn: () => catAPI.getCats(pageNumber),
    });

    const { data: votes } = useQuery({
        queryKey: ['votes'],
        queryFn: catAPI.getVotes,
    });

    const { data: favourites, isFetching: updatingFavourites } = useQuery({
        queryKey: ['favourites'],
        queryFn: catAPI.getFavourites,
    });

    const { mutate: uploadCat, isLoading: isUploading } = useMutation({
        mutationFn: catAPI.postCat,
        onSuccess: () => queryClient.invalidateQueries(['cats'])
    });

    return {
        cats,
        votes,
        uploadCat,
        isLoading,
        isError,
        isUploading,
        favourites,
        updatingFavourites
    };
}
