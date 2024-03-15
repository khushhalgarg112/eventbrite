import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imge from "../assets/logo.png";
import img from "../assets/img.jpg";

// Signup Component which create account of  the user using the django signup api this is fully responsive
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const navigate = useNavigate();

  const handleForm = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });
    const data = await response.json();
    if (data.id == 11) {
      // Saving email to localStorage for further use
      localStorage.setItem("user", data.data.email);
      navigate("/");
    } else if (data.id == 10) {
      alert("User Already Exists! Try to Login");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center h-screen p-4 lg:p-0">
        <img src={imge} alt="Logo" className="h-8" />
        <p className="text-gray-800 text-6xl font-rubik font-medium my-4 lg:my-8">
          Create Account
        </p>
        <div className="w-full lg:w-2/3">
          <div className="flex flex-col border-2 border-gray-600 mb-4">
            <p className="px-2 py-1 text-gray-600">FirstName</p>
            <input
              type="text"
              required
              onChange={(e) => setFirstName(e.target.value)}
              className="border-none focus:outline-none px-2 py-1"
            />
          </div>
          <div className="flex flex-col border-2 border-gray-600 mb-4">
            <p className="px-2 py-1 text-gray-600">Last Name</p>
            <input
              required
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              className="border-none focus:outline-none px-2 py-1"
            />
          </div>
          <div className="flex flex-col border-2 border-gray-600 mb-4">
            <p className="px-2 py-1 text-gray-600">Email</p>
            <input
              required
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="border-none focus:outline-none px-2 py-1"
            />
          </div>
          <div className="flex flex-col border-2 border-gray-600 mb-4">
            <p className="px-2 py-1 text-gray-600">Password</p>
            <input
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-none focus:outline-none px-2 py-1"
            />
          </div>
        </div>
        <button
          className="w-2/3 bg-customOrange transition-all hover:bg-orange-600 h-12 rounded text-white font-medium my-4 lg:my-8"
          onClick={handleForm}
        >
          Create Account
        </button>
        <a href="/login" className="font-rubik font-medium text-blue-600">
          Login
        </a>
      </div>

      <div className="relative overflow-hidden hidden lg:block">
        <img
          src={img}
          alt="image"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
