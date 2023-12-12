import { Cat } from "@/data/types";
import useCatAPI from "@/data/useCatAPI";


type CatThumbProps = {
    cat: Cat;
};

const CatThumb = ({ cat }: CatThumbProps) => {
    const { vote: voteForCat, toggleFavourite } = useCatAPI();

    const vote = (score: number) => {
        voteForCat({ id: cat.id, score});
    }

    return (
        <div className="cat-thumb">
            <button onClick={() => toggleFavourite(cat.id)}>
                {cat.favourite ? 'Unfavourite' : 'Favourite'}
            </button>
            <div className="cat-img">
                <img src={cat.url} width={cat.width} height={cat.height} />
            </div>
            <div role="group">
                <button onClick={() => vote(1)}>Like</button>
                <button onClick={() => vote(-1)}>Dislike</button>
            </div>
        </div>
    );
}

export default CatThumb;