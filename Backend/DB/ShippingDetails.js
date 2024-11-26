const mongoose = require('mongoose');

const shippingDetailsSchema = new mongoose.Schema({
    purchaseOrderId: { type: Number, required: true },
    customerId: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true }
});

module.exports = mongoose.model('ShippingDetails', shippingDetailsSchema);