import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "";
const geo_url = "http://www.omdbapi.com/";
const API_Key = 80541311;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(express.json()); // To parse JSON bodies

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  const title = req.body.title;
  const year = req.body.year ;
  console.log();
  try {
    const geo = await axios.get(geo_url, {
      params: {
        t: title,
        y : year ,
        apikey : API_Key ,
      },
    });
    
    res.render("index.ejs", { content: geo.data });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
