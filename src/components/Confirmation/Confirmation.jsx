import "./style.css";
import confirmIcon from "../../assets/confirm_icon1.svg";
import { useNavigate } from "react-router-dom";

const Confirmation = ({ text, isButton }) => {
  const navigate = useNavigate();
  const handleGoToAdminPanel = () => {
    navigate("/adminlogin");
  };
  return (
    <div className="confirmation1">
      <div className="prompt1">
        <div className="icon1">
          <img src={confirmIcon} alt="" />
        </div>
        <p>{text}</p>

        {isButton && (
          <button className="btn1" onClick={handleGoToAdminPanel}>
            {isButton}
          </button>
        )}
      </div>
    </div>
  );
};

export default Confirmation;
