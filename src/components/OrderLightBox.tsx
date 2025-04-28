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
    const headstock = useVariant((state) => state.headstock);
    const headstock2 = useVariant((state) => state.headstock2);

    const body_name = guitarVariants.find((variant) => variant.id === body)?.name || "Undefined Body";
    const headstock_name = guitarVariants.find((variant) => variant.id === headstock)?.name || "Undefined Head Stock";
    const headstock2_name = guitarVariants.find((variant) => variant.id === headstock2)?.name || "Undefined Head Stock";
    const inlay_name = guitarVariants.find((variant) => variant.id === inlay)?.name || "Undefined Inlay";
  const order_text = "body: " + body_name + "\n" +
    "headstock: " + headstock_name + "\n" +
    "headstock2: " + headstock2_name + "\n" +
    "inlay: " + inlay_name + "\n";
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
    navigator.clipboard.writeText(body).then(() => {
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
            className={`relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 transition-all duration-300 ${animationClass}`}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-gray-500" />
            </button>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 pr-8">
              Whilst we are working on improving your shopping experience, please copy the following order details on our ordering page
            </h3>

            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-800 font-mono text-sm mb-4">
              {order_text}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50"
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