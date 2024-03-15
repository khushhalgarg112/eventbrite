import React from "react";

// Just a simple card with red heart it is used in the My Like section
const LikedEventCard = ({ eventid, image, title, date, time, location, user }) => {
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
          <button className="flex items-center text-gray-500 text-3xl hover:text-gray-700">
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default LikedEventCard;
