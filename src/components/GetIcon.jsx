import {
    HeadStockArrowIcon,
    HeadStockAviatorIcon,
    HeadStockBriefcaseIcon,
    HeadStockBroadcasterIcon,
    HeadStockFallenAngelIcon,
    HeadStockHeadlessIcon,
    HeadStockNinjaStarIcon,
    HeadStockOversizedIcon,
    HeadStockPlankSpankerIcon,
    HeadStockReliableIcon,
    HeadStockSummitIcon,
    HeadStockThunderbirdIcon,
    HeadStockViperIcon,
  } from '../data/icons.tsx';
  
  // Utility function to get the corresponding icon for a headstock
  export const getHeadstockIcon = (headstock) => {
    const headstockIcons = {
      arrow: <HeadStockArrowIcon size={56} />,
      viper: <HeadStockViperIcon size={56} />,
      aviator: <HeadStockAviatorIcon size={56} />,
      summit: <HeadStockSummitIcon size={56} />,
      reliable: <HeadStockReliableIcon size={56} />,
      fallenangel: <HeadStockFallenAngelIcon size={56} />,
      ninjastar: <HeadStockNinjaStarIcon size={56} />,
      headless: <HeadStockHeadlessIcon size={56} />,
      broadcaster: <HeadStockBroadcasterIcon size={56} />,
      oversized: <HeadStockOversizedIcon size={56} />,
      briefcase: <HeadStockBriefcaseIcon size={56} />,
      thunderbird: <HeadStockThunderbirdIcon size={56} />,
    };
  
    return headstockIcons[headstock] || null; // Return the icon or null if not found
  };