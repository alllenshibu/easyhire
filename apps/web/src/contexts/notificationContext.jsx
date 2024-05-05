import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect } from "react";

const NotificationContext = createContext({});
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { get } = useFetch();
  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, status } = await get("/notifications");
      if (status !== 200) {
        console.log("Failed to fetch notifications");
      }
      setNotifications(data.openings);
      console.log("reafcher", data);
      setLoading(false);
    };
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, loading }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
