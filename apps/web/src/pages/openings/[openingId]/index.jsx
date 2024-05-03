import Layout from "@/Layouts/Layout";
import { useAlert } from "@/hooks/useAlert";
import { useFetch } from "@/hooks/useFetch";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function OpeningById() {
  const router = useRouter();
  const { openingId } = router.query;

  const { get, post } = useFetch();
  const showAlert = useAlert();
  const [opening, setOpening] = useState([]);

  const applyForOpening = async () => {
    try {
      const { data, status } = await post(
        `/applications`,
        {},
        {
          openingId,
        }
      );
      if (status === 200) {
        showAlert("Successfully applied");
      } else {
        showAlert("Failed to apply");
      }
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!openingId) return;
    const fetchOpening = async () => {
      try {
        const { data, status } = await get(`/openings/${openingId}`, {});
        if (status !== 200) {
          showAlert("Something went wrong", "Failed to fetch details");
        }
        setOpening(data?.opening);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOpening();
  }, [openingId]);

  return (
    <Layout>
      <div>{JSON.stringify(opening)}</div>
      <button onClick={applyForOpening}>Apply</button>
    </Layout>
  );
}
