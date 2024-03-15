import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/login";
import Signup from "./Components/Signup";
import CreateEvent from "./Nav Components/CreateEvent";
import MyEvent from "./Nav Components/MyEvent";
import Likes from "./Nav Components/Likes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/create" element={<CreateEvent />}></Route>
        <Route path="/myevent" element={<MyEvent />} />
        <Route path="/likes" element={<Likes/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
