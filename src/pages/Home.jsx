import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import RestaurantCard from "../components/RestaurantCard";

export default function Home(){
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetch() {
      const snap = await getDocs(collection(db, "restaurants"));
      setRestaurants(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetch();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">مطاعم</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {restaurants.map(r => <RestaurantCard key={r.id} rest={r} />)}
      </div>
    </div>
  );
}
