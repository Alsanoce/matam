import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Restaurant(){
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch(){
      const rDoc = await getDoc(doc(db, "restaurants", id));
      if(rDoc.exists()) setRestaurant({ id: rDoc.id, ...rDoc.data() });

      const q = query(collection(db, "menuItems"), where("restaurantId", "==", id));
      const snap = await getDocs(q);
      setMenu(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetch();
  }, [id]);

  if(!restaurant) return <div>جاري التحميل...</div>;

  return (
    <div>
      <div className="flex items-center gap-4">
        <img src={restaurant.image || "/placeholder.png"} className="w-32 h-24 object-cover rounded" />
        <div>
          <h2 className="text-2xl font-bold">{restaurant.name}</h2>
          <p className="text-sm text-gray-500">{restaurant.description}</p>
        </div>
      </div>

      <h3 className="mt-6 text-xl font-semibold">القائمة</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        {menu.map(item => (
          <div key={item.id} className="p-3 bg-white rounded shadow-sm">
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <div className="text-lg font-semibold">{item.price} د.ل</div>
            </div>
            <div className="mt-2 flex justify-end">
              <button className="px-3 py-1 rounded bg-orange-500 text-white">أضف للسلة</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
