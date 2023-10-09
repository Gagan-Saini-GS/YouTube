import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import "./Sidebar.css";
import { useContext } from "react";
import ThemeContext from "../../Context/ThemeContext";
import Subscriptions from "../Subscriptions/Subscriptions";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`sidebar-container ${
        theme === "light" ? "light-theme" : "dark-theme"
      }`}
    >
      <SidebarItem text={"Home"} path={"/home"} Icon={HomeIcon} />
      <SidebarItem
        text="Subscriptions"
        path="/subscriptions"
        Icon={SubscriptionsIcon}
      />
      <hr />
      <SidebarItem text="Library" path="/library" Icon={VideoLibraryIcon} />
      <SidebarItem text="History" path="/history" Icon={HistoryIcon} />
      <SidebarItem
        text="Watch Later"
        path="/watch-later"
        Icon={WatchLaterIcon}
      />
      <SidebarItem
        text="Liked Videos"
        path="/liked-videos"
        Icon={ThumbUpOffAltIcon}
      />
      <hr />
      <Subscriptions />
    </div>
  );
};

export default Sidebar;
