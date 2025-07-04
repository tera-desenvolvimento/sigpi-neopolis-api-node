require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const userRoutes = require("./routes/user.routes");
const exameRoutes = require("./routes/exame.routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    app.use(CORS());
    next();
})

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.json({
        status: 200,
        message: 'API INITIALIZED',
    })
})

app.use(userRoutes);
app.use(exameRoutes);

require("./modules/databaseConnection.module");

app.listen(PORT);