// const Search = () => {
//   return <div>this is search</div>;
// };

import Link from "next/link";
import NavBar from "../components/NavBar";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import RestaurantCard from "./components/RestaurantCard";
import { PRICE, PrismaClient } from "@prisma/client";
import Reviews from "../restaurant/[slug]/components/Reviews";

// export default Search;
interface SearchParams {
  city?: string;
  cuisine?: string;
  price: PRICE;
}

const prisma = new PrismaClient();
const fetchRestaurantByCity = (searchParams: SearchParams) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    location: true,
    cuisine: true,
    slug: true,
  };
  if (!searchParams.city) return prisma.restaurant.findMany({ select });

  const where: any = {};
  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
    where.location = location;
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }
  return prisma.restaurant.findMany({
    where,
    select: {
      id: true,
      name: true,
      main_image: true,
      price: true,
      location: true,
      cuisine: true,
      slug: true,
      reviews: true,
    },
  });
  // return prisma.restaurant.findMany({
  //   where: {
  //     location: {
  //       name: {
  //         equals: searchParams.city,
  //       },
  //     },
  //   },
  //   select,
  // });
};

const fetchLocations = async () => {
  const locations = await prisma.location.findMany();
  return locations;
};
const fetchCuisines = () => {
  return prisma.cuisine.findMany();
};

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const restaurants = await fetchRestaurantByCity(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <Header />

        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          <Searchbar
            locations={locations}
            cuisines={cuisines}
            searchParams={searchParams}
          />
          <div className="w-5/6">
            {restaurants?.length ? (
              <>
                {restaurants.map((restaurant) => (
                  <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                ))}
              </>
            ) : (
              <p>Sorry, we found no restaurant in this area.</p>
            )}
          </div>
        </div>
      </main>
    </main>
  );
}
