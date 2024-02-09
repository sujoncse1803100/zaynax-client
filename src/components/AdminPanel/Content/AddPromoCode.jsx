import React, { useEffect, useState } from "react";
import "./css/addpromo.css";
import Confirmation from "../../Confirmation/Confirmation";
import {
  useAddPromocodeMutation,
  useGetAllPromocodesQuery,
} from "../../../features/promcode/promocodeApi";

const AddPromoCode = ({ setCatetoryType }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [active, setActive] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [usagesAllowed, setUsagesAllowed] = useState("");
  const [addPromocode, { isSuccess, isError }] = useAddPromocodeMutation();
  const { data, isSuccess: fetchPromoCodeSuccess } = useGetAllPromocodesQuery();

  useEffect(() => {
    if (isSuccess) {
      setConfirmation(true);
      setTimeout(() => {
        setConfirmation(false);
        setCatetoryType("Promo Codes");
      }, 2000);
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log(isError);
  }, [isError]);

  const convertDateFormat = (date) => {
    const convertedDate = new Date(date);

    const day = convertedDate.getDate().toString().padStart(2, "0");
    const month = (convertedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = convertedDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPormoCode = {
      id: data.length + 1,
      status: active,
      code: promoCode.toUpperCase(),
      start: convertDateFormat(startDate),
      end: convertDateFormat(endDate),
      discount: discountRate,
      usages: usagesAllowed,
    };
    console.log(newPormoCode);

    addPromocode(newPormoCode);
  };

  return (
    <div className="add-promo-container">
      {confirmation ? (
        <Confirmation text="Your promo code addedd successfully" />
      ) : (
        <form onSubmit={handleSubmit} className="add-promo-prompt">
          <div className="add-promo-item">
            <label>Promo Code:</label>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              required
            />
          </div>

          <div className="add-promo-item">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="add-promo-item">
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="add-promo-item">
            <label>Discount Rate (%):</label>
            <input
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              required
            />
          </div>

          <div className="add-promo-item">
            <label>Usages Allowed:</label>
            <input
              type="number"
              value={usagesAllowed}
              onChange={(e) => setUsagesAllowed(e.target.value)}
              required
            />
          </div>

          <div className="add-promo-item">
            <div className="active-inactive">
              <div>Active</div>
              <div className="active-inactive-right">
                <div
                  onClick={() => setActive(true)}
                  className={`yes ${active ? "yes-active" : ""}`}
                >
                  yes
                </div>
                <div
                  onClick={() => setActive(false)}
                  className={`no ${!active ? "no-active" : ""}`}
                >
                  no
                </div>
              </div>
            </div>
          </div>

          <button className="common-btn" type="submit">
            Add Promo Code
          </button>
        </form>
      )}
    </div>
  );
};

export default AddPromoCode;
