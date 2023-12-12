import useCat from "@/data/useCat";


type CatThumbProps = {
    catId: string;
};

const CatThumb = ({ catId }: CatThumbProps) => {
    const { cat, vote, toggleFavourite, updatingFavourites } = useCat(catId);

    return (
        <div className="cat-thumb">
            <button type="button"
              className="favourite-btn"
              onClick={() => toggleFavourite()}
              disabled={updatingFavourites}>
                {cat.isFavourite ? 'Unfavourite' : 'Favourite'}
            </button>
            <div className="cat-img">
                <img src={cat.url} width={cat.width} height={cat.height} />
            </div>
            <div role="group" className="cat-voting">
                <button onClick={() => vote(1)}>Like</button>
                <span>{cat.score}</span>
                <button onClick={() => vote(-1)}>Dislike</button>
            </div>
        </div>
    );
}

export default CatThumb;