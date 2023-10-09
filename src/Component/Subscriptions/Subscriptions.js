import { useContext } from "react";
import SubscriberContext from "../../Context/SubscriberContext";
import "./Subscriptions.css";

const Subscriptions = () => {
  const { subscriptions } = useContext(SubscriberContext);

  return (
    <div className="subscription-container">
      <div className="sub-heading">Subscriptions</div>
      <div className="subscribed-channel-container">
        {subscriptions?.map(({ channel, id }) => {
          return (
            <div className="subscribed-channel" key={id}>
              <img src={channel?.logo} alt="Channel_Logo" />
              <div className="channel-name">
                {channel?.name?.length > 15 ? (
                  <>{channel?.name?.slice(0, 15)}...</>
                ) : (
                  <>{channel?.name}</>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subscriptions;
