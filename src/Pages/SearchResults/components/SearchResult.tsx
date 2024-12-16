import React, { useState, useEffect } from 'react';

interface SearchResultProps {
  query: string;
}

interface Result {
  id: number;
  title: string;
  description: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ query }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const resultsPerPage = 10; 

  
  

  

  // Get the results to display on the current page
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  // Calculate the total number of pages
  const totalPages = Math.ceil(results.length / resultsPerPage);

  // Function to handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="search-results">
      <h2>Search Results for: "{query}"</h2>

      {currentResults.length > 0 ? (
        <>
          <ul>
            {currentResults.map(result => (
              <li key={result.id}>
                <h3>{result.title}</h3>
                <p>{result.description}</p>
              </li>
            ))}
          </ul>

          {/* Pagination controls */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResult;
