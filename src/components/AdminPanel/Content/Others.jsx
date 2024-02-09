import React, { useEffect, useState } from "react";
import "./css/others.css";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "../../../features/order/orderApi";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../../features/order/orderSlice";

const Others = () => {
  const [action, setAction] = useState("alls");
  const { data: orders, isSuccess } = useGetAllOrdersQuery();
  const [updateOrder, { isSuccess: updateSuccess, data: updatedOrder }] =
    useUpdateOrderMutation();
  const stateOrders = useSelector((state) => state.orders.orders);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    isSuccess && filterAndSet(orders);
  }, [isSuccess]);

  useEffect(() => {
    filterAndSet(stateOrders);
  }, [stateOrders]);

  useEffect(() => {
    filterAndSet(stateOrders);
  }, [action, updateSuccess]);

  const filterAndSet = (params) => {
    if (action != "alls") {
      const filtedOrders = params?.filter((order) => order.status == action);
      setAllOrders(filtedOrders);
    } else {
      setAllOrders(params);
    }
  };

  const handleStatus = (params) => {
    const updatedOrder = { ...params.order };
    updatedOrder.status = params.type;
    updateOrder(updatedOrder);
  };

  return (
    <div className="others-container">
      <div className="others-top">
        <div
          onClick={() => setAction("alls")}
          className={`type ${action == "alls" ? action : ""}`}
        >
          All
        </div>
        <div
          onClick={() => setAction("pending")}
          className={`type ${action == "pending" ? action : ""}`}
        >
          Pending
        </div>
        <div
          onClick={() => setAction("confirmed")}
          className={`type ${action == "confirmed" ? action : ""}`}
        >
          Confirmed
        </div>
        <div
          onClick={() => setAction("canceled")}
          className={`type ${action == "canceled" ? action : ""}`}
        >
          Cancel
        </div>
      </div>

      <div className="others-bottom">
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={centerAlign}>SL</th>
              <th style={centerAlign}>Order No.</th>
              <th style={centerAlign}>Order Price</th>
              <th style={centerAlign}>Action</th>
              <th style={centerAlign}>Status</th>
            </tr>
          </thead>
          <tbody>
            {allOrders?.map((order, index) => (
              <React.Fragment key={index}>
                <tr style={rowStyle}>
                  <td style={{ ...centerAlign, ...cellStyle }}>{index + 1}</td>
                  <td style={{ ...centerAlign, ...cellStyle }}>
                    {order._id ? order._id : 1111}
                  </td>
                  <td style={{ ...centerAlign, ...cellStyle }}>
                    {order?.amount}
                  </td>
                  <td style={{ ...centerAlign, ...cellStyle }}>
                    {order.status == "pending" && (
                      <>
                        <button
                          style={acceptButtonStyle}
                          onClick={() =>
                            handleStatus({ order: order, type: "confirmed" })
                          }
                          className="common-btn "
                        >
                          Confirm
                        </button>
                        <button
                          style={cancelButtonStyle}
                          onClick={() =>
                            handleStatus({ order: order, type: "canceled" })
                          }
                          className="common-btn "
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                  <td style={{ ...centerAlign, ...cellStyle }}>
                    {order.status}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 10px",
};

const centerAlign = {
  textAlign: "center",
};

const cellStyle = {
  padding: "15px",
  backgroundColor: "#ffff",
};

const rowStyle = {
  marginBottom: "5px",
  borderRadius: "15px",
};

const spacerStyle = {
  height: "1px",
  backgroundColor: "transparent",
};

const cancelButtonStyle = {
  width: "130px",
  margin: "0 5px",
  padding: "15px 10px",
  backgroundColor: "red",
  color: "white",
};

const acceptButtonStyle = {
  width: "130px",
  margin: "0 5px",
  padding: "15px 10px",
  backgroundColor: "green",
  color: "white",
};

export default Others;
