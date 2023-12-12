import { useMemo } from 'react';
import useCatAPI from "./useCatAPI";
import * as catAPI from "./api";
import { Cat, Favourite, Vote } from "./types";
import { useMutation, useQueryClient } from '@tanstack/react-query';


type CatHelpers = {
    cat: Cat;
    vote: (score: number) => void;
    isLoading: boolean;
    isVoting: boolean;
    isFavouriting: boolean;
    updatingFavourites: boolean;
    toggleFavourite: () => void;
}

export default function useCat(catId: string): CatHelpers {
    const { cats, votes, favourites, updatingFavourites, isLoading } = useCatAPI();

    const queryClient = useQueryClient();

    const { mutate: favourite, isLoading: isFavouriting } = useMutation({
        mutationFn: () => catAPI.favouriteCat(catId),
        onSuccess: () => queryClient.invalidateQueries(['favourites'])
    });

    const { mutate: unfavourite, isLoading: isUnfavouriting } = useMutation({
        mutationFn: (favouriteId: number) => catAPI.unfavouriteCat(favouriteId),
        onSuccess: () => queryClient.invalidateQueries(['favourites'])
    });

    const { mutate: vote, isLoading: isVoting } = useMutation({
        mutationFn: (score: number) => catAPI.judgeCat({ score, catId }),
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
        vote,
        isLoading,
        isVoting,
        isFavouriting: isFavouriting || isUnfavouriting,
        updatingFavourites,
        toggleFavourite
    };
}