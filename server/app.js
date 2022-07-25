const PORT = 8000;
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const scrapeDynamicWebpage = require("./scrapers/dynamicSiteScraper");
const scrapeStaticWebpage = require("./scrapers/staticSiteScraper");

app.get("/", function (req, res) {
    res.send("Running");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

//scrapeDynamicWebpage();
scrapeStaticWebpage();