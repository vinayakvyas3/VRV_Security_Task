import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem } from "@mui/material"; // Import MenuItem
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';

const ShippingDetailsForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [customers, setCustomers] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Fetch customers
    axios.get('http://localhost:5000/customer')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });

    // Fetch purchases
    axios.get('http://localhost:5000/purchase')
      .then(response => {
        setPurchases(response.data);
      })
      .catch(error => {
        console.error('Error fetching purchases:', error);
      });
  }, []);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const addressWords = values.address.trim().split(/\s+/); // Trim excess spaces and split by whitespace
      const isCityString = typeof values.city === 'string';
      const isPincodeValid = /^\d{6}$/.test(values.pincode);
  
      if (addressWords.length !== 3) {
        alert('Address must contain exactly 3 words');
        return;
      }
      
      if (!isCityString) {
        alert('City must be a string');
        return;
      }
  
      if (/\d/.test(values.city)) {
        alert('City must not contain any numbers');
        return;
      }
  
      if (!isPincodeValid) {
        alert('Pincode must be a 6-digit number');
        return;
      }
  
      // Proceed with form submission
      const response = await axios.post('http://localhost:5000/addform/shippingdetail', { ...values });
      console.log('Shipping details submitted:', response.data);
      alert('Data submitted successfully'); // Show popup message
      console.log(values);
      resetForm(); // Reset form values to initial state
    } catch (error) {
      console.error('Error submitting shipping details:', error);
    }
  };
  
  

  return (
    <Box m="20px">
      <Header title="SHIPPING DETAILS" subtitle="Fill in Shipping Information" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                select
                fullWidth
                variant="filled"
                label="Customer ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.customerId}
                name="customerId"
                error={!!touched.customerId && !!errors.customerId}
                helperText={touched.customerId && errors.customerId}
                sx={{ gridColumn: "span 2" }}
              >
                {customers.map(customer => (
                  <MenuItem key={customer.customerId} value={customer.customerId}>
                    {customer.customerId}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                variant="filled"
                label="Purchase ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.purchaseOrderId}
                name="purchaseOrderId"
                error={!!touched.purchaseOrderId && !!errors.purchaseOrderId}
                helperText={touched.purchaseOrderId && errors.purchaseOrderId}
                sx={{ gridColumn: "span 2" }}
              >
                {purchases.map(purchase => (
                  <MenuItem key={purchase.purchaseOrderId} value={purchase.purchaseOrderId}>
                    {purchase.purchaseOrderId}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Pincode"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pincode}
                name="pincode"
                error={!!touched.pincode && !!errors.pincode}
                helperText={touched.pincode && errors.pincode}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  customerId: yup.string().required("Customer ID is required"),
  purchaseOrderId: yup.string().required("Purchase ID is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  pincode: yup.number().required("Pincode is required"),
});

const initialValues = {
  customerId: "",
  purchaseOrderId: "",
  address: "",
  city: "",
  pincode: "",
};

export default ShippingDetailsForm;
