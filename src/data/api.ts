import { TheCatAPI } from '@thatapicompany/thecatapi';
import { CatUploadData, CatVotingParams } from './types';

const CAT_API_KEY = 'live_vN91Xl6mWJDvOj37Hmb8Nqd3AiVE5grShN5aJpnYVr9BWkvnnyU2WBcjiMWS4CsB';
const catAPI = new TheCatAPI(CAT_API_KEY);

export async function postCat(data: CatUploadData) {
    try {
        await catAPI.images.uploadImage(data.file);
    } catch (e) {
        throw new Error(`Hissss: ${e.message}`);
    }
}

export async function getCats() {
    try {
        const cats = await catAPI.images.getImages({ limit: 10 });
        return cats;
    } catch (e) {
        throw new Error('Failed to fetch cats');
    }
}

export async function getVotes() {
    try {
        const votes = await catAPI.votes.getVotes();
        return votes;
    } catch (e) {
        throw new Error('Failed to fetch votes');
    }
}

export async function judgeCat({ catId, score }: CatVotingParams) {
    try {
        return await catAPI.votes.addVote({ imageId: catId, value: score});
    } catch (e) {
        throw new Error('Failed to judge cat');
    }
}

export async function favouriteCat(catId: string) {
    try {
        await catAPI.favourites.addFavourite(catId);
    } catch (e) {
        throw new Error('Failed to favourite cat');
    }
}

export async function unfavouriteCat(favouriteId: number) {
    try {
        await catAPI.favourites.deleteFavourite(favouriteId);
    } catch (e) {
        throw new Error('Failed to unfavourite cat');
    }
}

export async function getFavourites() {
    try {
        const favourites = await catAPI.favourites.getFavourites();
        return favourites;
    } catch (e) {
        throw new Error('Failed to fetch favourites');
    }
}
