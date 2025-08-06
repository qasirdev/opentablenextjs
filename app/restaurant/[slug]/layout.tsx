import NavBar from "../../components/NavBar";
import Header from "./components/Header";

export default function RestaurantLayout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <main className="bg-gray-100 min-h-screen w-screen">
          <main className="max-w-screen-2xl m-auto bg-white">
            <NavBar />
            <Header name={slug} />
            {children}
          </main>
        </main>
      </body>
    </html>
  );
}
