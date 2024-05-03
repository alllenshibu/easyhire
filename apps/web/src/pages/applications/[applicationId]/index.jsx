import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useAlert } from "@/hooks/useAlert";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ApplicationById() {
  const router = useRouter();
  const { applicationId } = router.query;

  const { get } = useFetch();
  const showAlert = useAlert();

  const [application, setApplication] = useState([]);

  useEffect(() => {
    if (!applicationId) return;
    const fetchApplication = async () => {
      try {
        const { data, status } = await get(
          `/applications/${applicationId}`,
          {}
        );
        if (status !== 200) {
          showAlert("Something went wrong", "Failed to fetch details");
        }
        setApplication(data?.application);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApplication();
  }, [applicationId]);

  return (
    <Layout>
      <div>{JSON.stringify(application)}</div>
    </Layout>
  );
}
