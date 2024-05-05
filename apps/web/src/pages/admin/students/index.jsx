import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function Students() {
  const router = useRouter();
  const { get } = useFetch();

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data, status } = await get(`/students`, {});
        setStudents(data?.students);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <DataGrid
          rows={students}
          columns={columns}
          disableRowSelectionOnClick
        />
      </Box>
    </Layout>
  );
}

const columns = [
  {
    field: "firstName",
    headerName: "First Name",
    width: 200,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 200,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 200,
    editable: true,
  },
];
