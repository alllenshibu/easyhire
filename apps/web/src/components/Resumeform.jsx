import { use, useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { useFetch } from "@/hooks/useFetch";

export default function ResumeForm({
  firstName,
  lastName,
  phone,
  email,
  resume,
  engineeringStream,
  cgpa,
  graduationYear,
  backlogs,
  skills,
}) {
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    resume: "",
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
      {/* <Typography variant="h6" gutterBottom>
        Resume Information
      </Typography> */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={formData.firstName}
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
              value={formData.lastName}
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={phone}
              required
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={email}
              required
              id="email"
              name="email"
              label="Email"
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
            {resume ? (
              <Button>
                <Link target="_blank" href={resume}>
                  View Resume
                </Link>
              </Button>
            ) : (
              <Button variant="contained" component="label">
                Upload Resume
                <input
                  type="file"
                  hidden
                  name="resume"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFormData({
                      ...formData,
                      resume: file,
                    });
                  }}
                />
              </Button>
            )}

          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
              {resumeSaved ? "Resume Saved" : "Save Profile"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
