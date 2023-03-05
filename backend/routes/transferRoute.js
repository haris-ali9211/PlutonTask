const express = require("express");
const router = express.Router();
const transferModel = require("../models/transfer")


router.post("/transfer", async (req, res) => {
    try {
        const {
            to,
            from,
            amount,
        } = req.body;

        const transferData = new transferModel({
            to,
            from,
            amount,
        });
        const saveTransfer = await transferData.save();
        res.status(201).json(saveTransfer);
    }
    catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;