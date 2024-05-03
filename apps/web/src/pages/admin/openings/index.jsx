import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Openings() {
  const router = useRouter();
  const { get } = useFetch();

  const [openings, setOpenings] = useState([]);

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const { data, status } = await get(`/openings`, {});
        if (status !== 200) {
          throw new Error("Failed to fetch openings");
        }
        setOpenings(data?.openings);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOpenings();
  }, []);

  return (
    <Layout>
      <div>
        {openings.map((opening) => {
          return (
            <div
              key={opening.id}
              onClick={() => {
                router.push(`/admin/openings/${opening.id}`);
              }}
            >
              {JSON.stringify(opening)}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
