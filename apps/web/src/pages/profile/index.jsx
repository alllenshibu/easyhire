import Layout from "@/Layouts/Layout";
import { useAuth } from "@/contexts/authContext";
import { useFetch } from "@/hooks/useFetch";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";

export default function index() {
  const { get } = useFetch();
  const { token } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data, status } = await get("/user", {});
        if (status !== 200) {
          throw new Error("Failed to fetch user details");
        }
        setFirstName(data.user.firstName);
        setLastName(data.user.lastName);
        setEmail(data.user.email);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <Layout>
      <form>
        <TextField
          required
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          required
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          required
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </form>
    </Layout>
  );
}
