const Parser = require("rss-parser");
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const feedUrl = "https://podcast337600.podigee.io/feed/mp3"; // Replace with your Podegee podcast feed URL

    const response = await fetch(feedUrl);
    const feed = await response.text();

    res.setHeader("Content-Type", response.headers.get("content-type"));
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin (can be restricted to your domain)

    return res.send(feed);
  } catch (error) {
    console.error("Error proxying request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
