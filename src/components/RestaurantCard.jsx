import React from "react";
import { Link } from "react-router-dom";

export default function RestaurantCard({ rest }){
  return (
    <Link to={`/restaurant/${rest.id}`} className="block border rounded-lg p-3 bg-white hover:shadow">
      <img src={rest.image || "/placeholder.png"} alt={rest.name} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-2 font-semibold text-lg">{rest.name}</h3>
      <p className="text-sm text-gray-500">{rest.city} • {rest.cuisine}</p>
    </Link>
  );
}
