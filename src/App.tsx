import React, { createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home'; 
import ResultPage from './Pages/SearchResults/ResultPage'; 
import ImageResultPage from './Pages/SearchResults/components/ImageResultPage';
import NavBar from './Pages/Home/components/NaveBar';


const App: React.FC = () => {
  return (
    
      <Router>
        <NavBar/>
        <Routes>
          {/* Route for the Home page */}
          <Route path="/" element={<Home />} />

          {/* Route for the Search Results page */}
          <Route path="/search/:query" element={<ResultPage />} />
          {/* {Route for the Image Result Page} */}
          <Route path="/image_results/:query" element={<ImageResultPage />} />

        </Routes>
      </Router>
   

  );
};

export default App;
