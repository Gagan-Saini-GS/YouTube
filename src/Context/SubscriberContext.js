import { createContext } from "react";

const SubscriberContext = createContext({
  subscriptions: [],
});

SubscriberContext.displayName = "SubscriberContext";

export default SubscriberContext;
