import React from 'react';
import useVariant from '../stores/useVariant';
import { ShoppingCart } from 'lucide-react';
import { guitarVariants } from '../data/guitar'; // Import guitar variants data

const AddToCartButton = () => {
    const body = useVariant((state) => state.body);
    const inlay = useVariant((state) => state.inlay);
    const headstock = useVariant((state) => state.headstock);
    const headstock2 = useVariant((state) => state.headstock2);
    const isDualNeck = useVariant((state) => state.isDualNeck); // Use isDualNeck directly

    const standardBodyId = "dea56f68-9339-46ab-b48b-c28c25ce6819";
    const dualNeckBodyId = "b17cbbe6-07eb-c879-4e9c-ad0f3481affe";

    // Determine productId based on isDualNeck
    const productId = isDualNeck ? dualNeckBodyId : standardBodyId;

    // Find the name of the variants
    const body_name = guitarVariants.find((variant) => variant.id === body)?.name || "Undefined Body";
    const headstock_name = guitarVariants.find((variant) => variant.id === headstock)?.name || "Undefined Head Stock";
    const headstock2_name = guitarVariants.find((variant) => variant.id === headstock2)?.name || "Undefined Head Stock";
    const inlay_name = guitarVariants.find((variant) => variant.id === inlay)?.name || "Undefined Inlay";

    const handleAddToCart = () => {
        console.log("Adding to Cart");

        const productDetails = {
            id: productId, // Use the determined productId
            name: isDualNeck ? "Custom Double Neck Guitar" : "Custom Standard Guitar",
            body: body_name,
            inlay: inlay_name,
            headstock: headstock_name,
            ...(isDualNeck && { headstock2: headstock2_name }), // Include headstock2 if isDualNeck is true
        };

        window.parent.postMessage(
            productDetails,
            "https://hing62.wixsite.com/hello-guitars"
        );

        console.log(productDetails);
    };

    return (
        <button
            onClick={handleAddToCart}
            className="menu-button cart-button"
        >
            <div className="menu-button-icon">
                <ShoppingCart size={56} />
            </div>
            <div className="menu-button-hover">
                <div className="menu-button-background" />
                <span className="menu-button-label">Add to Cart</span>
            </div>
        </button>
    );
};

export default AddToCartButton;