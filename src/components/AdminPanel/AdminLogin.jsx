import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import { userLoggedIn } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminLogin = () => {
  const loggedInUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [login, { isSuccess, data: user }] = useLoginMutation();
  const [data, setData] = useState({
    phone: "",
    password: "",
  });

  const [isAdmin, setIsAdmin] = useState(loggedInUser?.isAdmin);

  useEffect(() => {
    loggedInUser && isAdmin && navigate("/adminpanel");
  }, [loggedInUser]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(userLoggedIn(user));
      if (user.isAdmin) {
        navigate("/adminpanel");
      } else {
        setIsAdmin(false);
      }
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const upldatedData = { ...data };
    upldatedData[e.target.name] = e.target.value;
    setData(upldatedData);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (data.phone && data.password) {
      login({ ...data });
    }
  };

  return (
    <div className="all">
      <div className="signup-container3">
        <h1>Admin Panel</h1>
        <form className="prompt3">
          <div className="phone3 items3">
            <p>Phone Number</p>
            <input onChange={handleChange} name="phone" type="text" />
          </div>

          <div className="phone3 items3">
            <p>Passwrod</p>
            <input onChange={handleChange} name="password" type="password" />
          </div>

          <button onClick={handleAdminLogin} className="submit-button3">
            Sign In
          </button>

          {loggedInUser && !isAdmin && (
            <div className="not-admin">You are not admin</div>
          )}
        </form>

        <div className="hints3">
          <p>Use following credential to login</p>
          <p>
            <strong>Phone : </strong> 01782562576
          </p>
          <p>
            <strong>Password : </strong> 5555
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
