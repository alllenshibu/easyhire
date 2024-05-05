import Layout from "@/Layouts/Layout";
import { Notifications } from "@/components/component/Notifications";
import { useAlert } from "@/hooks/useAlert";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";

const index = () => {
  const { loading, get } = useFetch();
  const showAlert = useAlert();

  const [notifications, setNotifications] = useState({});

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, status } = await get("/notifications");
      if (status !== 200) {
        showAlert({
          title: "Failure",
          type: "foreground",
          description: "oops",
          variant: "failure",
        });
      }

      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <Layout>
      <Notifications notifications={notifications} />
    </Layout>
  );
};

export default index;
