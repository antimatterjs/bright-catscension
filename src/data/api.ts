import { CatUploadData, CatVotingParams } from './types';;

const CAT_API_KEY = 'live_vN91Xl6mWJDvOj37Hmb8Nqd3AiVE5grShN5aJpnYVr9BWkvnnyU2WBcjiMWS4CsB';

export async function postCat(data: CatUploadData) {
    const formData = new FormData();
    formData.append('file', 'why 500?');

    const response = await fetch('https://api.thecatapi.com/v1/images/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-api-key': CAT_API_KEY
        },
        body: formData
    });
    if (response.ok) {
        return response;
    }
    throw new Error('Hissss');
}

export async function getCats() {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10', {
        method: 'GET',
        headers: {
            'x-api-key': CAT_API_KEY
        },
    });
    if (response.ok) {
        const cats = await response.json();
        return cats;
    }
    throw new Error('Failed to fetch cats');
}

export async function judgeCat({ catId, score }: CatVotingParams) {
    const response = await fetch('https://api.thecatapi.com/v1/votes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': CAT_API_KEY
        },
        body: JSON.stringify({
            image_id: catId,
            value: score
        })
    });
    if (response.ok) {
        return response;
    }
    throw new Error('Failed to judge cat');
}

export async function favouriteCat(catId: string) {
    const response = await fetch('https://api.thecatapi.com/v1/favourites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': CAT_API_KEY
        },
        body: JSON.stringify({
            image_id: catId
        })
    });
    if (response.ok) {
        return response;
    }
    throw new Error('Failed to favourite cat');
}

export async function unfavouriteCat(favouriteId: string) {
    const response = await fetch(`https://api.thecatapi.com/v1/favourites/${favouriteId}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': CAT_API_KEY
        }
    });
    if (response.ok) {
        return response;
    }
    throw new Error('Failed to unfavourite cat');
}
