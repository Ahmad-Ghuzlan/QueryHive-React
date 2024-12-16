import React, { useContext, useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-player";
import { GlobalContext } from "../../../GlobalSongProvider";
import axios from "axios";

const NavBar: React.FC = () => {
  const context = useContext(GlobalContext);
  const [musicQuery, setMusicQuery] = useState<string>(""); 
  const [searchResults, setSearchResults] = useState<any[]>([]); 
  const { globalVariable, setGlobalVariable } = context;

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false); 
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false); 
  const [isRegistered, setIsRegistered] = useState(false); 
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  }); 

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    
    setIsSignedIn(!!window.localStorage.getItem("token"));
  }, []);

  const choosesong = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGlobalVariable(event.target.value);
  };

  // Handle music search
  const handleSearch = async () => {
    if (!musicQuery.trim()) {
      console.log("Music query is empty.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/search_tracks?q=${encodeURIComponent(musicQuery)}`
      );
      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error("Error fetching music:", error);
    }
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Sign-In
  const handleSignIn = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/login?email=${encodeURIComponent(
          formData.email
        )}&password=${encodeURIComponent(formData.password)}`
      );
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      setIsSignedIn(true); 
      setIsSignInModalOpen(false); 
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  // Handle Sign-Out
  const handleSignOut = () => {
    window.localStorage.removeItem("token");
    setIsSignedIn(false); 
  };

  // Handle Register
  const handleRegister = async () => {
    try {
      const data = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      await axios.post("http://localhost:3000/register", data);
      setIsSignInModalOpen(false); 
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <nav className="navbar">
        {/* Sign-In/Sign-Out Button */}
        <div className="SingIn">
        {isSignedIn ? (
          <div className="SignIn">
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <div className="SignIn">
            <button onClick={() => setIsSignInModalOpen(true)}>Sign In</button>
          </div>
        )}
        </div>

        {/* Music Bar in the center */}
        <div className="music-bar">
          <div className="music-search">
            <input
              type="text"
              value={musicQuery}
              onChange={(e) => setMusicQuery(e.target.value)}
              placeholder="Search for music..."
            />
            <button onClick={handleSearch}>Search</button>
            {/* Display search results */}
            {searchResults.length > 0 && (
              <select
                value={globalVariable}
                onChange={choosesong}
                className="music-search-results"
              >
                {searchResults.map((track, index) => (
                  <option value={track.uri} key={index}>
                    {track.name} - {track.artist}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Spotify Player */}
          <div className="song_controler">
            {globalVariable && (
              <div className="spotify-player-wrapper">
                <SpotifyPlayer
                  uri={globalVariable}
                  size={{ width: "100%", height: "100%" }}
                  view={"coverart"}
                  theme={"black"}
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
            <button onClick={() => setIsAboutModalOpen(true)}>About</button>
          </div>
      </nav>

      {/* Sign-In Modal */}
      {isSignInModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isRegistered ? "Sign In" : "Register"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                isRegistered ? handleSignIn() : handleRegister();
              }}
            >
              {!isRegistered && (
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button type="submit">
                {isRegistered ? "Sign In" : "Register"}
              </button>
            </form>
            <button
              className="toggle-button"
              onClick={() => setIsRegistered(!isRegistered)}
            >
              {isRegistered ? "Create an account" : "Already have an account?"}
            </button>
            <button
              className="close-button"
              onClick={() => setIsSignInModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* About Modal */}
      {isAboutModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>About</h2>
            <p>This search engine was designed and developed by Ahmad Ghuzlan and Thamer Ghuzlan as part of their Master’s degree
               capstone project in Computer Science at North American University.<br />
               The platform combines cutting-edge technology with a user-friendly interface to deliver a unique search experience.
               It utilizes the SERP API for handling search queries, providing real-time and accurate results, and integrates the Spotify API to 
               enable users to search for and play music directly within the search engine.<br />
               The design emphasizes responsiveness and simplicity, featuring intuitive navigation and personalized modals for sign-in, registration. 
               This project demonstrates Ahmad and Thamer's expertise in web development, API integration, 
              and interface design, reflecting their commitment to innovation and excellence in the field of computer science.</p>
            <button onClick={() => setIsAboutModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
