import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";

export default function index() {
  const { get } = useFetch();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data, status } = await get("/user", {});
        if (status !== 200) {
          throw new Error("Failed to fetch user details");
        }
        setUser(data?.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <Layout>
      <div>{JSON.stringify(user)}</div>
      <h1>Editing option venam</h1>
    </Layout>
  );
}
