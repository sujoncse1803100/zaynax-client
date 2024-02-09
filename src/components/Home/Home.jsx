import "./style.css";
import Topbar from "./../Topbar/Topbar";
import ProductItem from "../ProductItem/ProductItem";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../features/products/porductsApi";

const Home = () => {
  const { data: products, isSuccess } = useGetAllProductsQuery();
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    isSuccess && setAllProducts(products);
  }, [isSuccess, products]);

  const handleSearch = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(newSearchQuery.toLowerCase())
    );
    setAllProducts(filteredProducts);
  };

  return (
    <div className="all">
      <Topbar searchQuery={searchQuery} handleSearch={handleSearch} />
      <div className="container">
        <div className="product-container ">
          {allProducts.map((item, i) => (
            <ProductItem item={item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
