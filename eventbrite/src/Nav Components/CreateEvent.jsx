import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Form component to create the Event Form
const CreateEvent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const is_liked = false;
  const user = localStorage.getItem("user");

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(date);
    console.log(time);
    const response = await fetch("http://127.0.0.1:8000/api/event/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        summary,
        time,
        location,
        image,
        is_liked,
        user,
        date,
      }),
    });
    const data = await response.json();
    if (data.id === 11) {
      alert(data.data);
      navigate("/");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Login To create the Event");
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="absolute left-4 top-4">
        <button
          className="text-3xl"
          onClick={() =>
            setTimeout(() => {
              navigate("/");
            }, 500)
          }
        >
          <FiArrowLeft className="text-gray-500" />
        </button>
      </div>
      <form className="w-3/5 p-6 bg-white rounded shadow-md">
        <h2 className="text-5xl font-semibold font-rubik  mb-4">
          Build your Event Page
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="summary"
            className="block text-gray-700 font-medium mb-1"
          >
            Summary
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Enter summary"
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 font-medium mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-gray-700 font-medium mb-1"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 font-medium mb-1"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-medium mb-1"
          >
            Image
          </label>
          <input
            type="text"
            id="image"
            value={image}
            placeholder="Enter Image Url"
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-customOrange text-white font-semibold rounded transition-all hover:bg-orange-400 focus:outline-none"
          onClick={(e) => handleForm(e)}
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
