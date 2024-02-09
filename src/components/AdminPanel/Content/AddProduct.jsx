import React, { useEffect, useState } from "react";
import "./css/addpromo.css";
import { useDropzone } from "react-dropzone";
import Confirmation from "../../Confirmation/Confirmation";
import { useAddProductMutation } from "../../../features/products/porductsApi";

const AddProduct = ({ setCatetoryType }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    image: "",
    active: active,
    price: "",
    discount: "",
    shippingCharge: "",
    color: "",
    size: "",
  });

  const [addProduct, { isSuccess }] = useAddProductMutation();

  useEffect(() => {
    if (isSuccess) {
      setConfirmation(true);

      setTimeout(() => {
        setConfirmation(false);
        setCatetoryType("Products");
      }, 2000);
    }
  }, [isSuccess]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = () => {
      resizeImage(reader.result, 500, 500, (resizedDataURL) => {
        setSelectedImage({
          original: file,
          resizedDataURL,
        });
      });
    };

    reader.readAsDataURL(file);
  };

  const resizeImage = (dataURL, width, height, callback) => {
    const img = new Image();
    img.src = dataURL;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const resizedDataURL = canvas.toDataURL("image/jpeg");
      callback(resizedDataURL);
    };
  };

  const handleInputChange = (e) => {
    const updatedData = { ...formData };
    updatedData[e.target.name] = e.target.value;
    setFormData(updatedData);
  };

  const handleUpload = async () => {
    if (selectedImage) {
      formData.active = active;
      formData.image = selectedImage;
      console.log(formData);

      addProduct(formData);
    } else {
      console.log("product select hoini");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="add-product-container">
      {confirmation ? (
        <Confirmation text="Your product added successfully" />
      ) : (
        <div className="add-product-prompt">
          <div className="dropzoneStyle" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>

          <div className="utils">
            <label>
              Product Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Price:
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Discount:
              <input
                type="text"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Shipping Charge:
              <input
                type="text"
                name="shippingCharge"
                value={formData.shippingCharge}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Color:
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Size:
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
              />
            </label>

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

            <button className="common-btn upload-btn" onClick={handleUpload}>
              Add Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
