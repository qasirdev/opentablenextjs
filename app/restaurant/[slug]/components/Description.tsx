import React from "react";

export default function Descriptions({ description }: { description: string }) {
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{description}</p>
    </div>
  );
}
