import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardDescription, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function Applications() {
    const router = useRouter();
    const { get } = useFetch();

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const { data, status } = await get(`/applications`, {});
                if (status !== 200) {
                    throw new Error("Failed to fetch applications");
                }
                setApplications(data?.applications);
            } catch (err) {
                console.error(err);
            }
        };
        fetchApplications();
    }, []);

    return (
        <Layout>
            <header className="bg-gray-900 text-white py-4 px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold">My Job Applications</h1>
                </div>
            </header>
            <main className="container mx-auto py-8 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications.map((application) => (
                        <Card key={application.id} onClick={() => router.push(`/applications/${application.id}`)}>
                            <CardHeader>
                                <CardTitle>{application.opening.role}</CardTitle>
                                <CardDescription>{application.opening.company.name}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500">Location</p>
                                        <p>{application.opening.location}</p>
                                    </div>
                                    {/* Display the application status using a Badge */}
                                    <Badge variant={getBadgeVariant(application.status)}>
                                        {application.status}
                                    </Badge>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button size="sm" variant="outline" onClick={() => router.push(`/applications/${application.id}`)}>
                                    View Application
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </Layout>
    );
}

// Helper function to determine badge variant based on application status
function getBadgeVariant(status) {
    switch (status) {
        case 'pending':
            return 'warning';
        case 'accepted':
            return 'success';
        case 'rejected':
            return 'danger';
        default:
            return 'neutral'; // Default variant
    }
}
