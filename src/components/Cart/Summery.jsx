import { useSelector } from "react-redux";
import "./summery.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllPromocodesQuery } from "../../features/promcode/promocodeApi";

const Summery = ({ setDiscountRate, orders }) => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoCodes, setPromoCodes] = useState([]);
  const [promoEroor, setPromoEroor] = useState(null);
  const { data, isSuccess } = useGetAllPromocodesQuery();
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setPromoCodes(data);
  }, [isSuccess]);

  const calculateDiscount = (rate) => {
    const percent = rate / 100;
    const total_price = orders.products.reduce(
      (total, product) => (total = total + product.quantity * product.price),
      0
    );
    setDiscount(total_price * percent);
  };

  const applyPromoCode = () => {
    if (user) {
      const matched = promoCodes?.find(
        (promo) => promo.code == promoCode.toUpperCase()
      );

      if (matched) {
        if (matched.usages > 0) {
          setDiscountRate(matched.discount);
          calculateDiscount(matched.discount);
          setPromoEroor(null);
        } else {
          setPromoEroor("This promocode is expired.!");
        }
      } else {
        setPromoEroor("This promocode is not valid.!");
      }
    } else {
      navigate("/signup");
    }
  };

  const quantity = orders.products.reduce(
    (sum, product) => (sum = sum + product.quantity),
    0
  );

  const price = orders.products.reduce(
    (total, product) => (total = total + product.quantity * product.price),
    0
  );

  const shipping_charge = orders.products.length * 100;

  const totalPayable = price + shipping_charge - discount;

  return (
    <div className="pricing1">
      <div className="heading1">ORDER SUMMERY</div>

      <div className="calculations1">
        <div className="particualt-calculation1">
          <div className="type1">Subtotal ({quantity} items)</div>
          <div className="price1">
            <span>&#2547;</span> {price}
          </div>
        </div>
        <div className="particualt-calculation1">
          <div className="type1">Discount</div>
          <div className="price1">
            <span>&#2547;</span> {discount}
          </div>
        </div>
        <div className="particualt-calculation1">
          <div className="type1">Shipping Charge</div>
          <div className="price1">
            <span>&#2547;</span> {shipping_charge}
          </div>
        </div>
        <div className="particualt-calculation1">
          <div className="type1">Wallet debit</div>
          <div className="price1">
            <span>&#2547;</span> 0
          </div>
        </div>
        <div className="dotted-line"></div>
        {promoEroor && <p className="promo-error">{promoEroor}</p>}
        <div className="promo-container1">
          <input
            placeholder="type1 your code"
            type1="text"
            className="pomo-code-input1"
            onChange={(e) => setPromoCode(e.target.value)}
          />

          <button onClick={applyPromoCode} className="apply-button1">
            Apply
          </button>
        </div>

        <div className="dotted-line1"></div>

        <div className="particualt-calculation1">
          <div className="type1">Total Payable</div>
          <div className="price1">
            <span>&#2547;</span> {totalPayable}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summery;
