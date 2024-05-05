import Layout from "@/Layouts/Layout";
import { useAlert } from "@/hooks/useAlert";
import { useFetch } from "@/hooks/useFetch";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

import { DataGrid } from "@mui/x-data-grid";
import { MenuItem, Select } from "@mui/material";

export default function OpeningById() {
  const router = useRouter();
  const { openingId } = router.query;

  const { get } = useFetch();
  const showAlert = useAlert();
  const [opening, setOpening] = useState({
    applications: [],
  });

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
      
      
      <div className="col-span-2 p-4 w-full flex flex-row justify-between">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Role</h3>
            <p>{opening.role}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p>{opening.location}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Number of Applicants</h3>
            <p>{opening.applications.length}</p>
          </div>
        </div>
        <div>
          <Button
            type="submit"
            onClick={() => {
              router.push(`/admin/openings/${opening.id}/edit`);
            }}
          >
            Edit Listing
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">Applicants</h3>
        <DataGrid
          rows={opening.applications}
          columns={columns}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(params) => {
            console.log(params);
          }}
        />
      </div>
    </Layout>
  );
}
const StatusDropdown = ({ value, onChange }) => {
  const options = [
    { value: "PENDING", label: "Pending" },
    { value: "ACCEPTED", label: "Accepted" },
    { value: "REJECTED", label: "Rejected" },
  ];

  return (
    <Select>
      {options.map((option) => (
        <MenuItem value={option.value} key={option.value}>
          {option.value === value ? <b>{option.label}</b> : option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

const columns = [
  {
    field: "id",
    headerName: "User ID",
    width: 150,
    editable: true,
    valueGetter: (params) => params.row?.user?.id,
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 150,
    editable: true,
    valueGetter: (params) => params.row?.user?.firstName,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 150,
    editable: true,
    valueGetter: (params) => params.row?.user?.lastName,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: true,
    renderCell: (params) => {
      return (
        <StatusDropdown
          value={params.row.status}
          onChange={(value) => {
            console.log(value);
            
          }}
        />
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
    valueGetter: (params) => params.row?.user?.email,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
    editable: true,
    valueGetter: (params) => params.row?.user?.phone,
  },
];


function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      
      <Modal open={open} onClose={handleClose}>
        <div className="bg-white p-4 w-96">
          <h1>Modal</h1>
          <p>Modal content</p>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </Modal>
    </div>
  );
}