const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

// Route to generate a QR code
router.get('/generate', async (req, res) => {
    const { data } = req.query;  // Get data from query string, e.g., ?data=Hello+World

    try {
        if (!data) {
            throw new Error("No data provided for QR code generation.");
        }

        const qrImage = QRCode.toDataURL(data);

        res.send(qrImage);  // Send the QR image as part of an HTML img tag
    } catch (error) {
        res.status(400).send(`Error generating QR code: ${error.message}`);
    }
});

module.exports = router;
