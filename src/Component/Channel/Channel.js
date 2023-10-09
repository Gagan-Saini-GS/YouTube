import { useContext, useEffect, useState } from "react";
import { API_KEY, BASE_URL, SERVER_URL } from "../../config";
import axios from "axios";
import "./Channel.css";
import changeNumberStrIntoString from "../../assets/Util/changeNumberStrIntoString";
import SubscriberContext from "../../Context/SubscriberContext";
import { useNavigate } from "react-router-dom";

const Channel = ({ channelId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [channel, setChannel] = useState("");
  const navigate = useNavigate();

  const { subscriptions } = useContext(SubscriberContext);

  useEffect(() => {
    // Calling Channel API to get channel data.
    const url = `${BASE_URL}channels?key=${API_KEY}&id=${channelId}&part=snippet,contentDetails,statistics`;

    axios
      .get(url)
      .then((res) => {
        console.log(res?.data?.items?.[0]);
        setChannel(res?.data?.items?.[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const subCount = changeNumberStrIntoString(
    channel?.statistics?.subscriberCount
  );

  useEffect(() => {
    subscriptions.forEach((sub) => {
      if (sub?.channel?.id === channelId) setIsSubscribed(true);
    });
  }, [subscriptions]);

  const addToSubsciptions = async () => {
    if (isSubscribed) return;

    try {
      axios.post(`${SERVER_URL}/subscriptions`, {
        headers: { "Content-Type": "application/json" },
        channel: {
          logo: channel?.snippet?.thumbnails?.high?.url,
          name: channel?.snippet?.title,
          id: channel?.id,
          description: channel?.snippet?.description,
          statistics: channel?.statistics,
        },
      });

      setIsSubscribed(true);
    } catch (error) {
      console.log(error);
    }
  };

  const openChannelPage = () => {
    navigate("/channel/" + channelId);
  };

  return (
    <div className="channel-container" onClick={openChannelPage}>
      <div className="channel-logo-container">
        <img src={channel?.snippet?.thumbnails?.high?.url} alt="Channel_Logo" />
      </div>
      <div className="channel-detail-container">
        <div className="channel-name">{channel?.snippet?.title}</div>
        <div className="channel-sub-count">{subCount} subscribers</div>
      </div>
      <div
        className={`subscribe-button ${isSubscribed && "subscribed"}`}
        onClick={addToSubsciptions}
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
      </div>
    </div>
  );
};

export default Channel;
