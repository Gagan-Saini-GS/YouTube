import Sidebar from "../Sidebar/Sidebar";
import Videos from "../Videos/Videos";
import ThemeContext from "../../Context/ThemeContext";
import "./App.css";
import { useContext } from "react";
import SidebarContext from "../../Context/SidebarContext";

function App() {
  const { theme } = useContext(ThemeContext);
  const { sideBarVisiable } = useContext(SidebarContext);

  return (
    <div
      className={`main-container ${
        theme === "light" ? "light-theme" : "dark-theme"
      }`}
    >
      {sideBarVisiable && <Sidebar />}
      <Videos />
    </div>
  );
}

export default App;
