import React, { useState, useEffect } from 'react';

interface WikiDescriptionProps {
  query: string; // The search query passed as a prop
}

const WikiDescription: React.FC<WikiDescriptionProps> = ({ query }) => {
  const [description, setDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return; 

    const fetchDescription = async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&origin=*&titles=${query}`
        );
        const data = await response.json();

        // Extract the page data from the Wikipedia API response
        const page = data.query.pages;
        const pageId = Object.keys(page)[0];

        if (pageId === '-1') {
          setDescription('No description available for this term.');
        } else {
          setDescription(page[pageId].extract); // Set the description
          setLink(`https://en.wikipedia.org/wiki/${query}`); // Generate the Wikipedia link
        }
      } catch (err) {
        setError('Failed to fetch description from Wikipedia.');
      }
    };

    fetchDescription();
  }, [query]);

  return (
    <div className="wikipedia-box">
  {error && <p className="wikipedia-description">{error}</p>}
  {!error && link && (
    <>
      {/* Title */}
      <h2 className="wikipedia-title">{query}</h2>

      {/* Description */}
      <p className="wikipedia-description">
        {description ? description : 'Loading...'}
      </p>

      {/* Source */}
      <p className="wikipedia-source">
        source:{" "}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="wikipedia-link"
        >
          Wikipedia
        </a>
      </p>
    </>
  )}
</div>


  );
};

export default WikiDescription;
