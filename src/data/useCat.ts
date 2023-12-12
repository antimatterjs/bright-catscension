import { useMemo } from 'react';
import useCatAPI from "./useCatAPI";
import * as catAPI from "./api";
import { Cat, Favourite, Vote } from "./types";
import { useMutation, useQueryClient } from '@tanstack/react-query';


type CatHelpers = {
    cat: Cat;
    submitVote: (score: number) => void;
    isLoading: boolean;
    updatingFavourites: boolean;
    toggleFavourite: () => void;
}

export default function useCat(catId: string): CatHelpers {
    const { cats, votes, favourites, updatingFavourites, isLoading } = useCatAPI();

    const queryClient = useQueryClient();

    const { mutate: favourite } = useMutation({
        mutationFn: () => catAPI.favouriteCat(catId),
        onSuccess: () => queryClient.invalidateQueries(['favourites'])
    });

    const { mutate: unfavourite } = useMutation({
        mutationFn: () => catAPI.unfavouriteCat(catId),
        onSuccess: () => queryClient.invalidateQueries(['favourites'])
    });

    const { mutate: submitVote } = useMutation({
        mutationFn: (params: { score: number }) => catAPI.judgeCat({ ...params, catId }),
        onSuccess: () => queryClient.invalidateQueries(['votes'])
    });

    const favouriteData = useMemo(() => {
        const fave = favourites?.find((favourite: Favourite) => favourite.imageId === catId);
        return fave;
    }, [favourites, catId]);

    const score = useMemo(() => (
        votes
        ?.filter((vote: Vote) => vote.imageId === catId)
        .reduce((acc: number, vote: Vote) => acc + vote.value, 0) || 0
    ), [votes, catId]);

    const cat = useMemo(() => {
        const basicCat = cats.find((cat) => cat.id === catId);
        return basicCat ? {
            ...basicCat,
            favouriteData,
            isFavourite: !!favouriteData,
            score
        } : {};
    }, [cats, catId, favouriteData, score]);

    
    const toggleFavourite = () => {
        if (favouriteData) {
            unfavourite(favouriteData?.id);
        } else {
            favourite(catId);
        }
    }

    return {
        cat,
        submitVote,
        isLoading,
        updatingFavourites,
        toggleFavourite
    };
}