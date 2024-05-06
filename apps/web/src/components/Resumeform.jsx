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

export default function ResumeForm({ user, setUser, resume, handleSubmit }) {
  const streams = ["CSE", "ECE", "EB", "ME", "EE"];

  const [selectedStream, setSelectedStream] = useState(null);

  const [resumeSaved, setResumeSaved] = useState(false);

  const handleChange = (event) => {
    setUser({
      ...user,
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
              value={user.firstName}
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
              value={user.lastName}
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
              value={user.phone}
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
              value={user.email}
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
              name="stream"
              options={streams}
              getOptionLabel={(stream) => stream}
              value={user.stream || selectedStream}
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
              value={user.cgpa}
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
                    setUser({
                      ...user,
                      resume: file,
                    });
                  }}
                />
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1 }}
              onClick={handleSubmit}
            >
              {resumeSaved ? "Resume Saved" : "Save Profile"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
