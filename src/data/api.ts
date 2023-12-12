import { CatUploadData } from './types';;

const CAT_API_KEY = 'live_vN91Xl6mWJDvOj37Hmb8Nqd3AiVE5grShN5aJpnYVr9BWkvnnyU2WBcjiMWS4CsB';

export async function postCat(data: CatUploadData) {
    const body = new FormData();
    body.append('file', data.file);

    const response = await fetch('https://api.thecatapi.com/v1/images/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-api-key': CAT_API_KEY
        },
        body
    });
    console.log(response);
    if (response.ok) {
        return response;
    }
    throw new Error('Failed to fetch cats: ' + response);
}

export async function getCats() {
    const response = await fetch('https://api.thecatapi.com/v1/images', {
        method: 'GET',
        headers: {
            'x-api-key': CAT_API_KEY
        },
    });
    if ([200, 201].includes(response.status)) {
        const cats = await response.json();
        return cats;
    }
    throw new Error('Failed to fetch cats');
}