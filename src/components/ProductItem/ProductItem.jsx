import "./style.css";
import demoImage from "../../assets/tshirt.webp";
import { useDispatch } from "react-redux";
import { addItem } from "../../features/cart/cartSlice";

const ProductItem = ({ item }) => {
  const { name, discount, price } = item;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem(item));
  };

  return (
    <div className="item">
      <div className="first">
        <img src={demoImage} alt="" className="product-img" />
        <div className="desc">
          <div className="name">{name}</div>
          <div className="price-container">
            <div className="price">{price}</div>
            <div className="discount">{discount}%</div>
          </div>
        </div>
      </div>
      <div className="second">
        <button onClick={addToCart} className="cart-button">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
