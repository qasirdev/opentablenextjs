import Link from "next/link";
import NavBar from "../../../components/NavBar";
import Header from "../components/Header";
import { RestaurantNavBar } from "../components/RestaurantNavBar";
import Menu from "../components/Menu";
import { Item, PrismaClient, Restaurant } from "@prisma/client";
import ReservationCard from "../components/ReservationCard";

const prisma = new PrismaClient();
const fetchMenuItems = async (slug: string): Promise<Item[]> => {
  const Restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });
  if (!Restaurant) {
    throw new Error();
  }

  return Restaurant.items;
};
const RestaurantMenu = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const menuItems = await fetchMenuItems(slug);
  console.log("menuItems:", menuItems);
  return (
    <>
      {menuItems.length ? (
        <>
          <div className="bg-white w-[100] rounded p-3 shadow">
            <RestaurantNavBar slug={slug} />
            <Menu menu={menuItems} />
          </div>
        </>
      ) : (
        <p>This restaurant does not have menu</p>
      )}
    </>
  );
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <Header name={slug} />
        {/* DESCRIPTION PORTION */}
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[100%] rounded p-3 shadow">
            {/* RESAURANT NAVBAR */}
            <nav className="flex text-reg border-b pb-2">
              <Link href="/restaurant/milesstone-grill" className="mr-7">
                Overview{" "}
              </Link>
              <Link href="/restaurant/milesstone-grill/menu" className="mr-7">
                Menu{" "}
              </Link>
            </nav>
            {/* RESAURANT NAVBAR */}
            {/* MENU */}

            {/* MENU */}
          </div>
        </div>
        {/* DESCRIPTION PORTION */}
      </main>
    </main>
  );
};

export default RestaurantMenu;
