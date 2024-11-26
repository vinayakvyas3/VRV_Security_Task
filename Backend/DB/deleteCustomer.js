const express = require('express');
const router = express.Router();
const Customer = require('./Customer'); // Adjust the path to your Customer model

// DELETE route for deleting a customer by customerId
router.delete('/deleteCustomer/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;

        // Find and delete the customer
        const deletedCustomer = await Customer.findOneAndDelete({ customerId });

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully', deletedCustomer });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

