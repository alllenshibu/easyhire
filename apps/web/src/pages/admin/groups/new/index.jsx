import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NewGroup() {
  const router = useRouter();
  const { post } = useFetch();

  const [name, setName] = useState("");

  const createNewGroup = async () => {
    try {
      const { data, status } = await post(
        `/groups`,
        {},
        {
          name,
        }
      );
      setGroups(data?.groups);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <input
        type="text"
        placeholder="Group Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={createNewGroup}>Create</button>
    </Layout>
  );
}
