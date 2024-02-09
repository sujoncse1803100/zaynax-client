import React, { useEffect, useState } from "react";
import "./css/addpromo.css";
import Confirmation from "../../Confirmation/Confirmation";
import {
  useGetAllPromocodesQuery,
  useUpdatePromocodeMutation,
} from "../../../features/promcode/promocodeApi";

const EditPromoCode = ({ _id, setCatetoryType }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [active, setActive] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [usagesAllowed, setUsagesAllowed] = useState("");
  const { data, isSuccess } = useGetAllPromocodesQuery();
  const [item, setItem] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [updatePromocode, { isSuccess: updateSucess }] =
    useUpdatePromocodeMutation();

  useEffect(() => {
    if (isSuccess) {
      const desiredItem = data.find((d) => d._id == _id);
      setItem(desiredItem);
      setUsagesAllowed(desiredItem.usages);
      setDiscountRate(desiredItem.discount);

      const dateString = desiredItem.start;
      const year = parseInt(`20${dateString.slice(0, 2)}`, 10);
      const month = parseInt(dateString.slice(3, 5), 10) - 1;
      const day = parseInt(dateString.slice(6), 10);
      const defaultDate = new Date(year, month, day);
      setSelectedDate(defaultDate);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (updateSucess) {
      setConfirmation(true);
      setTimeout(() => {
        setConfirmation(false);
        setCatetoryType("Promo Codes");
      }, 2000);
    }
  }, [updateSucess]);

  const convertDateFormat = (date) => {
    const convertedDate = new Date(date);

    const day = convertedDate.getDate().toString().padStart(2, "0");
    const month = (convertedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = convertedDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedPromo = { ...item };
    updatedPromo.end = convertDateFormat(endDate);
    updatedPromo.discount = discountRate;
    updatedPromo.usages = usagesAllowed;
    updatedPromo.status = active;

    updatePromocode(updatedPromo);
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
              value={item?.code}
              onChange={(e) => setPromoCode(e.target.value)}
              required
              disabled
            />
          </div>

          <div className="add-promo-item">
            <label>Start Date:</label>
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setStartDate(e.target.value)}
              required
              disabled
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
              onChange={(e) => setDiscountRate(e.target.value)}
              required
            />
          </div>

          <div className="add-promo-item">
            <label>Usages Allowed:</label>
            <input
              type="number"
              onChange={(e) => setUsagesAllowed(e.target.value)}
              required
            />
          </div>

          <div className="add-promo-item">
            <div className="active-inactive">
              <div>Active</div>
              <div className="active-inactive-right">
                <div
                  onClick={() => setActive("Active")}
                  className={`yes ${active == "Active" ? "yes-active" : ""}`}
                >
                  yes
                </div>
                <div
                  onClick={() => setActive("Deactive")}
                  className={`no ${active == "Deactive" ? "no-active" : ""}`}
                >
                  no
                </div>
              </div>
            </div>
          </div>

          <button className="common-btn" type="submit">
            Edit Promo Code
          </button>
        </form>
      )}
    </div>
  );
};

export default EditPromoCode;
