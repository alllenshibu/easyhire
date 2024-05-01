import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

export default function CompanyCard({ company }) {
  return (

      <Card className="mb-4">
        <CardContent>
          <Typography variant="h5" component="div">
            {company.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {company.website}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" color="primary">
            Placement Stats
          </Button>

          <Button size="small" variant="contained" color="secondary">
            Interview Material
          </Button>
        </CardActions>
      </Card>

  );
}
