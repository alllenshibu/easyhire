import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CardContent, Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Room, Work } from "@mui/icons-material";
export default function AdminDashboard() {
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
      <h1>Admin Dashboard</h1>
      <div className="grid gap-6 w-full max-w-sm sm:max-w-md lg:max-w-4xl xl:max-w-5xl mx-auto grid-cols-1 md:grid-cols-2 items-start">
        {groups &&
          groups.map((group) => {
            return <GroupCard key={group.id} name={group.name} id={group.id} />;
          })}
      </div>
    </Layout>
  );
}

function GroupCard({ name, numberofQuestions, id }) {
  const router = useRouter();
  return (
    <Card>
      <CardContent className="flex flex-col pt-6">
        <div className="flex flex-row items-center gap-2">
          <Work className="w-6 h-6 text-gray-500 " />
          <h3 className="text-lg font-medium leading-none">{name}</h3>
        </div>
        <p className="text-sm text-gray-500 ">67 students</p>

        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            router.push(`/admin/groups/${id}`);
          }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
