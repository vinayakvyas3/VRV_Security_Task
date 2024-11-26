import { useState, useEffect } from 'react';
import { Box, Typography, useTheme, TextField, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"; // Import SearchOutlinedIcon
import Header from "../../components/Header";
import axios from 'axios';
import {  ThemeProvider, createTheme } from '@mui/material/styles';


const CustomerInfo = () => {
  const [customerData, setCustomerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [purchaseData, setPurchaseData] = useState([]);
  const [shippingData, setShippingData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196f3', // Blue color
      },
    },
  });

  const fetchData = async () => {
    try {
      const customerResponse = await axios.get('http://localhost:5000/customer');
      const dataWithIds = customerResponse.data.map((customer, index) => ({
        id: index + 1, // Generate unique id
        ...customer,
      }));
      setCustomerData(dataWithIds);

      const purchaseResponse = await axios.get('http://localhost:5000/purchase');
      setPurchaseData(purchaseResponse.data);

      const shippingResponse = await axios.get('http://localhost:5000/shipping');
      setShippingData(shippingResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleShowCustomerDetails = (customerId) => {
    const selected = customerData.find(customer => customer.customerId === customerId);
    setSelectedCustomer(selected);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCustomer(null);
    setIsDialogOpen(false);
  };

  const getProductDetails = (customerId) => {
    const customerPurchase = purchaseData.filter(purchase => purchase.customerId === customerId);
    return customerPurchase.map(purchase => {
      const shippingDetail = shippingData.find(shipping => shipping.productId === purchase.productId);
      return {
        purchaseOrderId: purchase.purchaseOrderId,
        productName: purchase.productName,
        price: purchase.pricing,
        quantity: purchase.quantity,
        shippingDetail
      };
    });
  };

  return (
    <Box m="20px" display="flex">
      <Box flex="1">
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
          <DataGrid checkboxSelection rows={customerData.filter(customer => customer.city.toLowerCase().includes(searchQuery.toLowerCase()))} columns={[
            { field: "customerId", headerName: "Customer ID" },
            { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
            { field: "email", headerName: "Email", flex: 1 },
            { field: "mobileNumber", headerName: "Mobile Number", flex: 1 },
            { field: "city", headerName: "City", flex: 1 },
            {
              field: 'actions',
              headerName: 'Actions',
              flex: 1,
              renderCell: (params) => (
                <ThemeProvider theme={theme}>
                  <Button
                    onClick={() => handleShowCustomerDetails(params.row.customerId)}
                    color="primary"
                  >
                    View Details
                  </Button>
                </ThemeProvider>
              ),
            },
          ]} pageSize={6} />
        </Box>
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent>
          {selectedCustomer && (
            <Box>
              <Typography variant="h6">Customer ID: {selectedCustomer.customerId}</Typography>
              <Typography variant="h6">Name: {selectedCustomer.name}</Typography>
              <Typography variant="h6">Email: {selectedCustomer.email}</Typography>
              <Typography variant="h6">Mobile Number: {selectedCustomer.mobileNumber}</Typography>
              <Typography variant="h6">City: {selectedCustomer.city}</Typography>
              <Typography variant="h6">Product Details:</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Purchase Order ID</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Shipping Detail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getProductDetails(selectedCustomer.customerId).map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.purchaseOrderId}</TableCell>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.shippingDetail ? `${product.shippingDetail.address}, ${product.shippingDetail.city}, ${product.shippingDetail.pincode}` : 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerInfo;
