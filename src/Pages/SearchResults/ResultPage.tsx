import React, { useState } from 'react';
import SearchPage from './components/SearchPage';
import NavBar from '../Home/components/NaveBar';
import ResultBar from './components/ResultBar';
import { useParams } from 'react-router-dom';

const ResultPage: React.FC = () => {
  const { query } = useParams<{ query: string }>(); 
  const [selectedTab, setSelectedTab] = useState<string>("All"); 

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    console.log(`Switched to ${tab} tab`);
  };

  return (
    <div>
      {/* <NavBar /> */}
      {/* Pass the query and tab change handler to ResultBar */}
      {/* <ResultBar query={query || ""} onTabChange={handleTabChange} /> */}
      <SearchPage />
    </div>
  );
};

export default ResultPage;
