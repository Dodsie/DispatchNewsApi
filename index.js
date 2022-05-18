const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");
const app = express();
const port = 3001;
const cors = require('cors');


const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);


app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);




const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});






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

app.get("/articles", db.getArticles);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
