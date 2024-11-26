const express = require('express');
const connectDB = require('./DB/db');
const Customer = require('./DB/Customer'); // Import the Customer model
const PurchaseOrder = require('./DB/PurchaseOrder'); // Import the PurchaseOrder model
const ShippingDetails = require('./DB/ShippingDetails'); // Import the ShippingDetails model
const Signin = require('./DB/Sigin'); // Import the Signin model
const deleteCustomerRoute = require('./DB/deleteCustomer'); // Import the delete customer route
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Routes

// Add a customer
app.post('/addform/customer', async (req, res) => {
    try {
        const { name, email, mobileNumber, city } = req.body;

        // Validate request data
        if (!name || !email || !mobileNumber || !city) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create and save a new customer
        const newCustomer = new Customer({ name, email, mobileNumber, city });
        await newCustomer.save();

        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a purchase order
app.post('/addform/purchaseform', async (req, res) => {
    try {
        const { productName, quantity, pricing, mrp, customerId } = req.body;

        // Validate request data
        if (!productName || !quantity || !pricing || !mrp || !customerId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create and save a new purchase order
        const newPurchaseOrder = new PurchaseOrder({ productName, quantity, pricing, mrp, customerId });
        await newPurchaseOrder.save();

        res.status(201).json(newPurchaseOrder);
    } catch (error) {
        console.error('Error creating purchase order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add shipping details
app.post('/addform/shippingdetail', async (req, res) => {
    try {
        const { purchaseOrderId, customerId, address, city, pincode } = req.body;

        // Validate request data
        if (!purchaseOrderId || !customerId || !address || !city || !pincode) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create and save shipping details
        const newShippingDetails = new ShippingDetails({ purchaseOrderId, customerId, address, city, pincode });
        await newShippingDetails.save();

        res.status(201).json(newShippingDetails);
    } catch (error) {
        console.error('Error creating shipping details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Signup route
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate request data
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create and save a new user
        const newUser = new Signin({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Sign-up successful', user: newUser });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all customers
app.get('/customer', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all purchase orders
app.get('/purchase', async (req, res) => {
    try {
        const purchases = await PurchaseOrder.find();
        res.json(purchases);
    } catch (error) {
        console.error('Error fetching purchase orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all shipping details
app.get('/shipping', async (req, res) => {
    try {
        const shippingDetails = await ShippingDetails.find();
        res.json(shippingDetails);
    } catch (error) {
        console.error('Error fetching shipping details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get sign-in data
app.get('/signin/data', async (req, res) => {
    try {
        const signins = await Signin.find();
        res.json(signins);
    } catch (error) {
        console.error('Error fetching sign-in data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete customer route
app.use('/api', deleteCustomerRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
