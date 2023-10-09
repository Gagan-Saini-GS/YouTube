import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./VideoPage.css";
import Channel from "../Channel/Channel";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import changeNumberStrIntoString from "../../assets/Util/changeNumberStrIntoString";
import getPublishYear from "../../assets/Util/getPublishYear";
import ThemeContext from "../../Context/ThemeContext";
import HistoryContext from "../../Context/HistoryContext";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../config";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import UserImg from "../../assets/images/userprofileimage.jpg";

const VideoPlayer = ({ videoId }) => {
  // Initialize a property to hold the player instance
  let player = null;

  // This function will be called when the YouTube API is ready
  const onYouTubeIframeAPIReady = () => {
    player = new window.YT.Player("player", {
      videoId: videoId,
    });
  };

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Ensure that the onYouTubeIframeAPIReady function is defined globally
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    onYouTubeIframeAPIReady();

    // Clean up the player instance when the component unmounts
    return () => {
      if (player) player.destroy();
    };
  }, [player]);

  return <div id="player"></div>;
};

const VideoDescription = ({ description }) => {
  const [showDesc, setShowDesc] = useState(false);

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split the description into parts: URLs and text lines
  const parts = description.split(urlRegex);

  // Replace URLs with clickable links and add text lines
  const formattedDescriptionWithLinks = parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    } else {
      const lines = part.split("\n");
      const formattedDescription = lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));

      return <span key={index}>{formattedDescription}</span>;
    }
  });

  return (
    <div className="description-container">
      <div
        onClick={() => setShowDesc((prev) => !prev)}
        className="desc-heading"
      >
        <span>Description</span>
        <span>{showDesc ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
      </div>
      {showDesc && (
        <div className="show-desc">{formattedDescriptionWithLinks}</div>
      )}
    </div>
  );
};

const CommentCard = ({ comment }) => {
  const commentHTML = (
    <div>{comment?.snippet?.topLevelComment?.snippet?.textDisplay}</div>
  );

  return (
    <div className="comment-card-container">
      <div className="c-profileImg-container">
        <img
          src={
            comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl ||
            UserImg
          }
          alt="USER_IMG"
        />
      </div>
      <div className="c-info-container">
        <div className="comment-author-name">
          {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
        </div>
        <div
          className="comment-text"
          dangerouslySetInnerHTML={{
            __html: commentHTML.props.children,
          }}
        ></div>
      </div>
    </div>
  );
};

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const url = `${BASE_URL}commentThreads?key=${API_KEY}&videoId=${videoId}&part=snippet`;
    axios
      .get(url)
      .then((res) => {
        console.log(res?.data?.items);
        setComments(res?.data?.items);
      })
      .catch((err) => console.log(err));
  }, [videoId]);

  return (
    <div className="comment-container">
      <div className="comment-heading">Comments</div>
      <div className="comment-section">
        {comments?.map((comment) => {
          return <CommentCard comment={comment} key={comment?.id} />;
        })}
      </div>
    </div>
  );
};

const VideoPage = () => {
  const location = useLocation();
  const video = location?.state?.video;
  // console.log(video);

  const { theme } = useContext(ThemeContext);
  const { setHistory } = useContext(HistoryContext);

  const publishedTime = getPublishYear(video?.snippet?.publishedAt);

  useEffect(() => {
    setHistory((prev) => [...prev, video]);
  }, []);

  const getRelatedVideos = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}search?key=${API_KEY}&part=snippet&type=video&relatedToVideoId=${video?.id}`
      );

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`video-page-container ${
        theme === "light" ? "light-theme" : "dark-theme"
      }`}
    >
      <div className="video-detail-container">
        <VideoPlayer videoId={video?.id} />
        <div className="title-container">{video?.snippet?.title}</div>
        <div className="video-info-container">
          <Channel channelId={video?.snippet?.channelId} />
          <div className="statistics-container">
            <div className="statistics-item">
              {changeNumberStrIntoString(video?.statistics?.viewCount)} views
            </div>
            <div className="statistics-item">{publishedTime}</div>
            <div className="statistics-item like-container">
              <ThumbUpOutlinedIcon />
              <div className="like-count">
                {changeNumberStrIntoString(video?.statistics?.likeCount)}
              </div>
              <ThumbDownAltOutlinedIcon />
            </div>
          </div>
        </div>
        <VideoDescription description={video?.snippet?.description} />
        <CommentSection videoId={video?.id} />
      </div>
      <div className="related-video-container">
        <div className="related-heading">Related Videos</div>
        <button onClick={getRelatedVideos}>Get Related Videos</button>
      </div>
    </div>
  );
};

export default VideoPage;
