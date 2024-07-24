import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useState, useEffect } from "react";
import Header from "./Header";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";


const PvTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [mockData, setMockData] = useState([
  ]);
  const columns = [
    { field: "id", headerName: "ID" },
    {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
        renderCell: (cellValues) => (
          <div
            onClick={() => navigate(`/pv/${cellValues.row.id}`)}
            style={{ cursor: 'pointer' }}
          >
            {cellValues.value}
          </div>
        ),
      },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
        field: "location",
        headerName: "Location",
        headerAlign: "left",
        align: "left",
    },
    
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3080/api/v1/paravat/find');
        const data = response.data;
        const arr = [];
        data.mdg.map((item)=>{
            // console.log(item)
            const x = {id: item.userId, name:item.name, email:item.email, phone:item.PhoneNumber, location:item.address}
            arr.push(x)
        })
        setMockData(arr);
        // console.log(mockData)
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        // console.log(mockData)
      }
    };
  
    fetchData();
    
  }, []);

  return (
    <Box sx={{width:"100%!important",}}>
         <Header title="Paravets" subtitle="Paravet Info" />
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

export default PvTable;