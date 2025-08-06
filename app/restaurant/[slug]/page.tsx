import Link from "next/link";
import NavBar from "../../components/NavBar";
import Header from "./components/Header";
import { RestaurantNavBar } from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";

interface Restaurant {
  id: number;
  name: string;
  description: string;
  images: string[];
  slug: string;
  reviews: Review[];
}

const prisma = new PrismaClient();
const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      slug: true,
      reviews: true,
    },
  });

  // if (!restaurant) throw new Error("Can not find restaurant.");
  if (!restaurant) notFound();

  return restaurant;
};

const RestaurantDetails = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const restaurant = await fetchRestaurantBySlug(slug);
  // console.log("restaurant:", restaurant);
  return (
    <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </div>
  );
};
export default RestaurantDetails;
