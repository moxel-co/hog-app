import React from "react";

function AddToCartButton() {
  const handleButtonClick = () => {
    console.log("Cart button clicked!");
    // Send a message to the parent Wix site
    const productDetails = {
      id: "product-id-123",
      name: "Sample Product",
      price: 49.99,
    };
    window.parent.postMessage(
      productDetails,
      "https://hing62.wixsite.com/hello-guitars"
    );
  };

  return <button onClick={handleButtonClick}>Add to Cart</button>;
}

export default AddToCartButton;
