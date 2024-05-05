import * as React from 'react';
import Box from '@mui/material/Box';
import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { styled } from '@mui/system';

// Use styled from @mui/system for styling
const StyledBox = styled(Box)(({ theme }) => ({
  height: 520,
  width: '100%',
  // Additional styles here
}));

export default function GroupById() {
  const router = useRouter();
  const { groupId } = router.query;

  const { get } = useFetch();

  const [group, setGroup] = useState({ members: [] });
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    if (!groupId) return;

    const fetchGroup = async () => {
      try {
        const { data } = await get(`/groups/${groupId}`);
        setGroup(data?.group);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGroup();
  }, [groupId]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First Name', width: 150, editable: true },
    { field: 'lastName', headerName: 'Last Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 180, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
  ];

  return (
    <Layout>
      <h1>{group.name}</h1>
      <h1>Adding members pending</h1>
      <StyledBox>
        <DataGridPro
          rows={group.members}
          columns={columns}
          rowHeight={38}
          checkboxSelection
          disableRowSelectionOnClick
          selectionModel={selectedStudents}
          onSelectionModelChange={setSelectedStudents}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </StyledBox>
    </Layout>
  );
}
