import { useContext } from "react";
import HistoryContext from "../../Context/HistoryContext";
import "./History.css";
import VideoCard from "../VideoCard/VideoCard";

const History = () => {
  const { history } = useContext(HistoryContext);
  // console.log(history);

  return (
    <>
      <div className="history-heading">History</div>
      <div className="history-video-container">
        {history.map((video) => {
          return <VideoCard key={video?.id} video={video} />;
        })}
      </div>
    </>
  );
};

export default History;
