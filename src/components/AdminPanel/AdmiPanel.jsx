import AdminTopBar from "./AdminTopBar";
import "./style.css";
import items from "./sidebar_item";
import { useState } from "react";
import Others from "./Content/Others";
import Products from "./Content/Products";
import SidebarItem from "./Content/SidebarItem";
import PromoCode from "./Content/PromoCode";
import AddPromoCode from "./Content/AddPromoCode";
import AddProduct from "./Content/AddProduct";
import EditPromoCode from "./Content/EditPromoCode";

const AdmiPanel = () => {
  const [category, setCategory] = useState("Products");
  const handleClick = (category_name) => {
    setCategory(category_name);
  };
  const [id, setId] = useState(null);

  const handleEdit = (promo_id) => {
    setId(promo_id);
    setCategory("Edit Promo");
  };

  return (
    <div>
      <AdminTopBar />
      <div className="main-unique">
        <div className="sidebar-unique">
          <ul>
            {items.map((item, i) => (
              <SidebarItem setCatetoryType={handleClick} item={item} key={i} />
            ))}
          </ul>
        </div>
        <div className="content-unique">
          {category == "Products" ? (
            <Products setCatetoryType={handleClick} />
          ) : category == "Orders" ? (
            <Others />
          ) : category == "Promo Codes" ? (
            <PromoCode handleEdit={handleEdit} setCatetoryType={handleClick} />
          ) : category == "Add Promo Codes" ? (
            <AddPromoCode setCatetoryType={handleClick} />
          ) : category == "AddProduct" ? (
            <AddProduct setCatetoryType={handleClick} />
          ) : category == "Edit Promo" ? (
            <EditPromoCode setCatetoryType={handleClick} _id={id} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmiPanel;
