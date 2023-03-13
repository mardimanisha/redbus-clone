import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import JourneyContext from "../context/JourneyContext";
import BusResult from "./BusResult";

function SearchResults() {
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { from, to } = useContext(JourneyContext);

  useEffect(() => {
    async function fetchBuses() {
      setIsLoading(true);
      const response = await fetch(
        `https://content.newtonschool.co/v1/pr/63b70222af4f30335b4b3b9a/buses?source=${from}&destination=${to}`
      );
      const allBuses = await response.json();
      setIsLoading(false);
      setBuses(allBuses);
    }

    fetchBuses();
  }, [from, to]);

  function sortResults(criteria) {
    const busesCopy = [...buses];
    let sortedBuses = [];
    if (criteria === "Price") {
      sortedBuses = busesCopy.sort((a, b) => {
        if (Number(a.ticketPrice) < Number(b.ticketPrice)) return -1;
        return 1;
      });
    } else if (criteria === "Departure") {
      sortedBuses = busesCopy.sort((a, b) => {
        if (a.departureTime.includes("AM") && b.departureTime.includes("PM"))
          return -1;
        else if (
          a.departureTime.includes("PM") &&
          b.departureTime.includes("AM")
        )
          return 1;
        else {
          const matchesA = a.departureTime.match(/\d+/g);
          const matchesB = b.departureTime.match(/\d+/g);
          return (
            parseInt(Number(matchesA[0] + matchesA[1])) -
            parseInt(Number(matchesB[0] + matchesB[1]))
          );
        }
      });
    } else {
      sortedBuses = busesCopy.sort((a, b) => {
        if (a.arrivalTime.includes("AM") && b.arrivalTime.includes("PM"))
          return -1;
        else if (a.arrivalTime.includes("PM") && b.arrivalTime.includes("AM"))
          return 1;
        else {
          const matchesA = a.arrivalTime.match(/\d+/g);
          const matchesB = b.arrivalTime.match(/\d+/g);
          return (
            parseInt(matchesA[0] + matchesA[1]) -
            parseInt(matchesB[0] + matchesB[1])
          );
        }
      });
    }
    setBuses(sortedBuses);
  }

  if (isLoading) {
    return <Spinner animation="border" variant="danger" />;
  }

  return (
    <div className="bg-danger p-2 d-flex flex-column">
      <div className="bg-white p-2 d-flex w-75 align-self-center">
        <h4 className="w-50">SORT BY:</h4>
        <div className="d-flex justify-content-around w-100">
          {["Departure", "Arrival", "Price"].map((criteria) => {
            return (
              <Button
                variant="danger"
                className="rounded-0"
                onClick={() => {
                  sortResults(criteria);
                }}
              >
                {criteria}
              </Button>
            );
          })}
        </div>
      </div>
      {buses.map((bus) => {
        return <BusResult bus={bus} />;
      })}
    </div>
  );
}

export default SearchResults;
