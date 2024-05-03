import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Dashboard from "@/Layouts/Layout";
import JobCard from "@/components/NewJobCard";
import Profile from "@/components/Profile";
import ProfileCard from "@/components/Profile";
import { ImportContacts } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import QuizAttendorV2 from "@/components/QuizAttendor";
import QuizCreatorV2 from "@/components/QuizCreator";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { loading, get } = useFetch();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, status } = await get("/openings");
      console.log(data?.openings)
      setJobs(data?.openings);
    };
    fetchJobs();
  }, []);

  const renderJobCards = () => {
    if (jobs && jobs.length > 0) {
      return jobs.map((job) => (
        <JobCard
          logo="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg"
          company={job.company.name}
          key={job.id}
          role={job.role}
          location={job.location}
          experience={job.experience}
          description={job.description}
          salary={job.renumeration}
          type={job.type}
          
        />
      ));
    } else {
      return null;
    }
  };

  
  

  return (
    <>
      <Dashboard>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          padding={2}
          gap={2}
          container
          spacing={2}
          sx={{ flexGrow: 1 }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            {/* <JobCard
              logo="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg"
              company="Google"
              role="Software Engineer"
              location="New York, NY"
              type="Full Time"
              experience="2+ years"
              salary="$80,000 - $100,000 per year"
              description="We are looking for a talented software engineer to join our team and help develop cutting-edge applications."
            />

            <JobCard
              logo="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg"
              company="Google"
              role="Software Engineer"
              location="New York, NY"
              type="Full Time"
              experience="2+ years"
              salary="$80,000 - $100,000 per year"
              description="We are looking for a talented software engineer to join our team and help develop cutting-edge applications."
            /> */}
            {
            renderJobCards()
            // jobs.map((job) => (
            //   <JobCard key={job.id} role={job.title}  />
            // ))
            
            }
          </Box>

          <ProfileCard
            name="John Doe"
            jobTitle="Software Engineer"
            applications="10"
            pending="3"
            interviews="2"
            profilePic="https://randomuser"
          />
        </Box>
      </Dashboard>
    </>
  );
}
