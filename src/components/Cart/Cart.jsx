import "./style.css";
import Topbar from "./../Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import Summery from "./Summery";
import { useEffect, useState } from "react";
import Confirmation from "../Confirmation/Confirmation";
import { useSelector } from "react-redux";
import { useAddOrderMutation } from "../../features/order/orderApi";
import { setCart } from "../../features/cart/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.carts.cartItems);
  const [confirmation, setConfirmation] = useState(false);
  const [accept, setAccept] = useState(false);
  const [placed, setPlaced] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [addOrder, { isSuccess }] = useAddOrderMutation();
  const [itemCount, setItemCount] = useState(1);
  const [discountRate, setDiscountRate] = useState(0);
  const [orders, setOrders] = useState({
    userId: user?._id,
    products: cartItems.map((item) => {
      return {
        productId: item._id,
        quantity: 1,
        price: item.price,
      };
    }),
    amount: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setOrders({
      userId: user?._id,
      products: cartItems.map((item) => {
        return {
          productId: item._id,
          quantity: 1,
          price: item.price,
        };
      }),
      amount: 0,
    });
  }, [cartItems.length]);

  useEffect(() => {
    if (isSuccess) {
      setCart([]);
      setConfirmation(true);
    }
  }, [isSuccess]);

  const handleProductQuantity = (params) => {
    const updateProducts = orders.products.map((product) => {
      if (product.productId == params.id) {
        const updatedProduct = { ...product };

        if (params.action == "increase") {
          updatedProduct.quantity = updatedProduct.quantity + 1;
          setItemCount(itemCount + 1);
        }

        if (params.action == "decrease") {
          if (updatedProduct.quantity > 1) {
            updatedProduct.quantity = updatedProduct.quantity - 1;
            setItemCount(itemCount - 1);
          }
        }

        return updatedProduct;
      } else {
        return product;
      }
    });

    const updatedOrders = { ...orders };
    updatedOrders.products = updateProducts;
    setOrders(updatedOrders);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      const userId = orders.userId;
      const products = orders.products.map((product) => {
        return {
          productId: product.productId,
          quantity: product.quantity,
        };
      });
      let price = orders.products.reduce((sum, product) => {
        const currentPrice = product.quantity * product.price;
        return sum + currentPrice;
      }, 0);

      const shipping_charge = orders.products.length * 100;

      const finalOrder = {
        userId,
        products,
        amount: price + shipping_charge - (discountRate / 100) * price,
      };

      setPlaced(true);
      if (accept) {
        addOrder(finalOrder);
        setCart({});
        setAccept(false);
      } else {
        console.log("something worng");
      }
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="all">
      {confirmation ? (
        <Confirmation
          text="Your order placed successfully"
          isButton="Go to Admin Panel"
        />
      ) : (
        <>
          <Topbar />
          <div className="cart-container">
            <Link className="container" to="/">
              <button className="go-back-btn">GO BACK</button>
            </Link>

            <div className="container main-conatainer">
              {cartItems.length > 0 ? (
                <>
                  <div className="cart-items">
                    {cartItems?.map((item, i) => (
                      <CartItem
                        setQuantity={handleProductQuantity}
                        item={item}
                        key={i}
                      />
                    ))}

                    <form className="checkout">
                      <div className="terms-condition">
                        <div
                          className={`warning ${
                            !accept && placed
                              ? "warning-visible"
                              : "warning-hide"
                          }`}
                        >
                          you must agree the terms and conditions
                        </div>
                        <div className="condition">
                          <input
                            className={`${
                              accept && placed ? "inherit" : "red"
                            }`}
                            type="radio"
                            onClick={() => setAccept(!accept)}
                            required
                          />
                          I Agree to the Term and Conditions, Privace Policy &
                          Refund Policy
                        </div>
                      </div>
                      <button
                        // type="submit"
                        className="checkout-btn"
                        onClick={handleSubmit}
                      >
                        CHECKOUT
                      </button>
                    </form>
                  </div>

                  <Summery setDiscountRate={setDiscountRate} orders={orders} />
                </>
              ) : (
                <div className="cart-item-not-found">
                  Your Cart Is Empty.!!!
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
