"use client";

import Image from "next/image";
import errorMascot from "../public/icons/error.png";

export default function Error({ error }: { error: Error }) {
  // console.log("Error page:error:", error);
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorMascot} alt="error" className="w-56 mb-8" />{" "}
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl font-bold">{error.message}</h3>
        <h3 className="text-3xl font-bold">error code: 400</h3>
      </div>
    </div>
  );
}
