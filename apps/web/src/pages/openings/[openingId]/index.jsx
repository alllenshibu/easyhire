import Layout from "@/Layouts/Layout";
import { useAlert } from "@/hooks/useAlert";
import { useFetch } from "@/hooks/useFetch";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OpeningById() {
    const router = useRouter();
    const { openingId } = router.query;

    const { get, post } = useFetch();
    const showAlert = useAlert();
    const [opening, setOpening] = useState(null); // Opening state initialized as null

  const applyForOpening = async () => {
    try {
      const { data, status } = await post(
        `/applications`,
        {},
        {
          openingId,
        }
      );
      if (status === 200) {
        showAlert("Successfully applied");
      } else {
        showAlert({
          title: "Error",
          type: "foreground",
          description: "inserting course",
          variant: "destructive",
        });
      }
      console.log(data);
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
                    showAlert("Failed to fetch opening details", "error");
                    return;
                }
                setOpening(data?.opening);
            } catch (err) {
                console.error(err);
                showAlert("Failed to fetch opening details", "error");
            }
        };

        fetchOpening();
    }, [openingId, get, showAlert]);

    if (!opening) {
        return (
            <Layout>
                <div className="container mx-auto py-12 px-4 md:px-6">
                    <div className="text-center">Loading...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <header className="bg-gray-900 text-white py-6 px-4 md:px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            alt="Company Logo"
                            className="mr-4"
                            height={40}
                            src="/placeholder.svg"
                            style={{ aspectRatio: "40/40", objectFit: "cover" }}
                            width={40}
                        />
                        <div>
                            <h1 className="text-2xl font-bold">{opening.role}</h1>
                            <p className="text-gray-400">{opening.location}</p>
                        </div>
                    </div>
                </div>
            </header>
            <main className="container mx-auto py-12 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <h2 className="text-3xl font-bold mb-4">Job Description</h2>
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
                                <h3 className="text-xl font-bold mb-2">Description</h3>
                                <p>{opening.description}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Remuneration</h3>
                                <p>₹{opening.remuneration}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-100 rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Apply Now</h2>
                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault(); // Prevent form from submitting normally
                                applyForOpening();
                            }}
                        >
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    required
                                    type="text"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Enter your email"
                                    required
                                    type="email"
                                />
                            </div>
                            <div>
                                <Label htmlFor="resume">Resume</Label>
                                <Input id="resume" required type="file" />
                            </div>
                            <Button className="w-full" type="submit">
                                Submit Application
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
