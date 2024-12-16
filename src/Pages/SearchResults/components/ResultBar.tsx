import React from "react";
import { Link } from "react-router-dom";

interface ResultBarProps {
  query: string;
  onTabChange: (tab: string) => void; 
}

const ResultBar: React.FC<ResultBarProps> = ({ query, onTabChange }) => {
  return (
    <nav className="resultbar">
      <ul className="result-links">
        <li>
          <Link to={`/search/${query}`} onClick={() => onTabChange("All")}>
            All
          </Link>
        </li>
        <li>
          <Link
            to={`/image_results/${query}`}
            onClick={() => onTabChange("Images")}
          >
            Images
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ResultBar;
