import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Applications() {
  const router = useRouter();
  const { get } = useFetch();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data, status } = await get(`/applications`, {});
        if (status !== 200) {
          throw new Error("Failed to fetch Applications");
        }
        setApplications(data?.applications);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApplications();
  }, []);

  return (
    <Layout>
      <div>
        {applications.map((application) => {
          return (
            <div
              key={application.id}
              onClick={() => {
                router.push(`/applications/${application.id}`);
              }}
            >
              {JSON.stringify(application)}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
