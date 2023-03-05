const express = require('express')
const app = express()
const port = 5000;
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const transferRoute = require("./routes/transferRoute")
var cors = require('cors');
app.use(cors())

//env
dotenv.config();

//mongodb connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log("Connection not successful", err);
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/transferRoute/',transferRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})