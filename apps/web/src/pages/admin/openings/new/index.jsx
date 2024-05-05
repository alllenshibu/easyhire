// Importing necessary packages and components
import Layout from "@/Layouts/Layout";
import { useAlert } from "@/hooks/useAlert";
import { useFetch } from "@/hooks/useFetch";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditOpening() {
  const router = useRouter();
  const { openingId } = router.query;

  const { get, put } = useFetch();
  const showAlert = useAlert();

  // State variables for managing opening data, and new requirement and responsibility
  const [opening, setOpening] = useState({
    applications: [],
    responsibilities: [],
    requirements: [],
    company: {},
  });

  const [newRequirement, setNewRequirement] = useState("");
  const [newResponsibility, setNewResponsibility] = useState("");

  // Handler function for editing the opening
  const editOpening = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await put(
        `/openings/${opening.id}`,
        {},
        {
          role: opening.role,
          company: opening.company,
          location: opening.location,
          description: opening.description,
          responsibilities: opening.responsibilities,
          requirements: opening.requirements,
          remuneration: opening.remuneration,
        }
      );

      if (status === 200) {
        router.push(`/admin/openings/${opening.id}`);
      } else {
        showAlert("Failed to apply");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetching opening details when openingId changes
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

  // Function to add a requirement, avoiding empty or duplicate entries
  const handleAddRequirement = () => {
    if (newRequirement.trim() === "") {
      // Do not add empty requirement
      return;
    }

    const lowerCaseNewRequirement = newRequirement.toLowerCase();

    if (
      !opening.requirements.some(
        (requirement) => requirement.toLowerCase() === lowerCaseNewRequirement
      )
    ) {
      // Add the new requirement if it is not a duplicate
      setOpening((prevOpening) => ({
        ...prevOpening,
        requirements: [...prevOpening.requirements, newRequirement],
      }));
    }
    // Reset the input field after adding
    setNewRequirement("");
  };

  // Function to add a responsibility, avoiding empty or duplicate entries
  const handleAddResponsibility = () => {
    if (newResponsibility.trim() === "") {
      // Do not add empty responsibility
      return;
    }

    const lowerCaseNewResponsibility = newResponsibility.toLowerCase();

    if (
      !opening.responsibilities.some(
        (responsibility) =>
          responsibility.toLowerCase() === lowerCaseNewResponsibility
      )
    ) {
      // Add the new responsibility if it is not a duplicate
      setOpening((prevOpening) => ({
        ...prevOpening,
        responsibilities: [...prevOpening.responsibilities, newResponsibility],
      }));
    }
    // Reset the input field after adding
    setNewResponsibility("");
  };

  // Function to remove a requirement based on its index
  const handleRemoveRequirement = (index) => {
    setOpening((prevOpening) => ({
      ...prevOpening,
      requirements: prevOpening.requirements.filter(
        (_, reqIndex) => reqIndex !== index
      ),
    }));
  };

  // Function to remove a responsibility based on its index
  const handleRemoveResponsibility = (index) => {
    setOpening((prevOpening) => ({
      ...prevOpening,
      responsibilities: prevOpening.responsibilities.filter(
        (_, resIndex) => resIndex !== index
      ),
    }));
  };

  return (
    <Layout>
      <div className="col-span-2 p-4">
        <form onSubmit={editOpening} className="space-y-4">
          {/* Existing input fields */}
          <div>
            <h3 className="text-xl font-bold mb-2">Role</h3>
            <Input
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-black shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="Role"
              type="text"
              value={opening.role}
              onChange={(e) => setOpening({ ...opening, role: e.target.value })}
            />
          </div>

          {/* Company input */}
          <div>
            <h3 className="text-xl font-bold mb-2">Company</h3>
            <Input
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-black shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="Company"
              type="text"
              value={opening.company?.name || ""}
              onChange={(e) =>
                setOpening({
                  ...opening,
                  company: { ...opening.company, name: e.target.value },
                })
              }
            />
          </div>

          {/* Location input */}
          <div>
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <Input
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-black shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="Location"
              type="text"
              value={opening.location}
              onChange={(e) =>
                setOpening({ ...opening, location: e.target.value })
              }
            />
          </div>

          {/* Description input */}
          <div>
            <h3 className="text-xl font-bold mb-2">Description</h3>
            <Input
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-black shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="Description"
              type="text"
              value={opening.description}
              onChange={(e) =>
                setOpening({ ...opening, description: e.target.value })
              }
            />
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Requirements</h3>
            <div className="flex items-center mb-2">
              <Input
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-black shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                placeholder="Add a requirement"
                type="text"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
              />
              <Button
                className="ml-2"
                type="button"
                onClick={handleAddRequirement}
              >
                Add
              </Button>
            </div>
            <ul>
              {opening.requirements.map((requirement, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-1"
                >
                  <span>{requirement}</span>
                  <Button
                    className="ml-2"
                    type="button"
                    onClick={() => handleRemoveRequirement(index)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Responsibilities input */}
          <div>
            <h3 className="text-xl font-bold mb-2">Responsibilities</h3>
            <div className="flex items-center mb-2">
              <Input
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-black shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                placeholder="Add a responsibility"
                type="text"
                value={newResponsibility}
                onChange={(e) => setNewResponsibility(e.target.value)}
              />
              <Button
                className="ml-2"
                type="button"
                onClick={handleAddResponsibility}
              >
                Add
              </Button>
            </div>
            <ul>
              {opening.responsibilities.map((responsibility, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-1"
                >
                  <span>{responsibility}</span>
                  <Button
                    className="ml-2"
                    type="button"
                    onClick={() => handleRemoveResponsibility(index)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Pay input */}
          <div>
            <h3 className="text-xl font-bold mb-2">Pay</h3>
            <Input
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-black shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="Pay"
              type="text"
              value={opening.remuneration}
              onChange={(e) =>
                setOpening({ ...opening, remuneration: e.target.value })
              }
            />
          </div>

          {/* Submit button */}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Layout>
  );
}
