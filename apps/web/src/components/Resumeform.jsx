import { use, useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";

export default function ResumeForm() {
  async function getUser() {
    try {
      const { data, error } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/user`,
        { withCredentials: true }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    engineeringStream: "",
    cgpa: "",
    graduationYear: "",
    backlogs: "",
    skills: "",
  });
  const streams = [
    "Computer Science",
    "Electrical and Communication",
    "Electronics",
    // Add more engineering streams as needed
  ];

  const [selectedStream, setSelectedStream] = useState(null);

  const [resumeSaved, setResumeSaved] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call function to handle form submission
    // Example: Send data to server or update state

    setResumeSaved(true); // Temporary action to simulate form submission
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Resume Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="engineering-stream-autocomplete"
              options={streams}
              getOptionLabel={(stream) => stream}
              value={selectedStream}
              onChange={(event, newValue) => {
                setSelectedStream(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Engineering Stream"
                  borderRadius={0}
                />
              )}
              borderRadius={0}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="cgpa"
              name="cgpa"
              label="CGPA"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="graduationYear"
              name="graduationYear"
              label="Graduation Year"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="backlogs"
              name="backlogs"
              label="No. of Backlogs"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="skills"
              name="skills"
              label="Skills"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
              {resumeSaved ? "Resume Saved" : "Save Resume"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
