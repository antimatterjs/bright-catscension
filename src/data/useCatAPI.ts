import { useMutation, useQuery } from '@tanstack/react-query';
import { postCat, getCats } from './api';
// import { CatUploadData, CatUploadCallbacks } from './types';


type CatAPIHelpers = {
    cats: any;
    uploadCat: any // returns whatever type useMutation returns. Would probably have to look through tanstack's github repo to find out what that is
}

export default function useCatAPI(): CatAPIHelpers {
    const { data: cats } = useQuery({
        queryKey: ['cats'],
        queryFn: getCats
    });

    const { mutate: uploadCat } = useMutation({ mutationFn: postCat });

    return {
        cats,
        uploadCat,
    };
}
