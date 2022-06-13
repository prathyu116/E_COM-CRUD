import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Allproducts from "./components/Allproducts";
import Category from "./components/Category";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Register from "./components/Register";
import SingleCategory from "./components/SingleCategory";

function App() {
  return (
    <div className="">
      <Navbar />

      <Routes>
        <Route path="/" element={<Allproducts />}></Route>
        <Route path="/:category" element={<SingleCategory />}></Route>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:name" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
