import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import useCat from "@/data/useCat";


type CatThumbProps = {
    catId: string;
};

const CatThumb = ({ catId }: CatThumbProps) => {
    const { cat, vote, isVoting, toggleFavourite, updatingFavourites } = useCat(catId);

    return (
        <div className="cat-thumb">
            <button type="button"
              className="favourite-btn"
              onClick={() => toggleFavourite()}
              disabled={updatingFavourites}>
                <FontAwesomeIcon icon={cat.isFavourite ? faHeart : faHeartOutline} />
            </button>
            <div className="cat-img">
                <img src={cat.url} />
            </div>
            <div role="group" className="cat-voting">
                <button onClick={() => vote(-1)}
                 disabled={isVoting}>
                    <FontAwesomeIcon icon={faCaretDown} />
                </button>
                <span>{cat.score}</span>
                <button onClick={() => vote(1)}
                  disabled={isVoting}>
                    <FontAwesomeIcon icon={faCaretUp} />
                </button>
            </div>
        </div>
    );
}

export default CatThumb;