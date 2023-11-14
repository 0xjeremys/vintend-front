import "./App.css";
/* packages*/

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
/* pages */
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

/* components*/
import Header from "./components/Header";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [search, setSearch] = useState("");

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };
  return (
    <Router>
      <Header
        handleToken={handleToken}
        userToken={userToken}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offers/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/publish" element={<Publish userToken={userToken} />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
