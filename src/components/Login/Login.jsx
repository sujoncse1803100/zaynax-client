import { useEffect, useState } from "react";
import Topbar from "../Topbar/Topbar";
import "./style.css";
import { useLoginMutation } from "../../features/auth/authApi";
import Confirmation from "../Confirmation/Confirmation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../../features/auth/authSlice";

const Login = () => {
  const [confirmation, setConfirmation] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isSuccess, data: user }] = useLoginMutation();
  const [data, setData] = useState({
    phone: "",
    password: "",
  });

  const loggedInUser = useSelector((state) => state.user.user);
  useEffect(() => {
    loggedInUser && navigate("/adminpanel");
  }, [loggedInUser]);

  useEffect(() => {
    if (isSuccess) {
      setConfirmation(true);
      setTimeout(() => {
        setConfirmation(false);
        dispatch(userLoggedIn(user));
        navigate("/cart");
      }, 2000);
    }
  }, [isSuccess]);

  const handleInput = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleSignin = (e) => {
    e.preventDefault();

    login(data);
  };

  return (
    <div className="all">
      {confirmation ? (
        isSuccess ? (
          <Confirmation text="You are successfully log in" />
        ) : (
          <Confirmation text="Failed to login" />
        )
      ) : (
        <>
          <Topbar />
          <div className="signup-container1">
            <form className="prompt1" onSubmit={handleSignin}>
              <div className="phone1 items1">
                <p>Phone Number</p>
                <input onChange={handleInput} name="phone" type="text1" />
              </div>

              <div className="phone1 items1">
                <p>Passwrod</p>
                <input onChange={handleInput} name="password" type="password" />
              </div>

              <button type="submit" className="submit-button1">
                Sign In
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
