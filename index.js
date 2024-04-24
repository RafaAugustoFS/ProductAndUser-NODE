const express = require('express');
const port = 3001;
const app = express();
const router = require("./src/routers/router");

app.use(express.json());
app.use(express.static("public"));
app.use("/", router);

app.listen(port, () =>{
    console.log(`funcionandoo! http://localhost:${port}`);
})