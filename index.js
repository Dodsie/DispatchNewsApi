//database
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({
    info: "Node.js, Express, and Postgres API",
  });
});

app.get("/users", db.getUsers);

app.get("/users/:id", db.getUserById);

app.post("/users", db.createUser);

app.get("/users/delete/:id", db.deleteUser);

app.get("/favorite/:id", db.getFavorite);

app.post("/addfav/:id", db.addFavorite);

// app.get("/articles", db.getArticles);

app.delete("/delete/:id/:publishedat", db.deleteFavArticles);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});


