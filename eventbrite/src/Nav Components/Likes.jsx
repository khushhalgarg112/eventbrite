import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import LikedEventCard from "../Card Component/LikedEventCard";

// This component contain the Liked event of teh current User
const Likes = () => {
  const [likedEvents, setLikedEvents] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchLikedEvents = async () => {
      try {
        const currentUser = localStorage.getItem("user");
        if (!currentUser) {
          throw new Error("User not logged in");
        }

        const response = await fetch("http://127.0.0.1:8000/api/savelikes/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch liked events");
        }

        const likedEventData = await response.json();
        setLikedEvents(likedEventData);
      } catch (error) {
        console.error("Error fetching liked events:", error);
      }
    };

    const fetchAllEvents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/getevent/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const eventData = await response.json();
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchLikedEvents();
    fetchAllEvents();
  }, []);

  const currentUser = localStorage.getItem("user");
  const getLikedEventsDetails = () => {
    const likedEventsDetails = likedEvents.filter(
      (likedEvent) => likedEvent.user === currentUser
    );
    console.log(likedEventsDetails);
    const userLikedEvents = likedEventsDetails.map((likedEvent) => {
      const eventDetails = events.find(
        (event) => event.id === likedEvent.eventid
      );
      return eventDetails;
    });
    console.log(userLikedEvents);
    return userLikedEvents.filter((event) => event);
  };

  const userLikedEvents = getLikedEventsDetails();


  const handleDelte = (deleteid) =>{
    setLikedEvents(prevLikedEvents =>
      prevLikedEvents.filter(event => event.eventid !== deleteid)
    );
    userLikedEvents = likedEvents;
  }

  return (
    <>
      <Navbar className="sticky top-0 z-10" />
      <br />
      <p className="text-4xl font-semibold font-rubik text-gray-800 mt-4 mb-2 mx-6">
        My Favorite
      </p>
      <div className="mx-4 grid grid-cols-2 gap-4">
        {userLikedEvents.length === 0 ? (
          <p className="text-center font-rubik text-2xl text-gray-500">
            No liked events
          </p>
        ) : (
          userLikedEvents.map((event, index) => (
            <LikedEventCard
              key={index}
              eventid={event.id}
              image={event.image}
              title={event.title}
              time={event.time}
              date={event.date}
              location={event.location}
              user={currentUser}
              onDelete={handleDelte}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Likes;
