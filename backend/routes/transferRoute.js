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
    let param = req.query.foo
    console.log("🚀 ~ file: transferRoute.js:31 ~ router.get ~ param:", param)
    // console.log("🚀 ~ file: transferRoute.js:35 ~ router.get ~ req.body.from:", req.body.from)
    
  try {
    const data = await transferModel.find({ from: `${param}` });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("/getAlL", async (req, res) => {
  try {
    const data = await transferModel.find();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;