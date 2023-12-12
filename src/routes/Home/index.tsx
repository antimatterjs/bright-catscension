import './Home.css';
import useCatAPI from "@/data/useCatAPI";
import { BasicCat } from "@/data/types";
import CatThumb from './CatThumb';

const Home = () => {
    const { cats, isLoading } = useCatAPI();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="cats">
            {cats?.length ? cats.map((cat: BasicCat) => (
                <CatThumb key={cat.id} catId={cat.id} />
            )) : <p>There are no cats to show</p>}

            {cats?.length > 10 ? (
                <p><strong>TODO:</strong> Add pagination</p>
            ) : null}
        </div>
    )
}

export default Home;