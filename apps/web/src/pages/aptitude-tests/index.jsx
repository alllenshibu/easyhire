import Layout from "@/Layouts/Layout";
import QuizCreatorV2 from "@/components/QuizCreator";
import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { useAuth } from "@/contexts/authContext";

const index = () => {
  const {get}= useFetch();
  const {token} =useAuth();
  const {data, error, loading} = useFetch("/api/aptitude-tests", token);
  

  return (
    <Layout>
      <QuizCreatorV2 />
    </Layout>
  );
};

export default index;
