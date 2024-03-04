import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Dashboard from "@/Layouts/Layout";
import JobCard from "@/components/NewJobCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Dashboard>
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
      </Dashboard>
    </>
  );
}
