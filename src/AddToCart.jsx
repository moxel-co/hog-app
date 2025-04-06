import React from "react";


function AddToCartButton() {
  const handleButtonClick = () => {
    console.log("Cart button clicked!");
    // Send a message to the parent Wix site

    const productId = "dea56f68-9339-46ab-b48b-c28c25ce6819"
    const productDetails = {
      id: productId,
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
