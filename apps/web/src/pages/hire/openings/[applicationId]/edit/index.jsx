import Layout from "@/Layouts/Layout";
import { useAlert } from "@/hooks/useAlert";
import { useFetch } from "@/hooks/useFetch";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataGrid } from "@mui/x-data-grid";

export default function EditOpening() {
  const router = useRouter();
  const { openingId } = router.query;

  const { get, put } = useFetch();
  const showAlert = useAlert();
  const [opening, setOpening] = useState({
    applications: [],
    responsibilities: [],
    requirements: [],
    company: {},
  });

  const editOpening = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await put(
        `/openings/${opening.id}`,
        {},
        {
          role: opening.role,
          location: opening.location,
          description: opening.description,
          responsibilities: opening.responsibilities,
          requirements: opening.requirements,
          remuneration: opening.remuneration,
        }
      );

      console.log(data);
      if (status === 200) {
        router.push(`/admin/openings/${opening.id}`);
      } else {
        showAlert("Failed to apply");
      }
    } catch (err) {
      console.error(err);
    }
  };

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
      <div className="col-span-2 p-4">
        <form className="space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Role</h3>
            <Input
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-black shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900  "
              placeholder="Role"
              type="text"
              value={opening.role}
              onChange={(e) => setOpening({ ...opening, role: e.target.value })}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Company</h3>
            <Input
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-black shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900  "
              placeholder="Role"
              type="text"
              value={opening.company.name}
              onChange={(e) => setOpening({ ...opening, role: e.target.value })}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <Input
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-black shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900  "
              placeholder="Role"
              type="text"
              value={opening.location}
              onChange={(e) => setOpening({ ...opening, role: e.target.value })}
            />{" "}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Description</h3>
            <Input
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-black shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900  "
              placeholder="Role"
              type="text"
              value={opening.description}
              onChange={(e) => setOpening({ ...opening, role: e.target.value })}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Responsibilites</h3>
            <ul>
              {opening.responsibilities.map((responsibility, index) => (
                <li key={index} className="mr-2">
                  {responsibility}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Requirements</h3>
            <ul>
              {opening.requirements.map((requirement, index) => (
                <li key={index} className="mr-2">
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Pay</h3>
            <Input
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-black shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900  "
              placeholder="Role"
              type="text"
              value={opening.remuneration}
              onChange={(e) => setOpening({ ...opening, role: e.target.value })}
            />
          </div>
          <Button type="submit" onclick={editOpening}>
            Submit
          </Button>
        </form>
      </div>
    </Layout>
  );
}

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
