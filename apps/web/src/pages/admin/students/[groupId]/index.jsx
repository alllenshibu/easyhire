import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

export default function GroupById() {
  const router = useRouter();
  const { groupId } = router.query;

  const { get, post } = useFetch();

  const [group, setGroup] = useState({
    members: [],
  });
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

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
      <h1>Adding members pending</h1>
      {JSON.stringify(selectedStudents)}
      <DataGrid
        rows={group.members}
        columns={columns}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Layout>
  );
}

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
    editable: true,
  },
];
