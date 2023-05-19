const express = require("express");
const app = express();
const bodyParser= require("body-parser");
const  getSentiment  = require("./getSentiment");
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/analyze', (req, res) => {
    const text = req.query.text;
    // console.log(text);
    const sentimentScore = getSentiment(text);

    // console.log(sentimentScore); // Debug
    res.json({
        score: sentimentScore || 0
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});