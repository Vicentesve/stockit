import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardCategories from "../../components/Store/CardCategories";
import CardFeed from "../../components/Store/CardFeed";
import CardWarehouses from "../../components/Store/CardWarehouses";
import Carousel from "../../components/Store/Carousel";
import LoadingCard from "../../components/Store/LoadingCard";
import { changeCategory } from "../../redux/storeSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const { warehouses, isLoading } = useSelector((state) => state.store);

  return (
    <main className="mx-auto max-w-screen-2xl ">
      <Carousel />
      <div className="grid grid-flow-row-dense grid-cols-1 gap-3 p-5 mx-auto -mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 place-items-center ">
        {isLoading ? (
          <>
            {[...Array(10)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </>
        ) : (
          <>
            <CardCategories
              titleCard="Shop by Category"
              categories={categories}
            />

            <CardWarehouses
              titleCard="Shop by Warehouse"
              warehouse={warehouses}
            />

            {categories?.map((categorie, i) => (
              <Link
                className="z-30"
                to={`category/${categorie?._id}`}
                key={i}
                onClick={() => dispatch(changeCategory(categorie?._id))}
              >
                <CardFeed
                  titleCard={categorie.name}
                  imageCard={categorie.image}
                />
              </Link>
            ))}
          </>
        )}
      </div>
      <img className="mt-5" src="https://links.papareact.com/dyz" alt="" />
    </main>
  );
};

export default Home;
