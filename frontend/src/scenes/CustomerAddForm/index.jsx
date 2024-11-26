import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
 
  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const isCityString = typeof values.city === 'string';
      if (/\d/.test(values.city)) {
        alert('City must not contain any numbers');
        return;
      }
      const response = await axios.post('http://localhost:5000/addform/customer', values);
      console.log('Customer created:', response.data);

      alert('Data submitted successfully'); // Show popup message
      console.log(values)
      resetForm(); // Reset form values to initial state
     
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
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mobile Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mobileNumber}
                name="mobileNumber"
                error={!!touched.mobileNumber && !!errors.mobileNumber}
                helperText={touched.mobileNumber && errors.mobileNumber}
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
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  mobileNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  city: yup.string().required("required"),
});
const initialValues = {
  name: "",
  email: "",
  mobileNumber: "",
  city: "",
};

export default Form;
