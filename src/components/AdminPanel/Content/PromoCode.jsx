import { useEffect, useState } from "react";
import { useGetAllPromocodesQuery } from "../../../features/promcode/promocodeApi";
import PromoItem from "./PromoItem";
import "./css/promo.css";

const PromoCode = ({ setCatetoryType, handleEdit }) => {
  const { data, isSuccess } = useGetAllPromocodesQuery();
  const [allPormoCodes, setAllPromoCodes] = useState([]);

  useEffect(() => {
    setAllPromoCodes(data);
  }, [isSuccess]);

  return (
    <div className="pormo-container">
      <button
        onClick={() => setCatetoryType("Add Promo Codes")}
        className="add-promo-btn common-btn"
      >
        Add Promo Code
      </button>
      <div className="promo-codes">
        {allPormoCodes?.map((item, i) => (
          <PromoItem handleEdit={handleEdit} item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default PromoCode;
