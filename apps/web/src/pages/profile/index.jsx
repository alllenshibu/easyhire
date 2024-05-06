import React from "react";
import Layout from "@/Layouts/Layout";
import ResumeForm from "@/components/Resumeform";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
export default function index() {
  const { get, put } = useFetch();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data, status } = await get("/user", {});
        if (status !== 200) {
          throw new Error("Failed to fetch user details");
        }
        setUser(data?.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserDetails();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await put("/user", {}, user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div>{JSON.stringify(user)}</div>
      <React.Fragment>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Profile
            </Typography>

            <React.Fragment>
              <ResumeForm
                user={user}
                setUser={setUser}
                resume={user?.resume}
                handleSubmit={handleEdit}
              />
            </React.Fragment>
          </Paper>
        </Container>
      </React.Fragment>
    </Layout>
  );
}
