import { useEffect, useState } from "react";
import Topbar from "../Topbar/Topbar";
import "./style.css";
import Confirmation from "../Confirmation/Confirmation";
import { useRegisterMutation } from "../../features/auth/authApi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../../features/auth/authSlice";

const Signup = () => {
  const [confirmation, setConfirmation] = useState(false);
  const [register, { isSuccess, data: user, isError }] = useRegisterMutation();
  const [data, setData] = useState({
    phone: "",
    password: "",
  });

  const loggedInUser = useSelector((state) => state.user.user);
  useEffect(() => {
    loggedInUser && navigate("/cart");
  }, [loggedInUser]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setConfirmation(true);
      setTimeout(() => {
        setConfirmation(false);
        dispatch(userLoggedIn(user));
        navegate("/cart");
      }, 2000);
    }

    if (isError) {
      console.log(isError);
    }
  }, [isSuccess, isError]);

  const handleInput = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    register(data);
  };

  return (
    <div className="all">
      {confirmation ? (
        isSuccess ? (
          <Confirmation text="You signed up successfully" />
        ) : (
          <Confirmation text="Failed to sign up" />
        )
      ) : (
        <>
          <Topbar />
          <div className="signup-container1">
            <form className="prompt1" onSubmit={handleSignup}>
              <div className="phone1 items1">
                <p>Phone Number</p>
                <input name="phone" onChange={handleInput} type="text" />
              </div>

              <div className="phone1 items1">
                <p>Passwrod</p>
                <input name="password" onChange={handleInput} type="password" />
              </div>

              <button type="submit" className="submit-button1">
                Sign Up
              </button>
              {isError && (
                <div className="error">
                  Phone Number Already Used or Internal Server Error
                </div>
              )}
              <div className="phone1 items1">
                <p>
                  already signup?
                  <Link to="/login">login</Link>
                </p>
              </div>
            </form>
          </div>

          {/* <div className="confirmation-prompt">Sign Up successfully</div> */}
        </>
      )}
    </div>
  );
};

export default Signup;
