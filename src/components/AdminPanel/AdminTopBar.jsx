import "./style.css";
import { Link } from "react-router-dom";

const AdminTopBar = () => {
  return (
    <div className="admin-topbar-container container">
      <Link to="/" className="admin-logo">
        <h1>Querist</h1>
      </Link>
      <div className="admin-others">
        <p>usename</p>
      </div>
    </div>
  );
};

export default AdminTopBar;
