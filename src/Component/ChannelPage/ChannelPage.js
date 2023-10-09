import React, { useEffect } from "react";
import "./ChannelPage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../config";

const ChannelPage = () => {
  const { channelId } = useParams();

  const getChannelData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`
      );
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChannelData();
  }, []);

  return <div>{channelId}</div>;
};

export default ChannelPage;
