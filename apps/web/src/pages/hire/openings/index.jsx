import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import { Button } from "@/components/ui/button";

export default function Openings() {
  const router = useRouter();
  const { get } = useFetch();

  const [openingDetails, setOpeningDetails] = useState({
    role: "",
    description: "",
    responsibilities: [],
    requirements: [],
    location: "",
    company: {
      name: "",
    },
  });
  const [openings, setOpenings] = useState([]);

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const { data, status } = await get(`/hire/openings`, {});
        if (status !== 200) {
          throw new Error("Failed to fetch openings");
        }
        setOpenings(data?.openings);
        setOpeningDetails(data?.openings[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOpenings();
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
          rows={openings}
          columns={columns}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          onRowClick={(params) => {
            setOpeningDetails(params.row);
          }}
        />

        <div className="col-span-2 p-4 w-6/12">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Role</h3>
              <p>{openingDetails.role}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p>{openingDetails.location}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Description</h3>
              <p>{openingDetails.description}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Number of Applicants</h3>
              <p>{openingDetails.applications?.length}</p>
            </div>
            <div>
              <Button
                className="w-full"
                type="submit"
                onClick={() => {
                  router.push(`/admin/openings/${openingDetails.id}`);
                }}
              >
                Details
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Layout>
  );
}

const columns = [
  {
    field: "role",
    headerName: "Role",
    width: 200,
    editable: true,
  },
  {
    field: "name",
    headerName: "Role",
    width: 200,
    editable: true,

    valueGetter: (params) => params.row?.company?.name,
  },
  {
    field: "location",
    headerName: "Location",
    width: 200,
    editable: true,
  },
];
