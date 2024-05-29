import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import theme from "./paint-roller.svg";
import pop from "./popcorn.png";
import YouTube from "react-youtube";
import GoTop from "./components/scrollToTop.jsx";
import { MOVIEDB_KEY } from "../.env";

function App() {
  const lightIcon =
    "M120,40V32a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-8-8A8,8,0,0,0,50.34,61.66Zm0,116.68-8,8a8,8,0,0,0,11.32,11.32l8-8a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l8-8a8,8,0,0,0-11.32-11.32l-8,8A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l8,8a8,8,0,0,0,11.32-11.32ZM40,120H32a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm88,88a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,128,208Zm96-88h-8a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Z";
  const darkIcon =
    "M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z";

  const [count, setCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(lightIcon);
  const [poster, setPoster] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer {MOVIEDB_KEY}",
      },
    };

    fetch("https://api.themoviedb.org/3/movie/popular", options)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setPoster("https://image.tmdb.org/t/p/original/" + data.results[0].poster_path);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  var movies = ["Bullet Train"];

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      fs: 0,
      mute: 1,
      loop: 1,
      playlist: "0IOsk2Vlc4o",
    },
  };

  const toggleResults = () => {
    setShowResults(showResults);
  };

  const handleInputChange = (event) => {
    //setSearchValue(event.target.value);
    // Show the dropdown only when there is text input
    setShowResults(event.target.value.trim().length > 0);
  };

  const toggleTheme = () => {
    if (!darkTheme) {
      document.documentElement.style.setProperty("--background-color", "#ffffff");
      document.documentElement.style.setProperty("--color", "#1f1f1f");
      setCurrentIcon(darkIcon);
    } else {
      document.documentElement.style.setProperty("--background-color", "#1f1f1f");
      document.documentElement.style.setProperty("--color", "rgba(255, 255, 255, 0.87)");
      setCurrentIcon(lightIcon);
    }
    setDarkTheme(!darkTheme);
  };

  return (
    <div className="root">
      <GoTop />
      <div className="boss">
        <div className={`results ${showResults ? "show" : "hide"}`}>
          <p>Hellol</p>
        </div>
        <div className="header">
          <div className="header sub start">
            <img className="logo" src={pop} alt="popcorn" />
            <h1 className="title">PopStream</h1>
          </div>
          <div className="header sub end">
            <div className="search">
              <input
                className={`searchbox ${showSearch ? "show" : "hide"}`}
                type="text"
                placeholder="Search..."
                onInput={handleInputChange}
              />
              <button className="classic searchbtn" onClick={toggleSearch}>
                Search
              </button>
            </div>
            <button className="themebtn" onClick={toggleTheme}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                className="themebtn-icon"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d={currentIcon}></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="trailerCover">
          <div className="top-bar"></div>
          <YouTube
            iframeClassName="youtubeContainer"
            className="trailer"
            videoId="0IOsk2Vlc4o"
            opts={opts}
          />
          <div className="bottom-bar"></div>
          <div className="gradient-overlay">
            <div className="polka">
              <div className="bmParent">
                <p className="bookmarkText">#1</p>
                <svg
                  className="bookmark"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="#ff6464"
                  viewBox="50 00 256 256"
                >
                  <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"></path>
                </svg>
              </div>
              <p className="heroTitle">Bullet Train</p>
              <p className="heroStuff">2h 6m • 2022</p>
              <p className="heroStuff">Cast: Brad Pitt, Joey King, Aaron Taylor-Johnson</p>
              <p className="summary">
                Ladybug, a professional assassin, is assigned to retrieve a briefcase from a bullet
                train. Soon, he finds himself battling many other killers who board the same train
                but with a different objective.
              </p>
              <div className="buttonRow">
                <button className="classic watch">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon dark"
                    width="24"
                    height="24"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
                  </svg>
                  <p className="caption dark">Watch</p>
                </button>
                <button className="classic info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    width="24"
                    height="24"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"></path>
                  </svg>
                  <p className="caption">More Info</p>
                </button>
              </div>
              <div className="polkaChild"></div>
            </div>
          </div>
        </div>
        <div className="slideTrack">
          <div className="slide">
            <div
              style={{
                backgroundImage: `url(${poster})`,
                backgroundPosition: "center",
              }}
            ></div>
          </div>
          <div className="slide"></div>
          <div className="slide"></div>
        </div>
        {/*movies.map((movie) => {
          return (
            <div>
              <p>{movie}</p>
            </div>
          );
        })*/}
      </div>
      <div className="footer">
        <p>Made with 💖 by</p>
        <a className="username" href="www.github.com/@mihirgrand">
          Mihir
        </a>
      </div>
    </div>
  );
}

export default App;
