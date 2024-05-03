import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useAlert } from "@/hooks/useAlert";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function GroupById() {
  const router = useRouter();
  const { groupId } = router.query;

  const { get, post } = useFetch();

  const [group, setGroup] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!groupId) return;
    const fetchGroup = async () => {
      try {
        const { data, status } = await get(`/groups/${groupId}`, {});

        setGroup(data?.group);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchStudents = async () => {
      try {
        const { data, status } = await get(`/students`, {});

        setStudents(data?.students);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGroup();
    fetchStudents();
  }, [groupId]);

  return (
    <Layout>
      <h1>{group.name}</h1>
      <div>{JSON.stringify(group)}</div>
      <div>{JSON.stringify(students)}</div>
      <h1>Adding members pending</h1>
    </Layout>
  );
}
