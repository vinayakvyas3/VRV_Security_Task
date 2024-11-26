// models/PurchaseOrder.js
const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
    purchaseOrderId: { type: Number, unique: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    pricing: { type: Number, required: true },
    mrp: { type: Number, required: true },
    customerId: { type: Number, required: true },
});
purchaseOrderSchema.pre('save', async function(next) {
    if (!this.purchaseOrderId) {
        try {
            const count = await this.constructor.countDocuments();
            this.purchaseOrderId = count + 1;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);