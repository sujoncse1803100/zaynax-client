import "./css/addproduct.css";
import demoImage from "../../../assets/tshirt.webp";
import { useEffect, useState } from "react";

const ProductItem = ({ product: item }) => {
  const [imageSrc, setImageSrc] = useState(null);

  return (
    <div className="items">
      <img
        src={imageSrc ? imageSrc : demoImage}
        alt=""
        className="products-img"
      />
      <div className="descs">
        <div className="names">{item?.name}</div>
        <div className="price-containers">
          <div className="prices">{item?.price}</div>
          <div className="discounts">{item?.discount}%</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
