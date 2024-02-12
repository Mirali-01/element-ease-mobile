import {
  useNavigate,
  useParams,
  Link,
  useOutletContext,
} from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import colorCategory from "../components/models/ColorCategory";

const ElementModal = () => {
  const navigate = useNavigate();
  const { number } = useParams();
  const [element, setElement] = useState([]);
  const { elements } = useOutletContext();

  const fetchElement = async (number) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/element/${number}`
      );
      setElement(response.data);
      console.log(number);
    } catch (error) {
      console.error("Error fetching element:", error);
    }
  };

  useEffect(() => {
    fetchElement(number);
  }, [number]);

  useEffect(() => {
    // Check if the number is not present or is outside the valid range
    // Redirect to Periodic Table home page
    if (!number || isNaN(number) || number < 1 || number > elements.length) {
      navigate("/");
    }
  }, [number, elements, navigate]);

  const stopPropagating = (e) => e.stopPropagation();

  return (
    <div className="modal-overlay" onClick={() => navigate("/")}>
      <div className="modal-container">
        <Link
          style={{
            color: colorCategory[element.category],
            border: `1px solid ${colorCategory[element.category]}`,
          }}
          to={`/element/${
            element.number - 1 === 0 ? elements.length : element.number - 1
          }`}
          className="arrow"
          onClick={stopPropagating}
        >
          &#8592;
        </Link>
        <div
          style={{
            color: colorCategory[element.category],
            border: `1px solid ${colorCategory[element.category]}`,
          }}
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <h3>{element.number}</h3>
            <p>{element.symbol}</p>
            <p>{element.name}</p>
            <p>{element.atomic_mass}</p>
          </div>
        </div>
        <Link
          style={{
            color: colorCategory[element.category],
            border: `1px solid ${colorCategory[element.category]}`,
          }}
          to={`/element/${
            element.number + 1 === elements.length + 1 ? 1 : element.number + 1
          }`}
          className="arrow"
          onClick={stopPropagating}
        >
          &#8594;
        </Link>
      </div>
    </div>
  );
};

export default ElementModal;
