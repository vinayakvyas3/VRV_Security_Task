import { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Header from "../../components/Header";
import axios from 'axios';

const ShippingDetails = () => {
  const [shippingData, setShippingData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/shipping');
      const dataWithIds = response.data.map((shipping, index) => ({
        id: index + 1, // Generate unique id
        ...shipping,
      }));
      console.log(dataWithIds)
      setShippingData(dataWithIds);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = shippingData.filter(shipping =>
    shipping.city && shipping.city.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const columns = [
    { field: "purchaseOrderId", headerName: "purchaseOrderId", flex: 1 },
    { field: "customerId", headerName: "Customer ID", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "pincode", headerName: "Pincode", flex: 1 }
  ];

  return (
    <Box m="20px" display="flex">
      <Box flex="1">
        <Header title="SHIPPING" subtitle="Managing the Shipping Orders" />
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

export default ShippingDetails;
