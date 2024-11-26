const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerId: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    city: { type: String, required: true },
});

// Define a pre-save middleware to generate the customer ID
customerSchema.pre('save', async function(next) {
    if (!this.customerId) {
        try {
            const count = await this.constructor.countDocuments();
            this.customerId = count + 1;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

module.exports = mongoose.model('Customer', customerSchema);