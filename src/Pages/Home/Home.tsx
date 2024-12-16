import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './components/logo';
import SearchBar from './components/SearchBar';
import NavBar from './components/NaveBar';
import Footer from './components/Footer';
import "./style/HomeStyle.css"; 
import { GlobalProvider } from '../../GlobalSongProvider';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Apply home-page-body class to the body element when Home page is loaded
    document.body.classList.add('home-page-body');

    return () => {
      // Remove the class when component unmounts, or if the user navigates away
      document.body.classList.remove('home-page-body');
    };
  }, []);

  // Handle search submit for Home page
  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) {
      console.log("Search query is empty. Staying on the same page.");
      return; 
    }
    navigate("/search/" + query);
  };

  return (
    <GlobalProvider>
      <div className="home-container">
        {/* <NavBar /> */}
        <div className="bodyCenter">
          <Logo text="QueryHive" fontSize="3rem" color="white" />
          <div className="sublogo">Independent and Open Source search engine</div>
        </div>
        {/* Pass the handler to SearchBar */}
        <SearchBar onSubmit={handleSearchSubmit} />
        <Footer />
      </div>
     </GlobalProvider>
  );
};

export default Home;
