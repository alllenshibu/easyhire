import Layout from "@/Layouts/Layout";
import { useFetch } from "@/hooks/useFetch";
import { useAlert } from "@/hooks/useAlert";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ApplicationById() {
    const router = useRouter();
    const { applicationId } = router.query;

    const { get } = useFetch();
    const showAlert = useAlert();

    const [application, setApplication] = useState(null);

    useEffect(() => {
        if (!applicationId) return;
        const fetchApplication = async () => {
            try {
                const { data, status } = await get(`/applications/${applicationId}`, {});
                if (status !== 200) {
                    showAlert("Something went wrong", "Failed to fetch details");
                }
                setApplication(data?.application);
            } catch (err) {
                console.error(err);
            }
        };
        fetchApplication();
    }, [applicationId]);

    if (!application) {
        return (
            <Layout>
                <div className="container mx-auto py-12 px-4 md:px-6">
                    <div className="text-center">Loading...</div>
                </div>
            </Layout>
        );
    }

    const { opening } = application;

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Job Application Details
                    </h2>
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                            <DeleteIcon className="w-4 h-4 mr-2" />
                            Edit Application
                        </Button>
                        <Button size="sm" variant="outline">
                            <TrashIcon className="w-4 h-4 mr-2" />
                            Delete Application
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Display the opening details from the application data */}
                    <div className="col-span-1 md:col-span-2 bg-white shadow-md rounded-lg p-6">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-bold">
                                    {opening.role}
                                </CardTitle>
                                {/* Display the application status using a Badge */}
                                <Badge variant="secondary">
                                    {application.status}
                                </Badge>
                            </div>
                            <CardDescription className="text-gray-500">
                                {opening.company.name}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium">Location</h3>
                                <span className="text-gray-500">{opening.location}</span>
                            </div>
                            <div>
                                <h3 className="font-medium">Job Description</h3>
                                <p className="text-gray-600">
                                    {opening.description}
                                </p>
                            </div>
                            {/* Add additional sections if needed */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-500">
                                        Applied on {new Date(application.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ClockIcon className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-500">
                                        Application Status: {application.status}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">
                                Application Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-medium">Contact Information</h3>
                                {/* Placeholder for user details (e.g., name, email, phone) */}
                                <div className="text-gray-600">
                                    {/* Replace placeholders with actual user details */}
                                    <p>John Doe</p>
                                    <p>johndoe@email.com</p>
                                    <p>+1 (555) 555-5555</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium">Resume</h3>
                                <div className="flex items-center gap-2">
                                    <FileIcon className="w-5 h-5 text-gray-500" />
                                    {/* Placeholder for resume link */}
                                    <Link className="text-indigo-600 hover:underline" href="#">
                                        View Resume
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium">Cover Letter</h3>
                                <div className="text-gray-600">
                                    {/* Placeholder for cover letter */}
                                    <p>
                                        Dear Hiring Manager,
                                        <br />
                                        <br />
                                        I am excited to apply for the Front End Developer position
                                        at Google. With my 5 years of experience in web development,
                                        I am confident in my ability to contribute to your team and
                                        help build innovative, user-friendly web applications.
                                        <br />
                                        <br />
                                        Throughout my career, I have honed my skills in HTML, CSS,
                                        and JavaScript, and have extensive experience working with
                                        modern front-end frameworks like React and Angular.
                                        <br />
                                        <br />
                                        In my previous roles, I have collaborated closely with
                                        designers and backend engineers to ensure seamless
                                        integration and optimal performance.
                                        <br />
                                        <br />
                                        I am excited about the opportunity to join the Google team
                                        and contribute to the development of cutting-edge web
                                        applications. I believe my skills and experience make me an
                                        ideal candidate for this position.
                                        <br />
                                        <br />
                                        Thank you for your consideration, and I look forward to
                                        hearing from you.
                                        <br />
                                        <br />
                                        Sincerely,
                                        <br />
                                        John Doe
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </div>
            </div>
        </Layout>
    );
}


function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DeleteIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
