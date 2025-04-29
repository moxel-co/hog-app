import React, { useEffect, useState } from 'react';
import { X, Copy, ExternalLink, Check } from 'lucide-react';
import useVariant from '../stores/useVariant'; // Import useVariant
import { guitarVariants } from '../data/guitar'; // Import guitar variants

const OrderLightBox: React.FC = () => {
  const isOrderLightBoxOpen = useVariant((state) => state.isOrderLightBoxOpen); // Get global state
  const setIsOrderLightBoxOpen = useVariant((state) => state.setIsOrderLightBoxOpen); // Setter for global state
  const [copied, setCopied] = useState(false);
  const [animationClass, setAnimationClass] = useState('opacity-0 scale-95');

  const body = useVariant((state) => state.body);
  const inlay = useVariant((state) => state.inlay);
  const inlay2 = useVariant((state) => state.inlay2);
  const headstock = useVariant((state) => state.headstock);
  const headstock2 = useVariant((state) => state.headstock2);
  const starPowerButton = useVariant((state) => state.starPowerButton);
  const bodyColor = useVariant((state) => state.bodyColor);
  const neckColor = useVariant((state) => state.neckColor);
  const fretBoardColor = useVariant((state) => state.fretBoardColor);
  const fretBoardBindingColor = useVariant((state) => state.fretBoardBindingColor);
  const pickGuardColor = useVariant((state) => state.pickGuardColor);
  const hardwareColor = useVariant((state) => state.hardwareColor);
  const inlayColor = useVariant((state) => state.inlayColor);
  const neckButtonColor = useVariant((state) => state.neckButtonColor);
  const arcadeButtonColor = useVariant((state) => state.arcadeButtonColor);
  const strummerSideColor = useVariant((state) => state.strummerSideColor);
  const isDualNeck = useVariant((state) => state.isDualNeck);
  const isLeftHandOrientation = useVariant((state) => state.isLeftHandOrientation);

  const body_name = guitarVariants.find((variant) => variant.id === body)?.name || "Undefined Body";
  const headstock_name = guitarVariants.find((variant) => variant.id === headstock)?.name || "Undefined Head Stock";
  const headstock2_name = guitarVariants.find((variant) => variant.id === headstock2)?.name || "Undefined Head Stock";
  const inlay_name = guitarVariants.find((variant) => variant.id === inlay)?.name || "Undefined Inlay";
  const inlay2_name = guitarVariants.find((variant) => variant.id === inlay2)?.name || "Undefined Inlay";

  const order_text = [
    `Body: ${body_name}`,
    `Headstock: ${headstock_name}`,
    isDualNeck ? `Headstock2: ${headstock2_name}` : null,
    `Inlay: ${inlay_name}`,
    isDualNeck ? `Inlay2: ${inlay2_name}` : null,
    `Star Power Button: ${starPowerButton ? "Enabled" : "Disabled"}`,
    `Hand Orientation: ${isLeftHandOrientation ? "Left" : "Right"}`,
    `Body Color: ${bodyColor}`,
    `Neck Color: ${neckColor}`,
    `Fretboard Color: ${fretBoardColor}`,
    `Fretboard Binding Color: ${fretBoardBindingColor}`,
    `Pick Guard Color: ${pickGuardColor}`,
    `Hardware Color: ${hardwareColor}`,
    `Inlay Color: ${inlayColor}`,
    `Neck Button Color: ${neckButtonColor}`,
    `Arcade Button Color: ${arcadeButtonColor}`,
    `Strummer Side Color: ${strummerSideColor}`,
  ]
    .filter(Boolean) // Remove null or undefined lines
    .join("\n"); // Join lines with a newline character

  const orderPageUrl = "https://www.hammeronguitars.com/shop"; // Default value for orderPageUrl

  const closeLightbox = () => setIsOrderLightBoxOpen(false); // Update global state to close the lightbox

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleEsc);

    if (isOrderLightBoxOpen) {
      setTimeout(() => {
        setAnimationClass('opacity-100 scale-100');
      }, 10);
    } else {
      setAnimationClass('opacity-0 scale-95');
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOrderLightBoxOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(order_text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      {isOrderLightBoxOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeLightbox}
          />

          <div
            className={`relative rounded-lg shadow-xl max-w-md w-full mx-4 p-6 transition-all duration-300 ${animationClass}`}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }} // Set white background with 20% opacity
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-gray-500" />
            </button>

            <h3 className="text-lg text-white mb-4 pr-8 text-center">
            As we work towards a more seamless shopping experience, please enter the order details on the ordering page.
            </h3>

            <div
              className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-800 text-sm mb-4"
              style={{ whiteSpace: 'pre-wrap' }} // Ensure line breaks are rendered
            >
              {order_text}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-white rounded-md hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  backgroundColor: 'orange', // Set the button background color
                  focusRingColor: '#0c3d64', // Optional: Set focus ring color
                }}
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={orderPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
              >
                <ExternalLink size={18} />
                <span>Order page</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderLightBox;