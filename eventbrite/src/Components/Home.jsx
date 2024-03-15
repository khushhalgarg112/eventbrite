import { useEffect, useState } from "react";
import EventCard from "../Card Component/EventCard";
import Navbar from "./Navbar";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
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

    const fetchLikedEvents = async () => {
      try {
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

    fetchEvents();
    fetchLikedEvents();
  }, []);
// merged the likeevent and event data here if the like is true for the currect user for an specific id of event then it add liked true attribute to it
// else it add liked attribute false
  const mergeEventsWithLikes = () => {
    const currentUser = localStorage.getItem("user");
    return events.map((event) => ({
      ...event,
      liked: likedEvents.some(
        (like) => like.user === currentUser && like.eventid === event.id
      ),
    }));
  };

  const eventsWithLikes = mergeEventsWithLikes();

  return (
    <>
      <Navbar className="sticky top-0 z-10" />
      <br />
      <div className=" mx-4 grid grid-cols-2 gap-4">
        {eventsWithLikes.map((event, index) => (
          <EventCard
            key={index}
            eventid={event.id}
            image={event.image}
            title={event.title}
            time={event.time}
            date={event.date}
            location={event.location}
            user={event.user}
            liked={event.liked}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
