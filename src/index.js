import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Component/App/App";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import VideoPage from "./Component/VideoPage/VideoPage";
import Navbar from "./Component/Navbar/Navbar";
import ThemeContext from "./Context/ThemeContext";
import SearchContext from "./Context/SearchContext";
import HistoryContext from "./Context/HistoryContext";
import History from "./Component/History/History";
import SubscriberContext from "./Context/SubscriberContext";
import axios from "axios";
import { SERVER_URL } from "./config";
import SubscriptionPage from "./Component/Subscriptions/SubscriptionPage";
import SidebarContext from "./Context/SidebarContext";
import ChannelPage from "./Component/ChannelPage/ChannelPage";

const AppLayout = () => {
  const [theme, setTheme] = useState("dark");
  const [history, setHistory] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sideBarVisiable, setSideBarVisiable] = useState(true);

  useEffect(() => {
    const getAllSubscriptions = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/subscriptions`);
        setSubscriptions(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllSubscriptions();
  }, []);

  return (
    <div className={`${theme === "light" ? "light-theme" : "dark-theme"}`}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <SidebarContext.Provider
          value={{ sideBarVisiable, setSideBarVisiable }}
        >
          <HistoryContext.Provider value={{ history, setHistory }}>
            <SubscriberContext.Provider
              value={{ subscriptions, setSubscriptions }}
            >
              <SearchContext.Provider value={{ searchText, setSearchText }}>
                <Navbar />
                <Outlet />
              </SearchContext.Provider>
            </SubscriberContext.Provider>
          </HistoryContext.Provider>
        </SidebarContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/home",
        element: <App />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/subscriptions",
        element: <SubscriptionPage />,
      },
      {
        path: "/library",
        element: <div>Library</div>,
      },
      {
        path: "/watch-later",
        element: <div>Watch Later</div>,
      },
      {
        path: "/liked-videos",
        element: <div>Liked Videos</div>,
      },
      {
        path: "/video/:videoId",
        element: <VideoPage />,
      },
      {
        path: "/channel/:channelId",
        element: <ChannelPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
