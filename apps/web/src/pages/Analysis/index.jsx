import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { BarChart } from "@mui/x-charts";
import Layout from "@/Layouts/Layout";
import CoordiLayout from "@/Layouts/CoordiLayout";
import { Typography } from "@mui/material";
import Card from './card';

export default function Index() {
  return (
    <CoordiLayout>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>

      
    </CoordiLayout>
  );
};
