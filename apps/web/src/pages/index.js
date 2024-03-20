<<<<<<< Updated upstream
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
import { useAuth } from "@/contexts/authContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { token } = useAuth();
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
            <JobCard
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
            />
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
=======
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

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
            <JobCard
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
            />
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
>>>>>>> Stashed changes
