import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Divider,
  Grid,
  Box,
  Button,
} from "@mui/material";

const JobCard = ({
  logo,
  company,
  role,
  location,
  type,
  experience,
  salary,
  description,
}) => {
  return (
    <Card sx={{ maxWidth: 800, display: "flex", flexDirection: "column" }}>
      <CardContent>
        <Box container spacing={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
            }}
            item
            xs={12}
            sm={8}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "between",
              }}
              item
              xs={12}
              sm={8}
            >
              <CardMedia
                component="img"
                sx={{ width: 100, height: 100 }}
                image={logo}
                alt="company logo"
              />
              <Grid item xs={12} sm={8}>
                <Typography variant="h6" component="div">
                  {company}
                </Typography>

                <Typography variant="subtitle1" component="div">
                  {role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {location}
                </Typography>
              </Grid>
            </Box>
            <Button variant="contained" color="primary">
              Apply
            </Button>
          </Box>

          <Divider orientation="horizontal" sx={{ height: 20, mb: 2 }} />
          <Grid item xs={12} sm={4} mb={1}>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="text.secondary">
                {type}
              </Typography>
              <Divider orientation="vertical" sx={{ height: 20 }} />
              <Typography variant="body2" color="text.secondary">
                {experience}
              </Typography>
              <Divider orientation="vertical" sx={{ height: 20 }} />
              <Typography variant="body2" color="text.secondary">
                {salary}
              </Typography>
            </Stack>
          </Grid>
        </Box>
        <Typography variant="body1" component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobCard;
