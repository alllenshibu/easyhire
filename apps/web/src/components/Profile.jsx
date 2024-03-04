import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  Divider,
  Grid,
  Box,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

const ProfileCard = ({
  name,
  jobTitle,
  applications,
  pending,
  interviews,
  profilePic,
}) => {
  return (
    <Card sx={{ width: 300, maxWidth: 380, maxHeight: "75vh" }}>
      <CardContent
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Avatar alt={name} src={profilePic} sx={{ width: 80, height: 80 }} />
          <Typography
            variant="h9"
            component="div"
            align="center"
            fontWeight={600}
          >
            {name}
          </Typography>
          <Typography variant="body2" component="div" color="text.secondary">
            {jobTitle}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardContent>
        <Grid direction={"column"} container spacing={1}>
          <Box display={"flex"} ml={2} alignItems={"center"} gap={2}>
            <WorkIcon />
            <Grid item xs={4}>
              <Typography variant="body2" component="div">
                Applied Jobs
              </Typography>
              <Typography variant="h7" component="div">
                {applications}
              </Typography>
            </Grid>
          </Box>
          <Box display={"flex"} ml={2} alignItems={"center"} gap={2}>
            <WorkIcon />
            <Grid item xs={4}>
              <Typography variant="body2" component="div">
                Applied Jobs
              </Typography>
              <Typography variant="h7" component="div">
                {applications}
              </Typography>
            </Grid>
          </Box>
          <Box display={"flex"} ml={2} alignItems={"center"} gap={2}>
            <WorkIcon />
            <Grid item xs={4}>
              <Typography variant="body2" component="div">
                Applied Jobs
              </Typography>
              <Typography variant="h7" component="div">
                {applications}
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
