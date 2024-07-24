import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BvTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [mockData, setMockData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (cellValues) => (
        <div>
          {cellValues.value}
        </div>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "latitude",
      headerName: "Latitude",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "longitude",
      headerName: "Longitude",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "noofgoats",
      headerName: "Goats",
      headerAlign: "left",
      align: "left",
    },

  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3080/api/v1/banef/all");
        const data = response.data;

        const arr = data.msg.map((item) => ({
          address:item.address,
          id:item._id,
          name: item.name,
          noofgoats:item.Goats.length,
          latitude: item.latitude,
          longitude:item.longitude
        }));
        setMockData(arr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%!important" }}>
      <Header title="Beneficiaries" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockData} columns={columns} />
      </Box>
    </Box>
  );
};

export default BvTable;
