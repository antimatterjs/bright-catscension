import './Home.css';
import useCatAPI from "@/data/useCatAPI";
import { Cat } from "@/data/types";
import CatThumb from './CatThumb';

const Home = () => {
    const { cats, isLoading } = useCatAPI();

    console.log(cats);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="cats">
            {cats?.length ? cats.map((cat: Cat) => (
                <CatThumb key={cat.id} catId={cat.id} />
            )) : <p>There are no cats to show</p>}
        </div>
    )
}

export default Home;