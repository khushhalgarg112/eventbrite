import React, { useState } from "react";

// Just a simple card with red heart it is used in the My Like section
const LikedEventCard = ({
  eventid,
  image,
  title,
  date,
  time,
  location,
  user,
  onDelete
}) => {
  const newDate = date.split("-").reverse().join("-");

  const handleDelete = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/savelikes/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventid,
          user,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      // Call the callback function to update state
      onDelete(eventid);
    } catch (error) {
      console.error("Error deleting event:", error);
    }

  };

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
            onClick={handleDelete}
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default LikedEventCard;
