import React, { useState } from "react";

const PromoItem = ({ item, handleEdit }) => {
  const [isActive, setIsActive] = useState("Deactive");
  const { code, start, end, discount, usages, _id, id } = item;

  const updatedAtDate = new Date(item.createdAt);
  const createdDate = `${updatedAtDate
    .getDate()
    .toString()
    .padStart(2, "0")}/${(updatedAtDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${updatedAtDate.getFullYear().toString().slice(-2)}`;

  const hours = updatedAtDate.getHours();
  const amPm = hours >= 12 ? "PM" : "AM";
  const createdTime = `${updatedAtDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${updatedAtDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${updatedAtDate
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="particular-promo">
      <div className="promo-top">
        <div className="promo-top-left">
          <div className="id">{id}</div>
          <div className="promo-top-bottom">{code}</div>
        </div>

        <div className="promo-top-right">
          <button
            onClick={() => handleEdit(_id)}
            className="common-btn edit-btn"
          >
            Edit
          </button>
          <button className={`common-btn ${isActive ? "active" : "deactive"}`}>
            Active
          </button>
        </div>
      </div>

      <div className="promo-bottom">
        <div className="promo-bottom-item">
          Created at: {createdTime} {amPm}, {createdDate}
        </div>
        <div className="promo-bottom-item">Usages: {usages}</div>
        <div className="promo-bottom-item">Discount rate: {discount}%</div>
        <div className="promo-bottom-item">Start data: {start}</div>
        <div className="promo-bottom-item">End data: {end}</div>
      </div>
    </div>
  );
};

export default PromoItem;
