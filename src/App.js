import logo from "./logo.svg";
import "./App.css";
import RedBusNavbar from "./components/Navbar";
import Search from "./components/Search";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import Home from "./components/Home";
import { useState } from "react";
import JourneyContext from "./context/JourneyContext";
import SeatSelection from "./components/SeatSelection";
import Journey from "./components/Journey";
import Login from "./components/Login";

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  return (
    <div className="App">
      <JourneyContext.Provider
        value={{
          from: from,
          to: to,
          setFrom: setFrom,
          setTo: setTo,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Journey Component={Home} />} />
            <Route
              path="/results"
              element={<Journey Component={SearchResults} />}
            />
            <Route
              path="/book-seats"
              element={<Journey Component={SeatSelection} />}
            />
          </Routes>
        </BrowserRouter>
      </JourneyContext.Provider>
    </div>
  );
}

export default App;
