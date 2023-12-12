import useCatAPI from "@/data/useCatAPI";

const Home = () => {
    const { cats } = useCatAPI();

    console.log(cats);

    return (
        <div role="listbox">
            {cats.length ? cats.map(() => (
                <p>cat</p>
            )) : <p>There are no cats to show</p>}
        </div>
    )
}

export default Home;