import { useNavigate } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const openVideo = () => {
    navigate(`/video/${video.id}`, { state: { video: video } });
  };

  return (
    <div className="video-item" onClick={openVideo}>
      <img
        src={video?.snippet?.thumbnails?.high?.url}
        alt=""
        className="thumbnail"
      />
      <div className="title">
        <p>{video?.snippet?.channelTitle}</p>
        <p>{video?.snippet?.title}</p>
      </div>
    </div>
  );
};

export default VideoCard;
