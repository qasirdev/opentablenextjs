import emptyStar from "../../public/icons/empty-star.png";
import halfStar from "../../public/icons/half-star.png";
import fullStar from "../../public/icons/full-star.png";
import errorStar from "../../public/icons/error.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../utils/calculateReviewRatingAverage";

const Stars = ({ reviews, rating }: { reviews: Review[]; rating?: number }) => {
  const reviewRating = rating || calculateReviewRatingAverage(reviews);

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const differnce = parseFloat((reviewRating - i).toFixed(1));
      if (differnce >= 1) stars.push(fullStar);
      else if (differnce < 1 && differnce > 0) {
        if (differnce <= 0.2) stars.push(emptyStar);
        else if (differnce <= 0.6 && differnce > 0.2) stars.push(halfStar);
      } else stars.push(emptyStar);
    }
    return stars.map((star) => (
      <Image src={star} alt="" className="w-4 h4 mr-1" />
    ));
  };
  return <div className="flex items-center">{renderStars()}</div>;
};
export default Stars;
