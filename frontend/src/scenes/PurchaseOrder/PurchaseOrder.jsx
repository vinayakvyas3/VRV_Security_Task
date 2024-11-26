import { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"; // Import SearchOutlinedIcon
import Header from "../../components/Header";
import axios from 'axios';

const PurchaseOrder = () => {
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/purchase');
      const dataWithIds = response.data.map((purchaseOrder, index) => ({
        id: index + 1, // Generate unique id
        ...purchaseOrder,
      }));
      setPurchaseOrderData(dataWithIds);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = purchaseOrderData.filter(purchaseOrder =>
    purchaseOrder.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "purchaseOrderId", headerName: "Purchase Order ID" },
    { field: "productName", headerName: "Product Name", flex: 1, cellClassName: "product-name-column--cell" },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "pricing", headerName: "Pricing", flex: 1 },
    { field: "mrp", headerName: "MRP", flex: 1 },
    { field: "customerId", headerName: "Customer ID", flex: 1 }
  ];

  return (
    <Box m="20px" display="flex">
      <Box flex="1">
        <Header title="PURCHASE ORDERS" subtitle="Managing the Purchase Orders" />
        <Box ml="20px" width="300px">
          <TextField
            label="Search by Product Name"
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
          <DataGrid checkboxSelection rows={filteredData} columns={columns} pageSize={6} />
        </Box>
      </Box>
    </Box>
  );
};

export default PurchaseOrder;
