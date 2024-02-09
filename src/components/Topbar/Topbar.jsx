import "./style.css";
import cartIcon from "../../assets/shopping-cart.svg";
import userIcon from "../../assets/user_icon.svg";
import searchIcon from "../../assets/search_icon.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Topbar = ({ handleSearch }) => {
  const cartItems = useSelector((state) => state.carts.cartItems);
  return (
    <div className="topbar-container container">
      <Link to="/" className="logo">
        <h1>Querist</h1>
      </Link>
      <div className="others">
        <div className="left">
          <img src={searchIcon} alt="" className="search-icon" />
          <input
            type="text"
            onChange={(e) => handleSearch(e)}
            placeholder="Search"
          />
        </div>
        <div className="right">
          <Link to="/cart" className="cart-logo">
            <img className="icon" src={cartIcon} alt="" />
            <div className="amount">
              Cart
              <div className="count">{cartItems?.length}</div>
            </div>
          </Link>
          <Link to="/signup" className="user">
            <img className="icon" src={userIcon} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
