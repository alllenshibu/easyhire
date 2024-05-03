import { useEffect, useState } from "react";

import axios from "axios";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);

  const get = async (endpoint = "", headers = {}) => {
    setLoading(true);
    try {
      const token = window.localStorage.getItem("token");

      const { data, status } = await axios.get(
        process.env.NEXT_PUBLIC_SERVER_API + endpoint,
        {
          headers: {
            ...headers,
            Authorization: "Bearer " + token,
          },
          validateStatus: () => true,
        }
      );

      setLoading(false);

      return { data, status };
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  };

  const post = async (endpoint = "", headers = {}, body = {}) => {
    setLoading(true);
    try {
      const token = window.localStorage.getItem("token");

      const { data, status } = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_API + endpoint,
        body,
        {
          headers: {
            ...headers,
            contentType: "application/json",
            Authorization: "Bearer " + token,
          },
          validateStatus: () => true,
        }
      );

      setLoading(false);

      return { data, status };
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  };

  const put = async (endpoint = "", headers = {}, body = {}) => {
    setLoading(true);
    try {
      const token = window.localStorage.getItem("token");

      const { data, status } = await axios.put(
        process.env.NEXT_PUBLIC_SERVER_API + endpoint,
        body,
        {
          headers: {
            ...headers,
            contentType: "application/json",
            Authorization: "Bearer " + token,
          },
          validateStatus: () => true,
        }
      );

      setLoading(false);

      return { data, status };
    } catch (err) {
      console.error(err);
      setLoading(false);
      return null;
    }
  };

  return { loading, get, post, put };
};
