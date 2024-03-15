import React, { useEffect, useState } from "react";
import EventCard from "../Card Component/EventCard";
import Navbar from "../Components/Navbar";


// This components containes the event created by the current user
const MyEvent = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const currentUser = localStorage.getItem("user");
        if (!currentUser) {
          throw new Error("User not logged in");
        }

        const response = await fetch("http://127.0.0.1:8000/api/getevent/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const eventData = await response.json();
        // Filtering the event created by the current user only
        const filteredEvents = eventData.filter(
          (event) => event.user === currentUser
        );
        setMyEvents(filteredEvents);
        console.log(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

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

    fetchMyEvents();
    fetchLikedEvents();
  }, []);
// (Same as the Home componenet)merged the likeevent and event data here if the like is true for the currect user for an specific id of event then it add liked true attribute to it
// else it add liked attribute false
  const getLikedEventsDetails = () => {
    const currentUser = localStorage.getItem("user");
    const likedEventsDetails = likedEvents.filter(
      (likedEvent) => likedEvent.user === currentUser
    );

    const userLikedEvents = likedEventsDetails.map((likedEvent) => {
      const eventDetails = myEvents.find((event) => event.id === likedEvent.eventid);
      return { ...eventDetails, liked: true };
    });

    return userLikedEvents;
  };

  const userLikedEvents = getLikedEventsDetails();

  return (
    <>
      <Navbar className="sticky top-0 z-10" />
      <p className="text-4xl font-semibold font-rubik text-gray-800 mt-4 mb-2 mx-6">
        My Events
      </p>
      <div className="mx-4 grid grid-cols-2 gap-4">
        {myEvents.length === 0 ? (
          <p className="text-center font-rubik text-2xl absolute left-1/2 text-gray-500">
            No event
          </p>
        ) : (
          myEvents.map((event, index) => (
            <EventCard
              key={index}
              eventid={event.id}
              image={event.image}
              title={event.title}
              time={event.time}
              date={event.date}
              location={event.location}
              user={event.user}
              liked={userLikedEvents.some((likedEvent) => likedEvent.id === event.id)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default MyEvent;
