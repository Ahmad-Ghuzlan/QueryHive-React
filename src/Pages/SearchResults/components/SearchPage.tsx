import React, { useState, useEffect } from "react";
import "../style/ResultPageStyle.css";
import SearchBar from "../../Home/components/SearchBar";
import WikiDescription from "./WikiDescription";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ResultBar from "./ResultBar";

const SearchPage: React.FC = () => {
  const [results, setResults] = useState<[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const resultsPerPage = 20; 

  const { query } = useParams<{ query: string }>();
  const navigate = useNavigate();

  // Fetch results from the API
  const fetchResults = async (query: string) => {
    if (!query.trim()) return; 
    try {
      const response = await axios.get(
        `http://localhost:3000/search?q=${query}`
      );
      setResults(response.data["organic_results"] || []);
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]);
    }
  };

  // Fetch results on component mount or query change
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      fetchResults(query);
    }
  }, [query]);

  // Calculate results for the current page
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  // Handle page change
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle new search submission
  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) {
      console.log("Search query is empty. Staying on the same page.");
      return; 
    }
    setSearchQuery(query);
    navigate(`/search/${query}`);
    fetchResults(query);
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    const route = tab === "Images" ? `/image_results/${searchQuery}` : `/search/${searchQuery}`;
    navigate(route);
    
  };

  return (
    <div className="search-page">
      {/* Search bar */}
      <div className="search-bar-container">
        <SearchBar onSubmit={handleSearchSubmit} />
      </div>
      <div className="resultbar"> <ResultBar query={searchQuery} onTabChange={handleTabChange} /></div>
      

      {/* Wikipedia description */}
      {searchQuery && (
        <div className="wikipedia-box">
          <WikiDescription query={searchQuery} />
        </div>
      )}

      {/* Search results */}
      <div className="search-results">
        {currentResults.length > 0 ? (
          currentResults.map((result, index) => (
            <div key={index} className="result-item">
              {/* Link above the title */}
              <a
                href={result["displayed_link"]}
                target="_blank"
                rel="noopener noreferrer"
                className="result-link"
              >
                {result["displayed_link"]}
              </a>

              {/* Title */}
              <h3 className="result-title">{result["title"]}</h3>

              {/* Snippet */}
              <p className="result-snippet">{result["snippet"]}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
