import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import Dashboard from '@/Layouts/Layout';

const JobApplicationRequirements = () => {
  const requirements = [
    '3+ years of experience in software development, preferably in a full-stack role.',
    'Strong proficiency in React, Node.js (including Express.js), and MongoDB (or a similar NoSQL database).',
    'Excellent communication and collaboration skills to work effectively with cross-functional teams.',
    'Experience with Agile methodologies (e.g., Scrum, Kanban) and a solid understanding of development life cycles (SDLC).',
    'Familiarity with cloud platforms like AWS, Azure, or GCP is a plus.',
    'A passion for learning new technologies and staying up-to-date with the latest trends in the software development field.',
  ];

  const jobDetails = {
    title: 'Software Engineer',
    company: 'Google Inc.',
    location: 'Kochi, Kerala, India',
    employmentType: 'Full-time',
    description: (
      <p>
        Acme Inc. is seeking a talented and motivated Software Engineer to join our growing team. You will be responsible for the full development lifecycle of software applications, from design and development to testing and deployment. We are looking for someone who is passionate about building innovative and user-friendly software solutions.
      </p>
    ),
    responsibilities: [
      'Design, develop, test, and deploy web applications using React, Node.js, and MongoDB.',
      'Collaborate with cross-functional teams (designers, product managers, QA) to ensure project success.',
      'Participate in code reviews and contribute to improving code quality and maintainability.',
      'Stay up-to-date with the latest technologies and trends in the software development field.',
    ],
    benefits: [
      'Competitive salary and benefits package',
      'Opportunity to work on challenging and impactful projects',
      'Collaborative and supportive work environment',
      'Chance to learn and grow your skills',
    ],
  };

  return (
    <Dashboard>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '2rem' , backgroundColor:"white" }}  >
        <Typography variant="h4" gutterBottom>
          {jobDetails.title} - {jobDetails.company}
        </Typography>
        <Card sx={{ marginBottom: '2rem' }}>
          <CardContent>
            <Typography variant="h5">Job Details</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Location" secondary={jobDetails.location} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Employment Type" secondary={jobDetails.employmentType} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
        
        <Typography variant="h5">Job Description</Typography>
        {jobDetails.description}

        <Typography variant="h5">Responsibilities</Typography>
        <List>
          {jobDetails.responsibilities.map((responsibility, index) => (
            <ListItem key={index}>
              <ListItemText primary={responsibility} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h5">Qualifications</Typography>
        <List>
          {requirements.map((requirement, index) => (
            <ListItem key={index}>
              <ListItemText primary={requirement} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h5">Benefits</Typography>
        <List>
          {jobDetails.benefits.map((benefit, index) => (
            <ListItem key={index}>
              <ListItemText primary={benefit} />
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <Button variant="contained" color="primary">
            Apply Now
          </Button>
        </Box>
      </Box>
    </Dashboard>
  );
};

export default JobApplicationRequirements;
