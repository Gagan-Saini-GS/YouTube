import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import userImage from "../../assets/images/gagan.jpg";
import { useContext, useState } from "react";
import { Avatar } from "@mui/material";
import "./Navbar.css";
import ThemeContext from "../../Context/ThemeContext";
import SearchContext from "../../Context/SearchContext";
import { useNavigate } from "react-router-dom";
import SidebarContext from "../../Context/SidebarContext";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("");
  const { setSearchText } = useContext(SearchContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { setSideBarVisiable } = useContext(SidebarContext);
  const navigate = useNavigate();

  const search = () => {
    setSearchText(inputValue);
  };

  const toggleSideBar = () => {
    setSideBarVisiable((prev) => !prev);
  };

  return (
    <div
      className={`navbar-container ${
        theme === "light" ? "light-theme" : "dark-theme"
      }`}
    >
      <div className="logo-section">
        <span onClick={toggleSideBar}>
          <MenuIcon />
        </span>
        <p
          className="youtube-name"
          onClick={() => {
            navigate("/");
          }}
        >
          YouTube
        </p>
      </div>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search"
          className={`${theme === "light" ? "light-theme" : "dark-theme"}`}
          spellCheck={false}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") search();
          }}
        />
        <div onClick={search}>
          <SearchIcon />
        </div>
      </div>
      <div className="menu-section">
        <div
          className="menu-item"
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </div>
        <div className="menu-item">
          <VideoCallIcon />
        </div>
        <div className="menu-item">
          <NotificationsIcon />
        </div>
        <div className="menu-item">
          <Avatar src={userImage} alt="GS" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
