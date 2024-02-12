import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

const PeriodicTable = () => {
  const [elements, setElements] = useState([]);

  const fetchElements = async () => {
    try {
      const response = await axios.get("http://localhost:5000/element");
      setElements(response.data);
    } catch (error) {
      console.error("Error fetching elements:", error);
    }
  };

  useEffect(() => {
    fetchElements();
  }, []);

  return (
    <div className="periodic-table">
      {elements.map((element) => (
        <div key={element.number}>
          <Link to={`/element/${element.number}`}>
            <div className="element-card">
              <h3>{element.number}</h3>
              <p>{element.symbol}</p>
              <p>{element.name}</p>
            </div>
          </Link>
          <Outlet context={{ elements }} />
        </div>
      ))}
    </div>
  );
};

export default PeriodicTable;
