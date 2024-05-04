import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HireDashboard() {
  const router = useRouter();
  const { get } = useFetch();

  useEffect(() => {}, []);

  return (
    <Layout>
      <h1>Hire Dashboard</h1>
    </Layout>
  );
}
