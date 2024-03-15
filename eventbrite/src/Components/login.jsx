import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/img.jpg";

import imge from "../assets/logo.png";


// Login Component which login the user using the django login api this is fully responsive

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailInputClicked, setIsEmailInputClicked] = useState(false);
  const [isPasswordInputClicked, setIsPasswordInputClicked] = useState(false);
  const navigate = useNavigate();

  const handleEmailInputClick = () => {
    setIsEmailInputClicked(true);
    setIsPasswordInputClicked(false);
  };

  const handlePasswordInputClick = () => {
    setIsPasswordInputClicked(true);
    setIsEmailInputClicked(false);
  };

  const handleForm = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.id == 11) {
      // Saving email to localStorage for further use
      localStorage.setItem("user", data.data.email);
      navigate("/");
    } else {
      alert("Enter Valid Email and Password");
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center h-screen p-4 lg:p-0 ">
        <img src={imge} alt="Logo" className="h-8" />
        <p className="text-gray-800 text-6xl font-rubik font-medium ">Log in</p>
        <br />
        <br />
        <div
          className={`flex flex-col border-2 px-2 pb-1 w-2/5 border-gray-600 ${
            isEmailInputClicked ? "border-blue-600" : ""
          }`}
        >
          <p className={`${isEmailInputClicked ? "text-blue-600" : ""}`}>
            Email
          </p>
          <input
            required
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="border-none focus:outline-none"
            onClick={handleEmailInputClick}
          />
        </div>
        <br />
        <div
          className={`flex flex-col border-2 px-2 pb-1 w-2/5 border-gray-600 ${
            isPasswordInputClicked ? "border-blue-600" : ""
          }`}
        >
          <p className={`${isPasswordInputClicked ? "text-blue-600" : ""}`}>
            Password
          </p>
          <input
            required
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border-none focus:outline-none"
            onClick={handlePasswordInputClick}
          />
        </div>
        <br />

        <button
          className="px-2 pb-1 w-2/5 bg-customOrange transition-all hover:bg-orange-600 h-12 rounded text-white font-medium"
          onClick={handleForm}
        >
          Log in
        </button>
        <br />
        <a href="/signup" className="font-rubik font-medium text-blue-600">
          Sign up
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

export default Login;
