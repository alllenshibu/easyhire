import Layout from "@/Layouts/Layout";
import CompanyCard  from "@/components/CompanyCard";
import { useAuth } from "@/contexts/authContext";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect } from "react";

export default function index() {
  const [companies, setCompanies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { get } = useFetch();
  const { token } = useAuth();

  async function getCompanies() {
    try {
      const response = await get("/companies", token);
      if (response.status === 200) {
        setCompanies(response.data.companies);
        console.log(response);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getCompanies();
  }, []);
  return (
    <Layout>
      {companies?.map((company) => (
        <CompanyCard  company={company} />
      ))}
    </Layout>
  );
}
