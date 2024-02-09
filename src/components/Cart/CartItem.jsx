import "./cartitem.css";
import img from "../../assets/tshirt.webp";
import deleteIcon from "../../assets/delete_icon.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "../../features/cart/cartSlice";

const CartItem = ({ item, setQuantity, setDiscount }) => {
  const [itemCount, setItemCount] = useState(1);
  const dispatch = useDispatch();

  const handleItemCount = (type) => {
    setQuantity({
      action: type,
      id: item._id,
    });

    if (type == "increase") {
      setItemCount(itemCount + 1);
    } else {
      itemCount > 1 && setItemCount(itemCount - 1);
    }
  };

  const { name, color, size, price } = item;

  const removeFormCart = () => {
    dispatch(removeItem(item));
  };

  return (
    <div className="one-item">
      <div className="img-container">
        <img className="product-image" src={img} alt="" />
      </div>

      <div className="description">
        <div className="top">
          <div className="name">{name}</div>
          <div className="delete-icon">
            <img src={deleteIcon} onClick={removeFormCart} alt="" />
          </div>
        </div>

        <div className="bottom">
          <div className="bottom-desc">
            <div className="bottom-desc-first">
              <div className="color">Color: {color[0]}</div>
              <div className="size">Size: {size[0]}</div>
            </div>
            <div className="bottom-desc-second">
              Product Price : BDT {price}
            </div>
          </div>

          <div className="bottom-desc">
            <div className="bottom-desc-first">Shipping Method : EMS</div>
            <div className="bottom-desc-second">Shipping Charge : BDT 100 </div>
          </div>
          <div className="bottom-desc">
            <div className="bottom-desc-first">
              <span>Quantity : </span>
              <div className="quantity-handler">
                <div
                  className="plus"
                  onClick={(e) => handleItemCount("increase")}
                >
                  +
                </div>
                <div className="quantity">{itemCount}</div>
                <div
                  className="minus"
                  onClick={() => handleItemCount("decrease")}
                >
                  -
                </div>
              </div>
            </div>
            <div className="bottom-desc-second">Total Price : BDT 2,000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
