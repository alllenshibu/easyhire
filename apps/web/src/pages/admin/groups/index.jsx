import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Groups() {
  const router = useRouter();
  const { get } = useFetch();

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const { data, status } = await get(`/groups`, {});
        setGroups(data?.groups);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGroups();
  }, []);

  return (
    <Layout>
      <h1>Groups</h1>
      <div>
        {groups.map((group) => {
          return (
            <div
              key={group.id}
              onClick={() => {
                router.push(`/admin/groups/${group.id}`);
              }}
            >
              {group.name}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
