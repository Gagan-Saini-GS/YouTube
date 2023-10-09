import { useContext, useEffect, useState } from "react";
import "./Videos.css";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../config";
import ThemeContext from "../../Context/ThemeContext";
import SearchContext from "../../Context/SearchContext";
import VideoCard from "../VideoCard/VideoCard";
import SidebarContext from "../../Context/SidebarContext";

const Videos = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [allIds, setAllIds] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");

  const { theme } = useContext(ThemeContext);
  const { searchText } = useContext(SearchContext);
  const { sideBarVisiable } = useContext(SidebarContext);

  const getVideos = async (showMore) => {
    const query = searchText;
    const arr = [];

    try {
      const res = await axios.get(
        `${BASE_URL}search?maxResults=48&type=video&q=${query}&key=${API_KEY}&pageToken${nextPageToken}`
      );

      const data = res?.data?.items;
      setNextPageToken(res?.data?.nextPageToken);

      for (let i = 0; i < data.length; i++) {
        arr.push(data[i]?.id?.videoId);
      }

      if (showMore) setAllIds((prev) => [...prev, ...arr]);
      else setAllIds([...arr]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setNextPageToken("");
    getVideos(false);
  }, [searchText]);

  useEffect(() => {
    async function getVideoData(videoId) {
      const VIDEO_INFO_URL = `${BASE_URL}videos?key=${API_KEY}&id=${videoId}&part=snippet,statistics`;
      axios
        .get(VIDEO_INFO_URL)
        .then((res) => {
          const data = res?.data?.items?.[0];
          // console.log(data);

          setAllVideos((prev) => [...prev, data]);
        })
        .catch((err) => console.log(err));
    }

    Promise.all(allIds.map((videoId) => getVideoData(videoId)))
      .then((dataArray) => {
        // Filter out any null values (failed requests)
        const filteredData = dataArray.filter(
          (item) => item !== null && item !== undefined
        );
        setAllVideos(filteredData);
      })
      .catch((err) => console.log(err));
  }, [allIds]);

  return (
    <div
      className={`main-video-container ${
        theme === "light" ? "light-theme" : "dark-theme"
      } ${!sideBarVisiable && "w-full"}`}
    >
      <div className={`video-container`}>
        {allVideos?.map((video) => {
          return <VideoCard video={video} key={video?.id} />;
        })}
      </div>

      <button
        onClick={() => {
          getVideos(true);
        }}
        className="show-more-btn"
      >
        Show More
      </button>
    </div>
  );
};

export default Videos;
