import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';

const PurchaseForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      // Fetch customer ID from http://localhost:5000/customer
      const customerResponse = await axios.get('http://localhost:5000/customer');
      
      const customerId = customerResponse.data.find(customer => customer.customerId === values.customerId);
console.log(customerId)

      // Check if customer ID is present
      if (!customerId) {
        alert('Customer Not Found');
        return;
      }
  
      // Check if price is smaller than or equal to MRP
      if (values.pricing <= values.mrp) {
        // Proceed with form submission
        const response = await axios.post('http://localhost:5000/addform/purchaseform', { ...values });
        console.log('Customer created:', response.data);
        alert('Data submitted successfully'); // Show popup message
        console.log(values);
        resetForm(); // Reset form values to initial state
      } else {
        // Show error message if price is greater than MRP
        alert('Price must be equal to or smaller than MRP');
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };
  

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
                fullWidth
                variant="filled"
                type="text"
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.productName}
                name="productName"
                error={!!touched.productName && !!errors.productName}
                helperText={touched.productName && errors.productName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Pricing"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pricing}
                name="pricing"
                error={!!touched.pricing && !!errors.pricing}
                helperText={touched.pricing && errors.pricing}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="MRP"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mrp}
                name="mrp"
                error={!!touched.mrp && !!errors.mrp}
                helperText={touched.mrp && errors.mrp}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type='number'
                label="Customer ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.customerId}
                name="customerId"
                error={!!touched.customerId && !!errors.customerId}
                helperText={touched.customerId && errors.customerId}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  productName: yup.string().required("required"),
  quantity: yup.number().required("required").positive("Quantity must be positive").integer("Quantity must be an integer"),
  pricing: yup.number().required("required").positive("Pricing must be positive"),
  mrp: yup.number().required("required").positive("MRP must be positive"),
  customerId: yup.string().required("required"),
});
const initialValues = {
  productName: "",
  quantity: "",
  pricing: "",
  mrp: "",
  customerId: "",
};

export default PurchaseForm;
