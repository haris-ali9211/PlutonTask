const express = require("express");
const router = express.Router();
const transferModel = require("../models/transfer")


router.post("/transfer", async (req, res) => {
    try {
        const {
            to,
            from,
            amount,
            status
        } = req.body;

        const transferData = new transferModel({
            to,
            from,
            amount,
            status
        });
        const saveTransfer = await transferData.save();
        res.status(201).json(saveTransfer);
    }
    catch (error) {
        res.status(500).json(error);
    }
})

router.get("/getAllTransfer", async (req, res) => {
    console.log("🚀 ~ file: transferRoute.js:33 ~ router.get ~ req.body.to:", req.body)
  try {
    const data = await transferModel.find({ to: `${req.body.to}` });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;