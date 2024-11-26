import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';

const DeleteCustomer = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch customers to populate dropdown options
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/customer');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
        const { customerId } = values;

        // Correct route to match the backend
        const response = await axios.delete(`http://localhost:5000/api/deleteCustomer/${customerId}`);

        console.log('Customer deleted:', response.data);
        alert('Customer deleted successfully');
        resetForm();
    } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Error deleting customer');
    }
};



  return (
    <Box m="20px">
      <Header title="DELETE CUSTOMER" subtitle="Delete an Existing User Profile" />

      {loading ? (
        <CircularProgress />
      ) : (
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
                  select
                  label="Customer ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.customerId}
                  name="customerId"
                  error={!!touched.customerId && !!errors.customerId}
                  helperText={touched.customerId && errors.customerId}
                  sx={{ gridColumn: "span 4" }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.customerId} value={customer.customerId}>
                      {customer.name} - {customer.customerId}
                    </option>
                  ))}
                </TextField>
              </Box>

              {/* Delete Button */}
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Delete Customer
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  customerId: yup.string().required("Please select a customer to delete"),
});

const initialValues = {
  customerId: "",
};

export default DeleteCustomer;
