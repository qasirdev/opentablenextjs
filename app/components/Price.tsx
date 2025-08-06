import { PRICE } from "@prisma/client";

const Price = ({ price }: { price: PRICE }) => {
  const renderPrice = () => {
    if (price === PRICE.CHEAP) {
      return (
        <>
          <span>$$</span> <span className="text-grey-400">$$</span>
        </>
      );
    } else if (price === PRICE.REGULAR) {
      return (
        <>
          <span>$$$</span> <span className="text-grey-400">$</span>
        </>
      );
    } else {
      return (
        <>
          <span>$$$$</span>
        </>
      );
    }
  };
  return <p className="mr-3">{renderPrice()}</p>;
};
export default Price;
