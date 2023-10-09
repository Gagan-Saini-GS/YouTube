import React, { useContext } from "react";
import "./SubscriptionPage.css";
import SubscriberContext from "../../Context/SubscriberContext";
import changeNumberStrIntoString from "../../assets/Util/changeNumberStrIntoString";

const SubscribeCard = ({ channel }) => {
  const subCount = changeNumberStrIntoString(
    channel?.statistics?.subscriberCount
  );

  const videoCount = changeNumberStrIntoString(channel?.statistics?.videoCount);

  return (
    <div className="sub-card-container">
      <div className="sub-card-img-container">
        <img src={channel?.logo} alt="Channel_Logo" />
      </div>
      <div className="sub-card-info-container">
        <div className="sci-item channel-name">{channel?.name}</div>
        <div className="sci-item">Subscribers {subCount}</div>
        <div className="sci-item">Videos {videoCount}</div>
        <div className="sci-item description">
          {channel?.description && channel?.description?.slice(0, 100) + "..."}
        </div>
      </div>
    </div>
  );
};

const SubscriptionPage = () => {
  const { subscriptions } = useContext(SubscriberContext);

  return (
    <>
      <h2 className="sub-page-heading">Subscribed Channels</h2>
      <div className="sub-page-container">
        {subscriptions?.map(({ channel, id }) => {
          return <SubscribeCard key={id} channel={channel} />;
        })}
      </div>
    </>
  );
};

export default SubscriptionPage;
