import Layout from "@/Layouts/Layout";
import QuizCreatorV2 from "@/components/QuizCreator";
import React, { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useAuth } from "@/contexts/authContext";

const index = () => {
  const { get } = useFetch();
  const { token } = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await get("/tests", {}, token);
        if (response.status !== 200) {
          throw new Error("Failed to fetch tests");
        }
        setData(response.data.tests);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching tests");
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  return (
    <Layout>
      {data.map((test) => (
        <div key={test.id}>
          <h1>{test.name}</h1>
          <p>{test.description}</p>
        </div>
      ))}

      
    </Layout>
  );
};

export default index;
