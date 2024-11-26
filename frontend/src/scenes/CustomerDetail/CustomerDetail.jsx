import { useState,useEffect } from 'react';
import { Box, Typography, useTheme, TextField, InputAdornment } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"; // Import SearchOutlinedIcon
import Header from "../../components/Header";
import axios from 'axios';


const CustomerDetail = () => {
  const [customerData, setCustomerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/customer');
      const dataWithIds = response.data.map((customer, index) => ({
        id: index + 1, // Generate unique id
        ...customer,
      }));
      setCustomerData(dataWithIds);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = customerData.filter(customer =>
    customer.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "customerId", headerName: "Customer ID" },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobileNumber", headerName: "Mobile Number", flex: 1 },
    { field: "city", headerName: "City", flex: 1 }
  ];

  return (
    <Box m="20px" display="flex">
      <Box flex="1">
        <Header title="CUSTOMERS" subtitle="Managing the Customer Information" />
        <Box ml="20px" width="300px">
          <TextField
            label="Search by City"
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box m="40px 0 0 0" height="75vh">
          <DataGrid checkboxSelection rows={filteredData} columns={columns} pageSize={6}   />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerDetail;
