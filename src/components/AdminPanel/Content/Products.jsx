import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../../features/products/porductsApi";
import ProductItem from "./ProductItem";
import "./css/addproduct.css";

const Products = ({ setCatetoryType }) => {
  const { data: products, isSuccess } = useGetAllProductsQuery();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    isSuccess && setAllProducts(products);
  }, [isSuccess, products]);

  return (
    <div className="product-container">
      <button
        onClick={() => setCatetoryType("AddProduct")}
        className="common-btn add-product-btn"
      >
        Add Product
      </button>
      <div className="product-container">
        {allProducts?.map((item, i) => (
          <ProductItem product={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Products;
