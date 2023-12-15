import './Home.css';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import useCatAPI from "@/data/useCatAPI";
import { BasicCat } from "@/data/types";
import CatThumb from './CatThumb';

const Home = () => {
    const { page } = useParams<{ page: string }>();
    const pageNumber = page ? parseInt(page, 10) : 0;
    const navigate = useNavigate();
    const { cats, isLoading, isError } = useCatAPI();

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Something went wrong</p>;

    return (
        <div>
            {cats?.length ? (
                <>
                    <div className="pagination">
                        <em>Now with lightning fast pagination!</em>
                        <button onClick={() => navigate(`/${pageNumber - 1}`)} disabled={pageNumber < 1}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </button>
                        <button onClick={() => navigate(`/${pageNumber + 1}`)} disabled={cats.length < 10}>
                            <FontAwesomeIcon icon={faCaretRight} />
                        </button>
                    </div>
                    <div className="cats">
                        {cats.map((cat: BasicCat) => (
                            <CatThumb key={cat.id} catId={cat.id} />
                        ))}
                    </div>
                </>
             ) : (
                pageNumber > 1 ? (
                    <Navigate replace to="/1" />
                ) : <p>There are no cats to show</p>
            )}
        </div>
    )
}

export default Home;