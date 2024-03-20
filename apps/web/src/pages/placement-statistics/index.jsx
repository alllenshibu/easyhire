import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { BarChart } from "@mui/x-charts";
import Layout from "@/Layouts/Layout";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "company", headerName: "Company", width: 130 },
  { field: "placements", headerName: "Placements", type: "number", width: 130 },
];

const rows = [
  { id: 1, company: "Company 1", placements: 35 },
  { id: 2, company: "Company 2", placements: 42 },
  { id: 3, company: "Company 3", placements: 39 },
  // Add more data here
];

export default function Index() {
  return (
    <Layout>
      <Box display={"flex"} flexDirection={"column"}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          width={500}
          height={300}
        />
      </Box>
    </Layout>
  );
}
