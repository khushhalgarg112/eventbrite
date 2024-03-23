import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";

// This component is the main card component used at home page and myevent
const EventCard = ({
  eventid,
  image,
  title,
  date,
  time,
  location,
  user,
  liked,
}) => {
  const [like, setActiveLike] = useState(false);
  // this function save like details of the user into the schema
  const saveLike = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/savelikes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        like,
        user: localStorage.getItem("user"),
        eventid,
      }),
    });
    const data = await response.json();
    console.log(eventid);
    if (data.id === 11) {
      alert("Event Added to Like Section");
    } else if (data.id == 10) {
      alert("Already Present in Likes");
    }
  };

  const newDate = date.split("-").reverse().join("-");
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-80 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold pb-2 text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {newDate} at {time}
        </p>
        <p className="text-sm text-gray-500 mb-2">Location: {location}</p>
        <div className="flex justify-between">
          <p className="text-xl text-gray-500">{user.split("@")[0]}</p>
          <button
            className="flex items-center text-gray-500 text-3xl hover:text-gray-700"
            onClick={() => {
              setActiveLike(true);
              saveLike();
            }}
          >
            {liked ? "❤️" : like ? "❤️" : <CiHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
